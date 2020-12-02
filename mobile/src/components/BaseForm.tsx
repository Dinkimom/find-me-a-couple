import React, { ReactNode, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { ErrorDto } from '../dtos/ErrorDto';
import { useFormErrors } from '../hooks/useFormErrors';
import { Avatar, Button, Divider, Text } from '@ui-kitten/components';

export interface BaseFormProps {
  isFetching: boolean;
  error: ErrorDto | null;
  onSubmit: (data: any) => void;
  children?: ReactNode | null;
  defaultValues?: { [key: string]: any } | null;
  footer?: ReactNode;
}

export const BaseForm: React.FC<BaseFormProps> = ({
  isFetching,
  error,
  onSubmit,
  children,
  defaultValues,
  footer,
}) => {
  const formRef: any = useRef();

  const errorMessage = useFormErrors(error, formRef);

  const renderFooter = () => {
    if (footer === undefined) {
      return <></>;
    }

    return footer;
  };

  return (
    <>
      <View style={styles.formContent}>
        {children}
        {errorMessage}
        {renderFooter()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  formContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: 300,
    marginTop: 32,
  },
  formFooter: {
    marginTop: 32,
  },
  formButton: {
    width: '100%',
  },
});
