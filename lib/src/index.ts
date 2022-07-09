//export * from "./imp/createTokenizer"

// export * from "./imp/printTokenizer2Error"
// export * from "./imp/printTokenizerError"
// export * from "./imp/printTokenError"
// export * from "./imp/printRange"
// export * from "./imp/printLocation"
// export * from "./imp/getEndLocationFromRange"

export * from "./interface"

import { createTokenizer } from "./imp/createTokenizer"
import { printTokenizerError } from "./imp/printTokenizerError"
import * as api from "astn-tokenizer-api"
import { printLocation } from "./imp/printLocation"
import { printRange } from "./imp/printRange"
import { getEndLocationFromRange } from "./imp/getEndLocationFromRange"

export function init(): api.API {
    return {
        createTokenizer: createTokenizer,
        createTokenizerErrorMessage: printTokenizerError,
        createLocationMessage: printLocation,
        createRangeMessage: printRange,
        getEndLocationFromRange: getEndLocationFromRange,
    }

}