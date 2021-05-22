
export interface Query {
    queryID: <T>(endPoint: string) => Promise<T>
    queryInfo: <T>(endPoint: string, IDList: number[], postfix?: string) => Promise<T[]>
    updateInfo: <T> (endPoint: string, ID: number, body: { [key: string]: string | number }) => Promise<T>
    postAction: <T>(endPoint: string, ID: number) => Promise<T>
    postActionWithBody: <T>(endPoint: string, body: { [key: string]: string | number }) => Promise<T>
}

