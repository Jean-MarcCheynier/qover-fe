import { RecordWithTtl } from 'dns';
import React from 'react';
import { Image } from 'react-bootstrap';
import QoverButton from '../../components/QoverButton';
import styles from './Auth.module.scss';

type AuthBgProps = {
  children: React.ReactNode
}

function AuthBg({ children }: AuthBgProps) {
  return (
    <div className={styles.AuthBg}>
      <div className={styles.header}>QOVER.ME</div>
      <div className={styles.container}>
        <div className="text-center my-3">
          <Image src="img/qover-v-blue.svg" />
        </div>
        {children}
        <br />
        <QoverButton className="w-100 text-white" variant="outline-primary">
          Don&apos;t have access?
          <span>Ask access</span>
        </QoverButton>
      </div>
      <div className={styles.footer}>&copy; Qover 2017</div>
    </div>
  );
}

export default AuthBg;
