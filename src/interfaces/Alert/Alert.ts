

export interface Alerts {
    alerts: Alert[]
    createAlert: (name: string, page: string, body: string, type: Color) => void
    createAlerts: (alerts: [string, string, string, Color][]) => void
    openAlert: (name: string, page: string) => void
    closeAlert: (name: string, page: string) => void
    PageAlert: JSX.Element | null
}
export type Color = "success" | "info" | "warning" | "error"

export interface Alert {
    name: string
    page: string
    body: string
    type: Color
    open: boolean
}