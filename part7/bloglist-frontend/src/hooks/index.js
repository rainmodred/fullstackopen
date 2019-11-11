import { useState } from 'react';

export function useField(type, placeholder) {
  const [value, setValue] = useState('');

  function onChange(e) {
    setValue(e.target.value);
  }

  function reset() {
    setValue('');
  }

  return { props: { value, type, onChange, placeholder }, reset };
}
