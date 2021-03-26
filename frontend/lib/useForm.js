import { useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    let { name, value, type } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  function resetForm() {
    setInputs({});
  }

  return { inputs, handleChange, clearForm, resetForm };
}
