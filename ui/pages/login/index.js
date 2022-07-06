import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styles from './Login.module.css'
import { useRouter } from 'next/router';
import LoginButton from '../../components/LoginButton'

const Login = () => {
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
        <Typography variant="h2">Welcome!</Typography>
        <Typography>Happy Tenant, a simple property management platform.</Typography>
      </Box>
      <Divider light />
      <Box m={2}>
        <LoginButton />
      </Box>
    </Container>
  </>
}

export default Login
