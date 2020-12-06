import {
  DatepickerProps,
  Input,
  InputProps,
  Text,
} from '@ui-kitten/components';
import React, { useContext, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { DatePicker } from './DatePicker';
import { FormContext } from './Form';
import { SexSelect, SexSelectProps } from './SexSelect';

type FormFieldType = 'text' | 'date' | 'sexSelect';

interface FormFieldProps {
  name: string;
  type: FormFieldType;
}

export const FormField: React.FC<
  FormFieldProps & (InputProps | DatepickerProps | SexSelectProps)
> = ({ name, type, ...fieldProps }) => {
  const context = useContext(FormContext);

  const renderInner = useMemo(() => {
    if (context) {
      const { control, errors } = context;

      let errorMessage = null;

      if (errors[name]) {
        errorMessage = (
          <Text status="danger" style={styles.errorMessage}>
            {errors[name].message || 'Required field'}
          </Text>
        );
      }

      return (
        <View style={styles.root}>
          <Controller
            name={name}
            control={control}
            render={({ onChange }) => {
              switch (type) {
                case 'text':
                  return (
                    <Input
                      {...fieldProps}
                      onChangeText={onChange}
                      status={errors[name] ? 'danger' : undefined}
                    />
                  );
                case 'date':
                  return <DatePicker {...fieldProps} onSelect={onChange} />;
                case 'sexSelect':
                  return <SexSelect {...fieldProps} onChange={onChange} />;
                default:
                  return null;
              }
            }}
          />

          {errorMessage}
        </View>
      );
    }

    return null;
  }, [context]);

  return renderInner;
};

const styles = StyleSheet.create({
  root: {
    marginBottom: 16,
  },
  errorMessage: {
    marginTop: 4,
  },
});
