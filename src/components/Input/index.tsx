import { InputHTMLAttributes } from 'react';

import { StylizedInput } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ ...props }: InputProps) {
  return <StylizedInput {...props} />;
}
