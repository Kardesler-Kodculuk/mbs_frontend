import { useState } from 'react';

export default function useForm({ initials }) {
  //Creates Form states
  const [values, setValues] = useState(initials || {});

  //Handles the Form change, changes the given form part value
  const handleChange = (holder, event) => {
    const value = event.target.value;
    const name = holder;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    handleChange,
    values,
  };
}
