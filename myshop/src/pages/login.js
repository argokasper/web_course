import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import styles from '../styles/Login.module.css';
import { loginSuccessSelector, requestLogin } from '../services/auth';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginSuccess = useSelector(loginSuccessSelector);

  useEffect(() => {
    if (loginSuccess) router.replace('/');
  }, [loginSuccess]);

  const validateEmail = (value) => {
    setEmailError(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    validateEmail(email);
    setPasswordError(!password.length);

    if (!emailError && !passwordError) {
      dispatch(requestLogin({ email, password }));
    }
  };

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
      <Button variant="contained" type="submit" className={styles.button}>
        Logi sisse
      </Button>
      <Link href="/register">Konto puudub, mine registreerima</Link>
    </Box>
  );
};

export default Login;
