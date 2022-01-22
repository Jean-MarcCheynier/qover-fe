import React from 'react';
import Form from 'react-bootstrap/Form';
import { FormControlProps } from 'react-bootstrap/esm/FormControl';
import styles from './QoverInput.module.scss';

interface QoverInputProps extends FormControlProps {
  label: string,
  name: string
}

function QoverInput({ label, ...rest }: QoverInputProps) {
  return (
    <div className={styles.QoverInput}>
      <Form.Label>{label}</Form.Label>
      <Form.Control className={styles.Input} {...rest} />
    </div>
  );
}

export default QoverInput;
