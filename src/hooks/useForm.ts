import { useState } from 'react';


type props<T> = {
    initials: { [key: string]: T }
}

export function useForm<T>({ initials }: props<T>): {
    setValues: Function
    values: { [key: string]: T }
} {
    //Creates Form states
    const [values, setValues] = useState(initials || {});

    //Handles the Form change, changes the given form part value
    const handleChange = (holder: string, value: T) => {
        setValues({
            ...values,
            [holder]: value,
        });
    };

    return {
        setValues: handleChange,
        values,
    };
}
