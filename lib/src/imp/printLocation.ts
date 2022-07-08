import * as tokenLevel from "astn-tokenizer-api"

export function printLocation(location: tokenLevel.Location): string {
    return `${location.line}:${location.column}`
}