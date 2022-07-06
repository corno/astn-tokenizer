import { File, WriteFile, Unlink } from "../fs/HandledFilesystem"
import * as asyncAPI from "pareto-async-api"
import * as diffAPI from "pareto-diff-api"
import { ValidateFile } from "./ValidateFile"


export function createValidateFile(
    file: File,
    writeFile: WriteFile,
    unlink: Unlink,
    diffLines: diffAPI.DiffLines,
    asyncValue: asyncAPI.Value,
): ValidateFile {
    return (
        path: string,
        fileName: string,
        extension: string,
        actualData: string,
    ): asyncAPI.IAsync<diffAPI.Change[]> => {
        return file(
            [path, `${fileName}.expected.${extension}`],
            (expectedData) => {
                const actualFileName = `${fileName}.actual.${extension}`
                if (actualData !== expectedData) {
                    writeFile(
                        [path, actualFileName],
                        actualData
                    )
                } else {
                    unlink(
                        [path, actualFileName],
                    )
                }
                return asyncValue(
                    diffLines(expectedData, actualData, { newlineIsToken: false }).filter(($) => $.added === true || $.removed === true )
                )
            }
        )
    }
}
