import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import {
  Button, Card, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import { RootState } from '../../app/store';
import styles from './Cover.module.scss';

// eslint-disable-next-line no-shadow
export enum PaymentPeriodEnum {
  // eslint-disable-next-line no-unused-vars
  YEARLY = 'yearly',
  // eslint-disable-next-line no-unused-vars
  MONTHLY = 'monthly',
}

export type CoverdetailsProps = {
  coverType: string;
  price: number;
  paymentPeriod: PaymentPeriodEnum;
  selected: boolean,
  // eslint-disable-next-line no-unused-vars
  selectPlan: (coverType: string) => void,
}

function CoverDetails({
  coverType, price, paymentPeriod, selected, selectPlan,
}:CoverdetailsProps) {
  const pricePeriod = useMemo(() => (
    (paymentPeriod === PaymentPeriodEnum.MONTHLY) ? price / 12 : price), [price, paymentPeriod]);

  return (
    <Card className={`${styles.CoverDetails} ${selected ? styles.selected : styles.notSelected}`}>
      <Card.Body>
        <Card.Title className={`${styles.title} ${styles.item}`}>{coverType}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem className={`${styles.item} ${styles.price}`}>
          <h1>{pricePeriod.toFixed(2)}</h1>
          <div>{`${paymentPeriod} INCL. TAXES`}</div>
        </ListGroupItem>
        <ListGroupItem className={styles.item}>Maximum duration travel of 90 days</ListGroupItem>
        <ListGroupItem className={styles.item}>
          Medical expenses reimbursement up to 1.000.000
        </ListGroupItem>
        <ListGroupItem className={styles.item}>
          Personal assistance abroad up to 5000€
        </ListGroupItem>
        <ListGroupItem className={styles.item}>
          Travel assistance abroad up to 1000€ per insured per travel
        </ListGroupItem>
        <ListGroupItem className={styles.item}>Coverage duration: 1 year</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Button
          className={styles.Button}
          onClick={() => selectPlan(coverType)}
        >
          {selected ? 'Plan selected' : 'Choose this plan'}
        </Button>
      </Card.Body>
    </Card>
  );
}

const mapStateToProps = (state:RootState) => ({
  details: state.cover.details,
  catalogMap: state.cover.catalogMap,
});

export default connect(mapStateToProps)(CoverDetails);
