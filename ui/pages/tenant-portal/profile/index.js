import { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import useAuth from 'hooks/useAuth'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { getLayout } from 'components/layouts/TenantPortalLayout'
import { useForm } from 'react-hook-form';
import axios from 'axios';

const TenantProfile = () => {
  const { user } = useAuth0();
  const { tokenized } = useAuth();
  const [landlord, setLandlord] = useState()
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(async () => {
    if (!tokenized) return
    await axios.get('/api/tenants/search/findByCreatedBy', {
      params: {
        email: user.email
      }
    }).then(({ data }) => {
      setLandlord(data)
    }).catch(() => {
      setLandlord({
        email: user.email
      })
    })
  }, [tokenized])

  const onSubmit = async data => {
    setSaving(true)
    if (landlord.id) {
      await axios.patch(`/api/tenants/${landlord.id}`, data)
    } else {
      await axios.post('/api/tenants', data)
    }
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
    <Breadcrumbs aria-label="breadcrumb">
      <Typography color="text.primary">Profile</Typography>
    </Breadcrumbs>
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
              {...register('email')}
              margin="normal"
              size="small"
              label="Email"
              disabled
              defaultValue={landlord?.createdBy || user?.email}
            />
          </Grid>
        </Grid>
        </Box>
      <Box m={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LoadingButton variant="contained" type="submit" loading={saving}>Save</LoadingButton>
      </Box>
    </form>
  </>
}

TenantProfile.getLayout = getLayout;

export default TenantProfile
