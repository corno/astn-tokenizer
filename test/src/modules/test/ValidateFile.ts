import * as asyncAPI from "pareto-async-api"
import { TTestElement } from "pareto-test-api"


export type ValidateFile = (
    path: string,
    fileName: string,
    extension: string,
    actualData: string,
) => asyncAPI.IAsync<TTestElement>