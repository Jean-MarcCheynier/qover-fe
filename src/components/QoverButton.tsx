import React from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import styles from './QoverButton.module.scss';

function QoverButton({ className, ...rest }: ButtonProps) {
  return <Button className={`${styles.QoverButton} ${className}`} {...rest} />;
}

export default QoverButton;
