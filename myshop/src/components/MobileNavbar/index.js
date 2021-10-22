import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { categoriesSelector } from '../../services/categories';
import { loggedInSelector, requestLogout } from '../../services/auth';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const MobileNavbar = ({ tabName = 'MyShop' }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const categories = useSelector(categoriesSelector);
  const isUserLoggedIn = useSelector(loggedInSelector);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {tabName}
            </Typography>
          </Link>
          {isUserLoggedIn ? (
            <Button onClick={() => dispatch(requestLogout())} color="inherit">
              Logi välja
            </Button>
          ) : (
            <Button href="/login" color="inherit">
              Logi sisse
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {categories.map((category, index) => (
          <List key={category.id}>
            <ListItem button key={category.slug}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItem>
          </List>
        ))}
      </Drawer>
    </>
  );
};

export default MobileNavbar;
