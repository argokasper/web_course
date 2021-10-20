import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Footer from '../Footer';
import MobileNavbar from '../MobileNavbar';

import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={styles.container}>
      {isMobile && <MobileNavbar />}
      <Container>{children}</Container>
      <Footer />
    </div>
  );
};

export default Layout;
