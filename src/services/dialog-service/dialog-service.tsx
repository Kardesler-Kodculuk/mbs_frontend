
import React, { useContext, useState } from 'react'
import { DialogContext } from "@mbs/contexts"
import { } from "@mbs/interfaces"
import Alert from "@material-ui/lab/Alert";
import { Dialog } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";

type props = {
    children: React.ReactNode
}


export const DialogProvider = (props: props) => {
    const [dialog, setDialog] = useState<React.FC | null>(null);

    const [open, setOpen] = React.useState(false);

    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };
    const value = {
        dialog,
        setDialog,
        openDialog,
        closeDialog
    }

    return (
        <DialogContext.Provider value={value}>
            {props.children}
        </DialogContext.Provider>
    )
}


export const useDialog = () => {
    return useContext(DialogContext)
}