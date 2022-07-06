import { TestResult } from "./types";
import * as pr from "pareto-runtime"

export function report($: TestResult) {
    $.toArray().forEach(($) => {
        pr.log(`test: ${$.key} ${$.value.length > 0 ? "failed" : "success"}`)
        $.value.forEach(($) => {
            pr.log(`\t${$.added ? "added" : ""} ${$.removed ? "removed" : ""} ${$.count} ${$.value}`)
        })
    })
}