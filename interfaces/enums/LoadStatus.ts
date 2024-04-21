export enum LoadStatus {
    REST = 'rest',
    PENDING = 'pending', 
    SUCCESS = 'success',
    MISS = 'miss',
    FAIL = 'fail',
}
export type IWithLoadStatus<T> = { data: T,  loadStatus : LoadStatus };