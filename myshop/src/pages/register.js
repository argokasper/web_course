import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from 'next/link';

import styles from '../styles/Login.module.css';
import { registerSuccessSelector, requestRegister } from '../services/auth';

const Register = () => {
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [unmatchedPasswords, setUnmatchedPasswords] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const success = useSelector(registerSuccessSelector);

  const validateEmail = (value) => {
    setEmailError(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    validateEmail(email);
    setPasswordError(!password.length);
    setPasswordConfirmError(!passwordConfirm.length);
    setUnmatchedPasswords(password !== passwordConfirm);

    if (
      !emailError &&
      !passwordError &&
      !passwordConfirmError &&
      !unmatchedPasswords
    ) {
      dispatch(requestRegister({ email, password, passwordConfirm }));
    }
  };

  if (success) {
    return (
      <Alert severity="success">
        <AlertTitle>Registreeritud!</AlertTitle>
        Sisse logimiseks vajuta <strong><Link href="/login">siia</Link></strong>
      </Alert>
    );
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
      className={styles.wrapper}
    >
      <TextField
        error={emailError}
        id="outlined-error"
        label="E-posti aadress"
        value={email}
        helperText={emailError ? 'Sisesta korrektne e-posti aadress' : ''}
        type="email"
        onInput={(e) => setEmail(e.target.value)}
      />
      <TextField
        error={passwordError}
        id="outlined-error-helper-text"
        label="Parool"
        value={password}
        helperText={passwordError ? 'Sisesta oma parool' : ''}
        type="password"
        onInput={(e) => setPassword(e.target.value)}
      />
      <TextField
        error={passwordConfirmError || unmatchedPasswords}
        id="outlined-error-helper-text"
        label="Kinnita parool"
        value={passwordConfirm}
        helperText={
          passwordConfirmError
            ? 'Sisesta oma parool uuesti'
            : unmatchedPasswords
            ? 'Paroolid ei ühti'
            : ''
        }
        type="password"
        onInput={(e) => setPasswordConfirm(e.target.value)}
      />
      <Button variant="contained" type="submit" className={styles.button}>
        Registeeri
      </Button>
    </Box>
  );
};

export default Register;
