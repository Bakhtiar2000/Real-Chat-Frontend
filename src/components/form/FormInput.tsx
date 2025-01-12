import React from 'react';
import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

const FormInput = ({ type, name, label, disabled }: TInputProps) => {
  return (
    <div className='lg:w-64 duration-300'>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              size="large"
              type={type}
              id={name}
              disabled={disabled}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default FormInput;
