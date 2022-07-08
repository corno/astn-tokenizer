import * as tokenLevel from "astn-tokenizer-api"

export type ILocationState = {
    getCurrentLocation(): tokenLevel.Location
    getNextLocation(): tokenLevel.Location
    increase(character: number): void
}