import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { loggedInSelector, loginSuccessSelector, requestLogout, logoutSuccessSelector } from '../../services/auth';

import Footer from '../Footer';
import MobileNavbar from '../MobileNavbar';

import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isUserLoggedIn = useSelector(loggedInSelector);
  const loginSuccess = useSelector(loginSuccessSelector);
  const logoutSuccess = useSelector(logoutSuccessSelector);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  useEffect(() => {
    if (loginSuccess) setShowLoginMessage(true);
  }, [loginSuccess]);

  useEffect(() => {
    if (logoutSuccess) setShowLogoutMessage(true);
  }, [logoutSuccess]);

  return (
    <div className={styles.container}>
      {isMobile && <MobileNavbar />}
      {!isMobile && (
        <>
          {isUserLoggedIn ? (
            <Button onClick={() => dispatch(requestLogout())} color="inherit">
              Logi välja
            </Button>
          ) : (
            <Button href="/login" color="inherit">
              Logi sisse
            </Button>
          )}
        </>
      )}

      {showLoginMessage && <Alert onClose={() => setShowLoginMessage(false)}>Oled sisse logitud</Alert>}
      {showLogoutMessage && <Alert onClose={() => setShowLogoutMessage(false)}>Oled välja logitud</Alert>}

      <Container>{children}</Container>
      <Footer />
    </div>
  );
};

export default Layout;
