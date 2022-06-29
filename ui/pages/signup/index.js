import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const SignUp = () => {
  return <>
    <Container maxWidth="sm">
      <Box m={2}>
        <Typography variant="h2">Create account</Typography>
        <Typography>Enter your information below to continue.</Typography>
      </Box>
      <Box m={2} component="form">
        <TextField fullWidth required margin="normal" label="Full Name" variant="outlined" />
        <TextField fullWidth required margin="normal" label="Company" variant="outlined" />
        <TextField fullWidth required margin="normal" label="Email" variant="outlined" type="email"/>
        <TextField fullWidth required margin="normal" label="Password" variant="outlined" type="password"/>
        <Box m={2}>
          <Button fullWidth variant="contained" onClick={() => {}}>Continue</Button>
        </Box>
      </Box>
    </Container>
  </>
}

export default SignUp
