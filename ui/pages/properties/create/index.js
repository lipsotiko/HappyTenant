import { useState } from 'react'
import Crumbs from 'components/Crumbs'
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { MANAGEMENT_PORTAL_BASE_ROUTE } from 'util/constants'
import { getLayout } from 'components/layouts/LandlordLayout'

const CreateProperty = () => {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async data => {
    setSaving(true)
    await axios.post('/api/properties', data)
    router.push(MANAGEMENT_PORTAL_BASE_ROUTE)
  }

  const showHelperText = (name) => {
    return errors[name]?.message
  }

  const showError = (name) => {
    return errors[name] !== undefined
  }

  return <>
    <Crumbs crumbs={[{
        title: 'Properties',
        onClick: () => router.push(MANAGEMENT_PORTAL_BASE_ROUTE)
      }, {
        title: 'Create'
      }]}
    />
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box m={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...register('address', { required: 'Address is a required field.' })}
              fullWidth
              required
              margin="normal"
              size="small"
              label="Address"
              helperText={showHelperText('address')}
              error={showError('address')  }
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('city', { required: 'City is a required field.' })}
              fullWidth
              required
              margin="normal"
              size="small"
              label="City"
              helperText={showHelperText('city')}
              error={showError('city')  }
              />
          </Grid>
          <Grid item xs={4}>
            <TextField
              {...register('state', { required: 'State is a required field.' })}
              fullWidth
              required
              margin="normal"
              size="small"
              label="State"
              helperText={showHelperText('state')}
              error={showError('state')  }
              />
          </Grid>
          <Grid item xs={4}>
            <TextField
              {...register('zipcode', {
                required: 'Zipcode is a required field.',
              })}
              fullWidth
              required
              margin="normal"
              size="small"
              label="Zipcode"
              helperText={showHelperText('zipcode')}
              error={showError('zipcode')  }
              />
          </Grid>
          <Grid item xs={4}>
            <TextField
              {...register('country', {
                required: 'Country is a required field.',
              })}
              fullWidth
              required
              margin="normal"
              size="small"
              label="Country"
              helperText={showHelperText('country')}
              error={showError('country')  }
              />
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box m={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...register('rent', {
                required: 'Rent is a required field.',
              })}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: '0.01' }}
              fullWidth
              required
              type="number"
              margin="normal"
              size="small"
              label="Rent ($)"
              helperText={showHelperText('rent')}
              error={showError('rent')  }
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

CreateProperty.getLayout = getLayout

export default CreateProperty
