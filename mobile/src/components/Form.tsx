import React, { ReactNode, useEffect } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
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
  defaultValues?: {
    [key: string]: any;
  };
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
  defaultValues,
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
  }, []);

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
    <FormContext.Provider value={{ control, setValue, errors, defaultValues }}>
      <View>{children}</View>

      <Button
        loading={loading}
        onPress={handleSubmit(onSubmit)}
        style={styles.formButton}
      >
        SUBMIT
      </Button>

      {outerErrors?.errorMessage && (
        <Text status="danger" style={styles.errorMessage}>
          {outerErrors?.errorMessage}
        </Text>
      )}
    </FormContext.Provider>
  );
};

const styles = StyleSheet.create({
  formButton: {
    marginBottom: 16,
  },
  errorMessage: {
    textAlign: 'center',
    marginBottom: 16,
  },
});
