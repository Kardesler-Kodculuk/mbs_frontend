
export interface Auth {
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
    error: boolean
}