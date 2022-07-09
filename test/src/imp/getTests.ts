
import * as lib from "astn-tokenizer-api"

import * as pr from "pareto-runtime"
import * as pa from "pareto-api-core"
import * as pl from "pareto-lib-core"
import * as tc from "astn-tokenconsumer-api"

import * as fsAPI from "pareto-filesystem-api"

import { Directory, File } from "pareto-handledfilesystem-api"
import * as ta from "pareto-test-api"
import * as afAPI from "pareto-async-functions-api"


export function getTests(
    path: string,
    rewrite: afAPI.Rewrite,
    tuple3: afAPI.Tuple3,
    directory: Directory,
    file: File,
    createTokenizer: lib.CreateTokenizer,
    validateFile: ta.ValidateFile,
): pa.IAsync<ta.TTestResult> {
    function getTests2(
        path2: fsAPI.Path,
    ): pa.IAsync<ta.TTestElement> {
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
    
    return tuple3(
        getTests2(
            [path, "errors"],
        ),
        getTests2(
            [path, "other"],
        ),
        getTests2(
            [path, "tokens"],
        ),
        ($) => {
            return {
                root: {
                    elements: pl.createDictionary({
                        "errors": $.first,
                        "other": $.second,
                        "tokens": $.third,
                    })
                }
            }
        },
    )
}

