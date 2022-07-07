
import * as lib from "../../../../lib"

import * as pr from "pareto-runtime"

import { createHandledFilesystem } from "../../modules/fs/HandledFilesystem"
import * as fslib from "pareto-filesystem-lib"
import * as testlib from "pareto-test-lib"
import * as asyncLib from "pareto-async-lib"
import * as diffLib from "pareto-diff-lib"
import { getTests } from "../../imp/getTests"
import { createValidateFile } from "../../modules/test/createValidateFile"


pr.runProgram(
    ($) => {
        if ($.argument === undefined) {
            throw new Error("missing path")
        }
        const path = $.argument

        const async = asyncLib.init()
        const diff = diffLib.init()


        const tokLib = lib.init()


        createHandledFilesystem(
            (fs) => {
                const validateFile = createValidateFile(
                    fs.file,
                    fs.writeFile,
                    fs.unlink,
                    diff.diffLines,
                    async.value,
                )

                getTests(
                    path,
                    async.rewrite,
                    async.tuple2,
                    fs.directory,
                    fs.file,
                    tokLib.createTokenizer,
                    validateFile,
                ).execute(($ => {
                    testlib.init().serializeTestResult(
                        {
                            testResult: $,
                            showSummary: true,

                        },
                        (str) => {
                            pr.log(str)
                        }
                    )
                }))
            },
            ($, path) => {
                pr.logError(`FS ERROR ${path}: ${$[0]}`)
            },
            fslib.init()
        )

    }
)
