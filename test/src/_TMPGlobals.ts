interface Array<T> {
    length: number
    filter: (callback: ($: T) => boolean) => Array<T>
    push(v: T): void

}

interface String {
    //readonly length: number
    //substring(begin: number, end: number): string
    //substr(begin: number): string
    //charCodeAt(index: number): number
    split(splitter: string): string[]
    // startsWith(str: string): boolean
    // replace(str: RegExp, rv: string): string
    //toUpperCase(): string
    //padStart():
}

interface ErrorConstructor {
    new(message?: string): Error
}

declare let Error: ErrorConstructor;
