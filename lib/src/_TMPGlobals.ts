interface Array<T> {
    concat(array: T[]): T[]
}
interface String {
    readonly length: number

    substring(begin: number, end: number): string
    substr(begin: number): string
    charCodeAt(index: number): number
    //split(splitter: string): string[]
    startsWith(str: string): boolean
    // replace(str: RegExp, rv: string): string
    //toUpperCase(): string
    //padStart():
}