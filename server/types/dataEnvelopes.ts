/*  B"H
 */

export type DataEnvelope<T> = {
    data: T
    message?: string
    isSuccess: boolean
}

export type DataListEnvelope<T> = DataEnvelope<T[]> & {
    total: number
}
