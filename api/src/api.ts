

import * as inf from "./interface"
import * as tc from "astn-tokenconsumer-api"

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

export type CreateRangeMessage = (range: inf.Range) => string
export type CreateLocationMessage = (range: inf.Location) => string

export type API = {
    createTokenizer: CreateTokenizer
    createTokenizerErrorMessage: PrintTokenizerError
    createRangeMessage: CreateRangeMessage
    createLocationMessage: CreateLocationMessage

}
