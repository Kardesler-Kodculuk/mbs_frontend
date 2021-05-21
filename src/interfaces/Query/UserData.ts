import { User } from "@mbs/interfaces"

export interface UserData {
    user: User | null
    getUser: Function
    isLoading: boolean
}
