import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CoverForm from './CoverForm';
import styles from './Cover.module.scss';

function CoverRequest() {
  const navigate = useNavigate();

  return (
    <div className={styles.CoverRequest}>
      <Card className={styles.card}>
        <Card.Body>
          <CoverForm onSubmitSuccess={() => { navigate('/cover/compare-plans'); }} />
        </Card.Body>
      </Card>

    </div>
  );
}

export default CoverRequest;
