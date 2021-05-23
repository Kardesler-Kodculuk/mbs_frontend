import React from "react";

export interface Dialog {
    dialog: React.FC | null
    setDialog: React.Dispatch<React.SetStateAction<React.FC<{}> | null>>
    openDialog: () => void
    closeDialog: () => void
}