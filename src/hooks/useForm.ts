import { useState, useEffect } from 'react';


type props<T> = {
    initials: { [key: string]: T }
}

export function useForm<T>({ initials }: props<T>): {
    setValues: (holder: string, value: T) => void
    reset: (newValues: { [key: string]: T }) => void
    values: { [key: string]: T }
} {
    //Creates Form states
    const [values, setValues] = useState<{ [key: string]: T }>(initials || {});

    const reset = (newValues: { [key: string]: T }) => {
        setValues(newValues)
    }

    //Handles the Form change, changes the given form part value
    const handleChange = (holder: string, value: T) => {
        setValues((values) => {
            return {
                ...values,
                [holder]: value,
            }
        });
    };

    return {
        setValues: handleChange,
        reset,
        values,
    };
}
