import { useForm } from 'react-hook-form';

export const useField = (setter: Function) => {
  return {
    handler: (name: string) => {
      return (value: any) => setter(name, value);
    },
  };
};
