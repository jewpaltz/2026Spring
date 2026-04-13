interface Array<T> {
    sortBy(key: keyof T, descending?: boolean): T[]
}

Array.prototype.sortBy = function <T>(
    this: T[],
    key: keyof T,
    descending = false,
) {
    return this.sort((a, b) => {
        if (a[key] < b[key]) return descending ? 1 : -1
        if (a[key] > b[key]) return descending ? -1 : 1
        return 0
    })
}
