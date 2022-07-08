import * as pl from "pareto-lang-lib"

import * as astn from "astn-tokenizer-api"

export function printTokenError($: astn.TokenError): string {

    switch ($.type[0]) {
        case "expected hexadecimal digit": {
            const $$ = $.type[1]
            return `expected hexadecimal digit: 0-9, A-F or a-f, but found ${$$.found}`
        }
        case "expected special character after escape slash": {
            const $$ = $.type[1]
            return `expected special character after escape slash, but found ${$$.found}`
        }
        case "found dangling slash": {
            return `found dangling slash`
        }
        case "found dangling slash at the end of the text": {
            return `found dangling slash at the end of the text`
        }
        case "unterminated block comment": {
            return `unterminated block comment`
        }
        case "unterminated string": {
            return `unterminated string`
        }
        default:
            return pl.au($.type[0])
    }
}
