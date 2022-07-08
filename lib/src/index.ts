//export * from "./imp/createTokenizer"

// export * from "./imp/printTokenizer2Error"
// export * from "./imp/printTokenizerError"
// export * from "./imp/printTokenError"
// export * from "./imp/printRange"
// export * from "./imp/printLocation"
// export * from "./imp/getEndLocationFromRange"

export * from "./interface"

import * as tc from "astn-tokenconsumer-api"
import { createTokenizer } from "./imp/createTokenizer"
import { printTokenizerError } from "./imp/printTokenizerError"
import * as inf from "astn-tokenizer-api"

export type IStreamConsumer<DataType, EndDataType> = {
    onData(data: DataType): void
    onEnd(data: EndDataType): void
}

export type CreateTokenizer = ($p: {
    parser: tc.IStructureTokenConsumer<inf.TokenizerAnnotationData>
    onError: ($: {
        error: inf.TokenizerError
        range: inf.Range
    }) => void
}) => IStreamConsumer<string, null>

export type PrintTokenizerError = ($: inf.TokenizerError) => string

export type API = {
    createTokenizer: CreateTokenizer
    createTokenizerErrorMessage: PrintTokenizerError
}

export function init(): API {
    return {
        createTokenizer: createTokenizer,
        createTokenizerErrorMessage: printTokenizerError,
    }

}