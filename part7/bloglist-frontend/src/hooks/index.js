import { useState } from 'react';

export function useField(type) {
  const [value, setValue] = useState('');

  function onChange(e) {
    setValue(e.target.value);
  }

  function reset() {
    setValue('');
  }

  return { props: { value, type, onChange }, reset };
}
