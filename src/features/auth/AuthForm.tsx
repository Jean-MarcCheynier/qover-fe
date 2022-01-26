import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QoverInput from '../../components/QoverInput';
import styles from './Auth.module.scss';
import { LoginPayload } from './authAPI';
import { loginAsync } from './authSlice';
import QoverButton from '../../components/QoverButton';
import QoverCheckbox from '../../components/QoverCheckbox';

interface AuthProps {
  // eslint-disable-next-line no-unused-vars
  loginAsync: (loginPayload: LoginPayload) => Promise<any>
}

// eslint-disable-next-line no-shadow
function Auth({ loginAsync }: AuthProps) {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginPayload>({
    username: '',
    password: '',
  });

  const from = '/';

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  };

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    loginAsync(form).then(() => {
      navigate(from, { replace: true });
    });
  };

  return (
    <div className={styles.Auth}>
      <div className={styles.title}>
        Welcome at Qover
      </div>
      <QoverInput label="Email" type="email" name="username" value={form.username} onChange={handleOnChange} />
      <QoverInput label="Password" type="password" name="password" value={form.password} onChange={handleOnChange} />
      <div className={styles.helper}>
        <QoverCheckbox />
        <small className="ms-2 align-top">Remember me</small>
        <small className="text-primary float-end">Forgot your password ?</small>
      </div>
      <QoverButton className="w-100 text-white" variant="primary" onClick={handleOnSubmit}>Sign in to your account</QoverButton>
    </div>
  );
}

const mapDispatchToProps = {
  loginAsync,
};

export default connect(null, mapDispatchToProps)(Auth);
