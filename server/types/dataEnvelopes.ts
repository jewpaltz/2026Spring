/*  B"H
 */

export type DataEnvelope<T> = {
    data: T
    isSuccess: boolean
    message?: string
}

export type DataListEnvelope<T> = DataEnvelope<T[]> & {
    total: number
}

export type PagingRequest = {
    page?: number
    pageSize?: number
    search?: string
    sortBy?: string
    descending?: boolean
}
