import { useAuth0 } from "@auth0/auth0-react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styles from './Login.module.css'
import { useRouter } from 'next/router';

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const { push } = useRouter();

  return <>
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <Typography className={styles.dontHaveAccount}>Don't have an account? </Typography>
      <Button variant="outlined" onClick={() => push('/signup')}>Sign Up</Button>
    </Box>
    <Container maxWidth="sm">
      <Box m={2}>
        <Typography variant="h1">Welcome!</Typography>
        <Typography>Happy Tenant, a property management platform.</Typography>
      </Box>
      <Divider light />
      <Box m={2}>
        <Button fullWidth variant="contained" onClick={() => loginWithRedirect()}>Log In</Button>
      </Box>
    </Container>
  </>
}

export default Login
