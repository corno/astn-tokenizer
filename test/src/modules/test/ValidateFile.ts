import * as asyncAPI from "pareto-async-api"
import * as diffAPI from "pareto-diff-api"


export type ValidateFile = (
    path: string,
    fileName: string,
    extension: string,
    actualData: string,
) => asyncAPI.IAsync<diffAPI.Change[]>