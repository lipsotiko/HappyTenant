import { useEffect, useState, useMemo } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Crumbs from 'components/Crumbs';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { getLayout } from 'components/layouts/LandlordLayout'
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth0();
  const [landlord, setLandlord] = useState()
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      await axios.get('/api/landlord-user/profile', {
        params: {
          returnPath: '/profile'
        }
      }).then(({ data }) => {
        setLandlord(data)
      })
    }
    fetchProfile()
  }, [])

  const onSubmit = async data => {
    setSaving(true)
    await axios.patch(`/api/landlordUsers/${landlord.id}`, data)
    setSaving(false)
  }

  const showHelperText = (name) => {
    return errors[name]?.message
  }

  const showError = (name) => {
    return errors[name] !== undefined
  }

  if (!landlord) {
    return <></>
  }

  return <>
    <Crumbs crumbs={[{
        title: 'Profile'
      }]}
    />
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box m={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...register('fullName', { required: 'Full Name is a required field.' })}
              required
              margin="normal"
              size="small"
              label="Full Name"
              helperText={showHelperText('fullName')}
              error={showError('fullName')  }
              defaultValue={landlord?.fullName}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('organization')}
              margin="normal"
              size="small"
              label="Organization"
              defaultValue={landlord?.organization}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('email')}
              margin="normal"
              size="small"
              label="Email"
              disabled
              defaultValue={landlord?.createdBy || user?.email}
            />
          </Grid>
          <Grid item xs={12}>
            { !landlord.paymentAccountStatus?.isOnboarded &&
               <Alert severity="warning">
                Click <Link className="pointer" href={landlord.paymentAccountStatus?.onboardingUrl}>here</Link> to configure your payout method with Stripe.
              </Alert>
            }
            { landlord.paymentAccountStatus?.isOnboarded &&
              <Alert severity="info">
                Click <Link className="pointer" href={landlord.paymentAccountStatus?.loginUrl}>here</Link> to log in to Stripe.
              </Alert>
            }
          </Grid>
        </Grid>
      </Box>
      <Box m={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LoadingButton variant="contained" type="submit" loading={saving}>Save</LoadingButton>
      </Box>
    </form>
  </>
}

Profile.getLayout = getLayout;

export default Profile
