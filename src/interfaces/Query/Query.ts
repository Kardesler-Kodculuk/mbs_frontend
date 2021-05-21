
export interface Query {
    queryID: <T>(endPoint: string) => Promise<T>
    queryInfo: <T>(endPoint: string, IDList: number[]) => Promise<T[]>
    updateInfo: <T> (endPoint: string, ID: number, body: { [key: string]: string | number }) => Promise<T>
}

