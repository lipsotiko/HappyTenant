import { useState, useEffect } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth'
import { useAuth0 } from "@auth0/auth0-react";
import { TENANTS_ROUTE } from '../../../util/constants'

const Create = () => {
  const { user } = useAuth0();
  const { tokenized } = useAuth();
  const router = useRouter();
  const [properties, setProperties] = useState([])
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, getValues, control, formState: { errors } } = useForm({
    defaultValues: {
      propertyId: ''
    }
  });

  const onSubmit = async data => {
    setSaving(true)
    await axios.post('/api/tenants', data)
    router.push(TENANTS_ROUTE)
  }

  const showHelperText = (name) => {
    return errors[name]?.message
  }

  const showError = (name) => {
    return errors[name] !== undefined
  }

  useEffect(async () => {
    if (!tokenized) return
    const { data: { _embedded: { properties }} } = await axios.get('/api/properties/search/findByCreatedBy', {
      params: {
        email: user.email
      }
    })
    setProperties(properties)
  }, [tokenized])

  return <>
    <Breadcrumbs aria-label="breadcrumb">
      <Link className="breadcrumbLink" underline="hover" color="inherit" onClick={() => router.push(TENANTS_ROUTE)} >
        Tenants
      </Link>
      <Typography color="text.primary">Create</Typography>
    </Breadcrumbs>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box m={2}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
          <FormControl fullWidth required margin="normal" size="small">
            <InputLabel htmlFor="property-select">Property</InputLabel>
            <Controller
              control={control}
              name="propertyId"
              render={() => (
                <>
                  <Select
                      {...register('propertyId', { required: 'Property is a required field.' })}
                      id="property-select"
                      label="Property"
                      value={getValues('propertyId')}
                      error={showError('propertyId')  }
                    >
                      { properties.map(p => {
                        return <MenuItem key={p.id} value={p.id}>{ p.address }</MenuItem>
                      })}
                  </Select>
                </>)}
              />
              <FormHelperText>{showHelperText('propertyId')}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              {...register('fullName', { required: 'Full name is a required field.' })}
              fullWidth
              required
              margin="normal"
              size="small"
              label="Full Name"
              helperText={showHelperText('fullName')}
              error={showError('fullName')  }
              />
          </Grid>
          <Grid item xs={4}>
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
          </Grid>
        </Grid>
      </Box>
      <Box m={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LoadingButton variant="contained" type="submit" loading={saving}>Save</LoadingButton>
      </Box>
    </form>
  </>
}

export default Create
