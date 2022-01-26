/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import * as Yup from 'yup';
import {
  FormikProps,
  Form as FormikForm,
  Field,
  withFormik,
} from 'formik';
import { CatalogMap } from '../../@types/Catalog';
import { getCoverDetails } from './coverSlice';
import { RootState } from '../../app/store';

export interface CoverFormValues {
  age?: number;
  brand?: string;
  price?: number;
}

interface CoverFormProps {
  catalogMap: CatalogMap,
  getCoverDetails: (values: CoverFormValues) => void;
  onSubmitSuccess: () => void;
}

function CoverForm({
  touched,
  errors,
  handleSubmit,
  catalogMap,
}: CoverFormProps & FormikProps<CoverFormValues>) {
  return (
    <FormikForm className="m-auto w-75" onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formAge">
        <Form.Label column sm={3}>Age</Form.Label>
        <Col sm="auto">
          <Field as={Form.Control} name="age" type="number" placeholder="Enter driver's age" />
          <Form.Text className="text-danger">
            {touched.age && errors.age && <div>{errors.age}</div>}
          </Form.Text>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formBrand">
        <Form.Label column sm={3}>Car</Form.Label>
        <Col sm={9}>
          <Field as={Form.Select} name="brand" type="string">
            <option key="default" disabled value="">Select a brand</option>
            { catalogMap && Object.entries(catalogMap).map(([id, catalogItem]) => (
            // eslint-disable-next-line no-underscore-dangle
              <option key={id} value={id}>{catalogItem.brand}</option>
            ))}
          </Field>
          <Form.Text className="text-danger">
            {touched.brand && errors.brand && <div>{errors.brand}</div>}
          </Form.Text>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPrice">
        <Form.Label column sm={3}>Price</Form.Label>
        <Col sm="auto">
          <Field as={Form.Control} name="price" type="number" placeholder="Enter purchase price" />
          <Form.Text className="text-danger">
            {touched.price && errors.price && <div>{errors.price}</div>}
          </Form.Text>
        </Col>
      </Form.Group>
      <Button className="w-100 text-white" type="submit">Get price</Button>
    </FormikForm>
  );
}

const FormikCoverForm = withFormik<CoverFormProps, CoverFormValues>({

  mapPropsToValues: () => ({
    brand: '',
  }),

  validationSchema: ({ catalogMap }: CoverFormProps) => (Yup.object({
    brand: Yup.string().required('Required'),
    age: Yup.number()
      .when('brand', (brand: any, schema: any) => {
        // Update min age validator based on selected brand
        const coverOptions = catalogMap[brand]?.coverOptions;
        if (coverOptions) {
          const { minAge } = Object.values(coverOptions).reduce(
            (acc, item) => ((acc.minAge && acc.minAge < item.minAge) ? acc : item),
          );
          return schema.min(minAge);
        }
        return schema.min(18);
      }),
    price: Yup.number().min(5000, 'Sorry! The price of the car is too low').required('Required'),
  })),

  handleSubmit: (values, { props }) => {
    // eslint-disable-next-line no-shadow
    const { getCoverDetails, onSubmitSuccess } = props;
    getCoverDetails(values);
    onSubmitSuccess();
  },
})(CoverForm);

const mapStateToProps = (state: RootState) => ({ catalogMap: state.cover.catalogMap });
const mapDispatchToProps = {
  getCoverDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormikCoverForm);
