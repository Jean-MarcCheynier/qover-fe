/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import * as Yup from 'yup';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  withFormik,
  FormikErrors,
} from 'formik';
import styles from './Cover.module.scss';

interface CoverFormValues {
  age?: number;
  brand?: string;
  price?: number;
}

type CoverFormProps = {
  //submit: () => void
}

function InnerForm({
  touched,
  errors,
  isSubmitting,
}: CoverFormProps & FormikProps<CoverFormValues>) {
  const initialValues: CoverFormValues = {};
  return (
    <Form>
      <label>Age</label>
      <Field id="age" name="age" />
      <label>Car</label>
      <Field id="brand" name="brand" />
      <label>Price</label>
      <Field id="price" name="price" />
      <button type="submit">Submit</button>
    </Form>
  );
}

const CoverForm = withFormik<CoverFormProps, CoverFormValues>({
  // Transform outer props into form values

  mapPropsToValues: () => ({
  }),

  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object({
    age: Yup.number().min(18, 'Sorry! The driver is too young').required('Required'),
    brand: Yup.string().required('Required'),
    price: Yup.number().min(5000, 'Sorry! The price of the car is too low').required('Required'),
  }),

  handleSubmit: (values) => {
    // do submitting things
  },
})(InnerForm);

export default CoverForm;
