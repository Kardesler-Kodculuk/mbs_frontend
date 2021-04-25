import { useState } from 'react';

export default function useForm({ initials }) {
  const [values, setValues] = useState(initials || {});

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
