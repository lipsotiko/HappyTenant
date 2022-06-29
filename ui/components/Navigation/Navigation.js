import { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import HandymanIcon from '@mui/icons-material/Handyman';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth0 } from "@auth0/auth0-react";
import useAuth from '../../hooks/useAuth'
import { useRouter } from 'next/router';

const drawerWidth = 188;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Navigation = (props) => {
  const { isLoading, isAuthenticated } = useAuth();
  const { logout } = useAuth0();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openedViaMenu, setOpenedViaMenu] = useState(false)
  const [selected, setSelected] = useState(undefined);
  const [anchorEl, setAnchorEl] = useState(undefined);
  const openAccountMenu = Boolean(anchorEl);
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpenedViaMenu(true)
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpenedViaMenu(false)
    setOpen(false);
  };

  const handleDrawerHoverEnter = () => {
    if (!openedViaMenu) setOpen(true)
  }

  const handleDrawerHoverLeave = () => {
    if (!openedViaMenu) setOpen(false)
  }

  const handleClickAccount = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAccountMenu = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <DashboardIcon />,
      route: '/'
    }, {
      name: 'Properties',
      icon: <MapsHomeWorkIcon />,
      route: '/properties'
    }, {
      name: 'Tenants',
      icon: <GroupsIcon />,
      route: '/tenants'
    }, {
      name: 'Maintenance',
      icon: <HandymanIcon />,
      route: '/maintenance'
    }, {
      name: 'Settings',
      icon: <SettingsIcon />,
      route: '/settings'
    }
  ];

  useEffect(() => {
    const item = menuItems.find(item => item.route === router.pathname)
    if (item) {
      setSelected(item.name)
    }
  }, []);

  const handleSelect = (item) => {
    setSelected(item.name)
    router.push(item.route)
  }

  const handleProfileSelect = () => {
    setSelected(undefined)
    router.push('/profile')
  }

  if (isLoading) {
    return <>loading...</>
  }

  if (!isAuthenticated) {
    return <>{props.children}</>
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Happy Tenant
          </Typography>
          <div>
            <IconButton
              id="basic-button"
              color="inherit"
              aria-controls={openAccountMenu ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openAccountMenu ? 'true' : undefined}
              onClick={handleClickAccount}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openAccountMenu}
              onClose={handleCloseAccountMenu}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => handleProfileSelect()}>Profile</MenuItem>
              <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} onMouseEnter={() => handleDrawerHoverEnter()} onMouseLeave={() => handleDrawerHoverLeave()}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <nav>
          <List>
            {menuItems.map((i) => (
              <ListItem key={i.name} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  selected={selected === i.name}
                  onClick={() => handleSelect(i)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    { i.icon }
                  </ListItemIcon>
                  <ListItemText primary={i.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        { props.children }
      </Box>
    </Box>
  );
}

export default Navigation;
