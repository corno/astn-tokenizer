
import * as lib from "../../../../lib"

import * as pr from "pareto-runtime"

import * as fslib from "pareto-filesystem-res"
import * as testlib from "pareto-test-lib"
import * as diffLib from "pareto-diff-lib"
import * as asyncLib from "pareto-async-functions-lib"
import { getTests } from "../../imp/getTests"


pr.runProgram(
    ($) => {
        if ($.argument === undefined) {
            throw new Error("missing path")
        }
        const path = $.argument

        const async = asyncLib.init()
        const diff = diffLib.init()


        const tokLib = lib.init()

        const fs = fslib.init()

        const hfs = fs.createHandledFilesystem(
            ($) => {
                throw new Error("IMPLEMENT ME!")
            }
        )


        getTests(
            path,
            async.rewrite,
            async.tuple3,
            hfs.directory,
            hfs.file,
            tokLib.createTokenizer,
            testlib.init(
                fs,
                diff,
                async,
            ).validateFile,
        ).execute(($ => {
            testlib.init(
                fs,
                diff,
                async
            ).serializeTestResult(
                {
                    testResult: $,
                    showSummary: true,

                },
                (str) => {
                    pr.log(str)
                }
            )
        }))

    }
)
