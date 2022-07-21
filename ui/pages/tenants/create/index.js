import { useState, useEffect, useMemo } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { getLayout } from 'components/layouts/LandlordLayout'
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import useAuth from 'hooks/useAuth'
import moment from 'moment'
import { useAuth0 } from "@auth0/auth0-react";
import { TENANTS_ROUTE } from 'util/constants'

const Create = () => {
  const { user } = useAuth0();
  const { tokenized } = useAuth();
  const router = useRouter();
  const [properties, setProperties] = useState()
  const [landlord, setLandlord] = useState()
  const [saving, setSaving] = useState(false);
  const [moveInDate, setMoveInDate] = useState()
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Tenant information', 'Invoicing details'];

  const { register, handleSubmit, getValues, setValue, clearErrors, trigger, watch, control, formState: { errors } } = useForm({
    defaultValues: {
      propertyId: '',
      createMonthlySubscription: false,
      addLastMonthsRentToInvoice: false,
      addSecurityDepositToInvoice: false
    }
  });

  register('moveInDate', { required: 'Move in date is required', valueAsDate: true })
  const securityDeposit = watch('securityDeposit')
  const createMonthlySubscription = watch('createMonthlySubscription')
  const addLastMonthsRentToInvoice = watch('addLastMonthsRentToInvoice')
  const addSecurityDepositToInvoice = watch('addSecurityDepositToInvoice')

  const handleMoveInDateChange = (e) => {
    if (!e) return
    setMoveInDate(e.toDate())
    setValue('moveInDate', e.toDate())
  }

  const onSubmit = async data => {
    setSaving(true)
    await axios.post('/api/tenants', data)
    router.push(TENANTS_ROUTE)
  }

  const showHelperText = (name) => errors[name]?.message
  const showOptionalHelperText = (name, enabledField, message) => getValues(enabledField) && errors[name] ? message : ''
  const showError = (name) => errors[name] !== undefined

  useEffect(async () => {
    if (!tokenized) return
    const { data: { _embedded: { properties }} } = await axios.get('/api/properties/search/findByCreatedBy', {
      params: {
        email: user.email
      }
    })
    setProperties(properties)
  }, [tokenized])

  useEffect(async () => {
    if (!tokenized) return
    await axios.get('/api/landlord-user/profile', {
      params: {
        returnPath: '/tenants/create'
      }
    }).then(({ data }) => {
      setLandlord(data)
    })
  }, [tokenized])

  const invoiceMemo = useMemo(() => {
    if (!properties) return []
    const { address, rent } = properties.find(p => p.id === getValues('propertyId'))

    let items = []
    let total = 0;

    if (addLastMonthsRentToInvoice) {
      items.push({
        name:  `${address} - Last months rent`,
        calories: rent
      })
      total += rent
    }

    if (addSecurityDepositToInvoice) {
      items.push({
        name:  `${address} - Security deposit`,
        calories: securityDeposit
      })
      const parsedSecurityDeposit = parseFloat(securityDeposit)
      if (!isNaN(parsedSecurityDeposit)) {
        total += parsedSecurityDeposit
      }
    }

    total = (Math.round((total + Number.EPSILON) * 100) / 100).toFixed(2)

    return { items, total };
  }, [addLastMonthsRentToInvoice, addSecurityDepositToInvoice, securityDeposit])

  if (!landlord || !properties) {
    return <></>
  }

  const handleNext = async () => {
    if (activeStep === 0) {
      const valid = await trigger(['propertyId', 'fullName', 'email', 'moveInDate'])
      if (!valid) {
        return
      }
    }

    if (activeStep === 1) {
      const valid = await trigger('securityDeposit')
      if (!valid) {
        return
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return <>
    <Breadcrumbs aria-label="breadcrumb">
      <Link className="pointer" underline="hover" color="inherit" onClick={() => router.push(TENANTS_ROUTE)} >
        Tenants
      </Link>
      <Typography color="text.primary">Create</Typography>
    </Breadcrumbs>
    <Box m={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            { activeStep === 0 &&
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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
                            disabled={properties.length === 0}
                            value={getValues('propertyId')}
                            error={showError('propertyId')  }
                          >
                            { properties.map(p => {
                              return <MenuItem key={p.id} value={p.id}>{ p.address }</MenuItem>
                            })}
                        </Select>
                      </>)}
                    />
                    <FormHelperText error>{showHelperText('propertyId')}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register('email', { required: 'Email is a required field.' })}
                    fullWidth
                    required
                    margin="normal"
                    size="small"
                    label="Email"
                    helperText={showHelperText('email')}
                    error={showError('email')}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                      label="Move in date"
                      value={moveInDate}
                      shouldDisableDate={(date) => !date.isAfter(moment())}
                      renderInput={(params) =>
                        <TextField
                          fullWidth
                          required
                          margin="normal"
                          size="small"
                          {...params}
                          helperText={showHelperText('moveInDate')}
                          error={showError('moveInDate')}
                          />}
                      onChange={handleMoveInDateChange}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            }
            { activeStep === 1 &&
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox checked={createMonthlySubscription} {...register('createMonthlySubscription')} />} label="Automatically generate monthly invoices to collect rent" />
                    <FormControlLabel control={<Checkbox checked={addLastMonthsRentToInvoice} {...register('addLastMonthsRentToInvoice')} />} label="Add last months rent to initial invoice" />
                    <FormControlLabel control={<Checkbox checked={addSecurityDepositToInvoice} {...register('addSecurityDepositToInvoice', { onChange: ({target: { checked }})=> {
                      if (!checked) { clearErrors('securityDeposit') }
                      } } ) } />} label="Add security deposit to initial invoice" />
                    <TextField
                      {...register('securityDeposit', {
                        validate: (e) => {
                          if (getValues('addSecurityDepositToInvoice') && (e === '' || e <= 0 )) {
                            return false
                          }
                          return true
                        }
                      })}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: '0.01' }}
                      fullWidth
                      type="number"
                      margin="normal"
                      size="small"
                      label="Security Deposit ($)"
                      helperText={showOptionalHelperText('securityDeposit', 'addSecurityDepositToInvoice', 'Security deposit is a required field')}
                      error={showError('securityDeposit')  }
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  { (addLastMonthsRentToInvoice || addSecurityDepositToInvoice) &&
                  <Box>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Items</TableCell>
                            <TableCell align="right">Amount ($)</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {invoiceMemo.items.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">{row.name}</TableCell>
                              <TableCell align="right">{row.calories}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
                      <Typography variant="h6">Total: ${invoiceMemo.total}</Typography>
                    </Box>
                  </Box>
                  }
                </Grid>
              </Grid>
            }
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep < steps.length - 1 &&
                <Button onClick={handleNext}>
                  Next
                </Button>
              }
              {activeStep === steps.length - 1 &&
                <LoadingButton variant="contained" type="submit" loading={saving}>Finish</LoadingButton>
              }
            </Box>
          </>
      </form>
    </Box>
    { landlord?.paymentAccountStatus?.isOnboarded === false &&
      <Alert severity="warning">
        Click <Link className="pointer" href={landlord.paymentAccountStatus?.onboardingUrl}>here</Link> to configure your payout method with Stripe before inviting tenants.
      </Alert>
    }
    { properties.length === 0 &&
      <Alert severity="warning">
        Click <Link className="pointer" href="/properties/create">here</Link> to add a property before inviting tenants.
      </Alert>
    }
  </>
}

Create.getLayout = getLayout

export default Create
