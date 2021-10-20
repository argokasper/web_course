import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import styles from '../styles/Login.module.css';
import { requestLogin } from '../services/auth';

const Login = () => {
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmailError(!email.length);
    setPasswordError(!password.length);
  }, [email, password]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(requestLogin({ email, password }));
      console.log('loggin in');
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
        helperText={emailError ? 'Sisesta e-posti aadress' : ''}
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
      <Button disabled={emailError || passwordError} variant="contained" type="submit" className={styles.button}>
        Logi sisse
      </Button>
    </Box>
  );
};

export default Login;
