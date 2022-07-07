
import * as lib from "../../../lib/dist"

import * as pr from "pareto-runtime"
import * as pl from "pareto-lang-lib"
import * as tc from "astn-tokenconsumer-api"

import * as fsAPI from "pareto-filesystem-api"

import { Directory, File } from "../modules/fs/HandledFilesystem"
import { ValidateFile } from "../modules/test/ValidateFile"
import * as ta from "pareto-test-api"
import * as asyncAPI from "pareto-async-api"
import * as afAPI from "pareto-async-functions-api"


export function getTests(
    path: string,
    rewrite: afAPI.Rewrite,
    tuple2: afAPI.Tuple2,
    directory: Directory,
    file: File,
    createTokenizer: lib.CreateTokenizer,
    validateFile: ValidateFile,
): asyncAPI.IAsync<ta.TTestResult> {
    function getTests2(
        path2: fsAPI.Path,
    ): asyncAPI.IAsync<ta.TTestElement> {
        return rewrite(
            directory(
                path2,
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
            ),
            ($): ta.TTestElement => {
                return {
                    type: ["subset", {
                        elements: $
                    }]
                }
            }
        )
    }
    
    return tuple2(
        getTests2(
            [path, "errors"],
        ),
        getTests2(
            [path, "tokens"],
        ),
        ($) => {
            return {
                root: {
                    elements: pl.createDictionary({
                        "errors": $.first,
                        "tokens": $.second,
                    })
                }
            }
        },
    )
}

