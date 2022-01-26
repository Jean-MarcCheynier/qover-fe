import React, { useMemo, useState } from 'react';
import {
  Col, Container, Form, Row,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { RootState } from '../../app/store';
import CoverDetails, { PaymentPeriodEnum } from './CoverDetails';
import { CoverState } from './coverSlice';
import styles from './Cover.module.scss';

export type CoverOptionsProps = CoverState;

function CoverOptions({ details, catalogMap }:CoverOptionsProps) {
  const [selected, setSelected] = useState('UNIVERSAL');
  const [paymentPeriod, setPaymentPeriod] = useState(PaymentPeriodEnum.MONTHLY);

  // Data adaptor calculates cover price
  const coverList = useMemo(() => {
    if (details && details.brand) {
      const { coverOptions } = catalogMap[details.brand];
      const carPrice = details.price || 0;
      const list = Object.entries(coverOptions).map(
        ([coverType, coverDetails]) => {
          const { carPriceMultiplier, basePrice } = coverDetails;
          const price = basePrice + carPriceMultiplier * carPrice;

          return ({
            coverType,
            price,
          });
        },
      );
      return list;
    }
    return [];
  }, [details, catalogMap]);

  return (
    <div className={styles.CoverOption}>
      <Container className="py-2">
        <h1 className="text-center text-white">Select a plan</h1>
        <Form className="w-100 text-center text-white">
          <Form.Label className="text-whte">
            PAY MONTHLY
          </Form.Label>
          <Form.Check
            className={styles.switch}
            onChange={() => setPaymentPeriod((oldValue) => (
              (oldValue === PaymentPeriodEnum.YEARLY)
                ? PaymentPeriodEnum.MONTHLY : PaymentPeriodEnum.YEARLY
            ))}
            type="switch"
            id="custom-switch"
          />
          <Form.Label>
            PAY YEARLY
          </Form.Label>

        </Form>
        <Row>
          { coverList.map(({ coverType, price }) => (
            <Col sm={6} key={coverType}>
              <CoverDetails
                coverType={coverType}
                selected={selected === coverType}
                price={price}
                paymentPeriod={paymentPeriod}
                selectPlan={setSelected}
              />
            </Col>
          ))}
        </Row>
        <Row>
          <Col className="text-center my-3">
            <a className={styles.link} href="/#">Show me the full comparison table</a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state:RootState) => ({
  details: state.cover.details,
  catalogMap: state.cover.catalogMap,
  status: state.cover.status,
});

export default connect(mapStateToProps)(CoverOptions);
