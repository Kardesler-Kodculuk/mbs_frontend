
export interface Query {
    queryID: <T>(endPoint: string) => Promise<T>
    queryInfo: <T>(endPoint: string, IDList: number[]) => Promise<T[]>
    updateInfo: <T> (endPoint: string, ID: number, body: { [key: string]: any }) => Promise<T>
    postAction: <T>(endPoint: string, ID: number) => Promise<T>
    postActionWithBody: <T>(endPoint: string, body: { [key: string]: any }) => Promise<T>
    deleteID<T>(endPoint: string): Promise<T>
    putID<T>(endPoint: string): Promise<T>
}

