import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import LoginButton from 'components/LoginButton'
import axios from 'axios';


const SignUp = () => {
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();

  const onSubmit = async data => {
    setSaving(true)
    await axios.post('/api/sign-up/tenant', data)
    setShowSuccess(true)
  };

  const showHelperText = (name) => {
    return errors[name]?.message
  }

  const showError = (name) => {
    return errors[name] !== undefined
  }

  const validatePasswordComplexity = (str) => {
    if (str.length < 8) {
      return 'Must have 8 characters in length'
    } else if (!(/[a-z]/.test(str)) || !(/[A-Z]/.test(str)) || !(/[0-9]/.test(str))) {
      return 'Must contain one lower case (a-z), upper case (A-Z) and a number (0-9)'
    } else if (!/[!@#$%^&*]/.test(str)) {
      return 'Must contain one special character: !@#$%^&*'
    } else {
      return true
    }
  }

  const validatePasswordVerification = (str) => {
    if (str === getValues("password")) {
      return true
    }

    return 'Passwords do not match'
  }

  if (showSuccess) {
    return <Container maxWidth="sm">
      <Box m={2}>
        <Typography variant="h2">Account created!</Typography>
        <Typography>Click here to login.</Typography>
      </Box>
      <Box m={2}>
        <LoginButton />
      </Box>
    </Container>
  }

  return <>
    <Container maxWidth="sm">
      <Box m={2}>
        <Typography variant="h2">Create account</Typography>
        <Typography>Enter your information below.</Typography>
      </Box>
      <Box m={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('fullName', { required: 'Full Name is a required field.' })}
            fullWidth
            required
            margin="normal"
            size="small"
            label="Full Name"
            helperText={showHelperText('fullName')}
            error={showError('fullName')  }
            />
          <TextField
            {...register('email', { required: 'Email is a required field.' })}
            fullWidth
            required
            margin="normal"
            size="small"
            label="Email"
            helperText={showHelperText('email')}
            error={showError('email')  }
            />
          <TextField
            {...register('password', {
              required: 'Password is a required field.',
              validate: validatePasswordComplexity
            })}
            fullWidth
            required
            margin="normal"
            size="small"
            type="password"
            label="Password"
            helperText={showHelperText('password')}
            error={showError('password')  }
            />
          <TextField
            {...register('verifyPassword', {
              required: 'Password verification is required.',
              validate: validatePasswordVerification
            })}
            fullWidth
            required
            type="password"
            margin="normal"
            size="small"
            label="Verify Password"
            helperText={showHelperText('verifyPassword')}
            error={showError('verifyPassword')  }
            />
          <Box m={2}>
            <LoadingButton fullWidth variant="contained" type="submit" loading={saving}>Create</LoadingButton>
          </Box>
        </form>
      </Box>
    </Container>
  </>
}

export default SignUp
