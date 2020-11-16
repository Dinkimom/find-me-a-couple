import Alert from 'antd/lib/alert';
import { FormInstance } from 'antd/lib/form';
import React, { useEffect } from 'react';
import { ErrorDto } from '../dtos/ErrorDto';
import { LoginDto } from '../dtos/LoginDto';

export const useFormErrors = (error: ErrorDto | null, ref: any) => {
  useEffect(() => {
    const form = ref.current;

    if (form && error && error.errors) {
      const fieldData = error.errors.map((item) => ({
        name: item.param,
        errors: [item.msg],
      }));

      (form as FormInstance<LoginDto>).setFields(fieldData);
    }
  }, [error, ref]);

  return (
    error?.errorMessage && (
      <Alert
        message={error?.errorMessage}
        type="error"
        style={{ marginBottom: 16 }}
      />
    )
  );
};
