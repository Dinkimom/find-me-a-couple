import { useForm } from 'react-hook-form';

export const useField = (setter: Function, errors: any) => {
  return {
    handler: (name: string) => {
      return (value: any) => setter(name, value);
    },
    status: (name: string) => (errors[name] ? 'danger' : undefined),
  };
};
