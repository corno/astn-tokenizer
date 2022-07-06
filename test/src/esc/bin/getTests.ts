
import * as lib from "../../../../lib"

import * as pr from "pareto-runtime"
import * as tc from "astn-tokenconsumer-api"

import * as fsAPI from "pareto-filesystem-api"

import { Directory, File } from "../../modules/fs/HandledFilesystem"
import { ValidateFile } from "../../modules/test/ValidateFile"
import { TestResult } from "./types"
import * as asyncAPI from "pareto-async-api"


export function getTests(
    path: fsAPI.Path,
    directory: Directory,
    file: File,
    createTokenizer: lib.CreateTokenizer,
    validateFile: ValidateFile,
): asyncAPI.IAsync<TestResult> {
    return directory(
        path,
        (data) => {
            //pr.log(data.path)

            return file(
                [data.path, "in.astn"],
                (fileData) => {
                    
                    type Step =
                        | ["token", tc.AnnotatedStructureToken<lib.TokenizerAnnotationData>]
                        // | ["end", lib.TokenizerAnnotationData]
                        | ["error", {
                            error: lib.TokenizerError
                            range: lib.Range
                        }]

                    type Result = Step[]
                    const result: Result = []
                    const tok = createTokenizer(
                        {
                            parser: {
                                onToken: ($) => {
                                    result.push(["token", $])
                                },
                                onEnd: ($) => {
                                    //result.push(["end", $])
                                }
                            },
                            onError: ($) => {
                                result.push(["error", $])
                            }
                        },
                    )

                    tok.onData(fileData)
                    tok.onEnd(null)
                    return validateFile(
                        data.path,
                        "out",
                        "json",
                        pr.JSONstringify(result),
                    )
                }
            )
        }
    )
}
