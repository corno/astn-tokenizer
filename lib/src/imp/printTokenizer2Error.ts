import * as inf from "astn-tokenizer-api"

export function printTokenizer2Error(error: inf.Tokenizer2Error): string {
    return error[0]
}