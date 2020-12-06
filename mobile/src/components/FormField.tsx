import {
  DatepickerProps,
  Input,
  InputProps,
  Text,
} from '@ui-kitten/components';
import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
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

  if (context) {
    const { control, errors } = context;

    let errorMessage = null;

    if (errors[name] && errors[name].message !== '') {
      errorMessage = <Text>{errors[name].message}</Text>;
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
                return <SexSelect {...fieldProps} onSelect={onChange} />;
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
};

const styles = StyleSheet.create({
  root: {
    marginBottom: 16,
  },
});
