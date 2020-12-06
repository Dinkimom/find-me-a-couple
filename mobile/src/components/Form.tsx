import React, { ReactNode, useEffect } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { ErrorDto } from '../dtos/ErrorDto';
import { Error } from '../types/Error';
import { Button } from './Button';

export const FormContext = React.createContext();

interface Props {
  errors: ErrorDto | null;
  onSubmit: Function;
  children: ReactNode;
  loading: boolean;
  rules?: ValidationRules;
}

interface ValidationRules {
  [key: string]: RegisterOptions;
}

export const Form: React.FC<Props> = ({
  errors: outerErrors,
  children,
  onSubmit,
  loading,
  rules,
}) => {
  const {
    control,
    setValue,
    errors,
    setError,
    handleSubmit,
    register,
  } = useForm();

  useEffect(() => {
    if (rules) {
      Object.keys(rules).forEach((fieldName) =>
        register(fieldName, rules[fieldName])
      );
    }
  }, [rules]);

  useEffect(() => {
    if (outerErrors?.errors) {
      outerErrors?.errors.forEach((error: Error) =>
        setError(error.param, {
          type: 'manual',
          message: error.msg,
        })
      );
    }
  }, [outerErrors]);

  return (
    <FormContext.Provider value={{ control, setValue, errors }}>
      <View>{children}</View>
      {outerErrors?.errorMessage && <Text>{outerErrors?.errorMessage}</Text>}
      <Button loading={loading} onPress={handleSubmit(onSubmit)}>
        SUBMIT
      </Button>
    </FormContext.Provider>
  );
};
