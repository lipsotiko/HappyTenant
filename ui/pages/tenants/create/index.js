import { useState, useEffect, useMemo } from 'react'
import Crumbs from 'components/Crumbs';
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
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
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
import moment from 'moment'
import { useAuth0 } from "@auth0/auth0-react";
import { TENANTS_ROUTE } from 'util/constants'

const Create = () => {
  const { user } = useAuth0();
  const router = useRouter();
  const [properties, setProperties] = useState([])
  const [landlord, setLandlord] = useState()
  const [saving, setSaving] = useState(false);
  const [moveInDate, setMoveInDate] = useState(null)
  const [billingStartDate, setBillingStartDate] = useState(null)
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Tenant information', 'Invoice details', 'Review'];

  const { register, handleSubmit, getValues, setValue, clearErrors, trigger, watch, control, formState: { errors } } = useForm({
    defaultValues: {
      propertyId: '',
      createMonthlySubscription: false,
      addProratedFirstMonthsRent: false,
      addLastMonthsRentToInvoice: false,
      addSecurityDepositToInvoice: false
    }
  });

  register('moveInDate', { required: 'Move in date is required', valueAsDate: true })
  register('billingStartDate', { required: 'Billing start date is required', valueAsDate: true })

  const securityDeposit = watch('securityDeposit')
  const createMonthlySubscription = watch('createMonthlySubscription')
  const addProratedFirstMonthsRent = watch('addProratedFirstMonthsRent')
  const addLastMonthsRentToInvoice = watch('addLastMonthsRentToInvoice')
  const addSecurityDepositToInvoice = watch('addSecurityDepositToInvoice')

  const handleMoveInDateChange = (e) => {
    if (!e) return
    setMoveInDate(e.toDate())
    setValue('moveInDate', e.toDate())
  }

  const handleBillingStartDateChange = (e) => {
    if (!e) return
    setBillingStartDate(e.toDate())
    setValue('billingStartDate', e.toDate())
  }

  const onSubmit = async data => {
    setSaving(true)
    await axios.post('/api/tenants', data).catch(() => {
      setSaving(false)
      return
    })
    router.push(TENANTS_ROUTE)
  }

  const showHelperText = (name) => errors[name]?.message
  const showError = (name) => errors[name] !== undefined

  useEffect(() => {
    const fetchProperties = async () => {
      const { data: { _embedded: { properties }} } = await axios.get('/api/properties/search/findByCreatedBy', {
        params: {
          email: user.email
        }
      })
      setProperties(properties)
    }
    fetchProperties()
  }, [user])

  useEffect(() => {
    const fetchProfile = async () => {
      await axios.get('/api/landlord-user/profile', {
        params: {
          returnPath: '/tenants/create'
        }
      }).then(({ data }) => {
        setLandlord(data)
      })
    }
    fetchProfile()
  }, [])

  const invoiceMemo = useMemo(() => {
    if (!properties) return []
    const propertyId = getValues('propertyId')

    if (propertyId === '') return []
    const { address, rent } = properties.find(p => p.id === propertyId)

    let items = []
    let total = 0;

    if (addSecurityDepositToInvoice) {
      items.push({
        name:  `${address} - Security deposit`,
        calories:  parseFloat(securityDeposit).toFixed(2)
      })
      const parsedSecurityDeposit = parseFloat(securityDeposit)
      if (!isNaN(parsedSecurityDeposit)) {
        total += parsedSecurityDeposit
      }
    }

    if (addProratedFirstMonthsRent) {
      const moveInDateMoment = moment(moveInDate);
      const billingStartDateMoment = moment(billingStartDate);
      const proratedDays = billingStartDateMoment.diff(moveInDateMoment, 'days')
      const proratedRent = ((rent * 12) / 365) * proratedDays
      items.push({
        name:  `${address} - Prorated first month's rent`,
        calories: proratedRent.toFixed(2)
      })
      total += proratedRent
    }

    if (addLastMonthsRentToInvoice) {
      items.push({
        name:  `${address} - Last month's rent`,
        calories: parseFloat(rent).toFixed(2)
      })
      total += rent
    }

    total = (Math.round((total + Number.EPSILON) * 100) / 100).toFixed(2)

    return { items, total };
  }, [addProratedFirstMonthsRent, addLastMonthsRentToInvoice, addSecurityDepositToInvoice, securityDeposit, billingStartDate, getValues, moveInDate, properties])

  if (!landlord || !properties) {
    return <></>
  }

  const handleNext = async () => {
    if (activeStep === 0) {
      const valid = await trigger(['propertyId', 'fullName', 'email', 'moveInDate', 'billingStartDate', 'securityDeposit'])
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
    <Crumbs crumbs={[{
        title: 'Tenants',
        onClick: () => router.push(TENANTS_ROUTE)
      }, {
        title: 'Create'
      }]}
    />
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
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth required margin="normal" size="small" error={showError('propertyId')}>
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
                <Grid item xs={12} sm={4}>
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
                <Grid item xs={12} sm={4}>
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
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                      label="Move in date"
                      value={moveInDate}
                      minDate={moment().add(1, 'days')}
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
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                      label="Billing start date"
                      value={billingStartDate}
                      minDate={moment().add(1, 'days')}
                      renderInput={(params) =>
                        <TextField
                          fullWidth
                          required
                          margin="normal"
                          size="small"
                          {...params}
                          helperText={showHelperText('billingStartDate')}
                          error={showError('billingStartDate')}
                        />}
                      onChange={handleBillingStartDateChange}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    {...register('securityDeposit', {
                      required: 'Security deposit is a required field',
                      validate: (e) => {
                        if (e === '' || e <= 0 ) {
                          return false
                        }
                        return true
                      }
                    })}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: '0.01' }}
                    fullWidth
                    required
                    type="number"
                    margin="normal"
                    size="small"
                    label="Security Deposit ($)"
                    helperText={showHelperText('securityDeposit')}
                    error={showError('securityDeposit')  }
                  />
                </Grid>
              </Grid>
            }
            { activeStep === 1 &&
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox checked={createMonthlySubscription} {...register('createMonthlySubscription')} />} label="Generate monthly invoices to collect rent" />
                    <FormControlLabel control={<Checkbox checked={addProratedFirstMonthsRent} {...register('addProratedFirstMonthsRent')} />} label="Add first month's prorated rent to initial invoice" />
                    <FormControlLabel control={<Checkbox checked={addLastMonthsRentToInvoice} {...register('addLastMonthsRentToInvoice')} />} label="Add last month's rent to initial invoice" />
                    <FormControlLabel control={<Checkbox checked={addSecurityDepositToInvoice} {...register('addSecurityDepositToInvoice', { onChange: ({target: { checked }})=> {
                      if (!checked) { clearErrors('securityDeposit') }
                      } } ) } />} label="Add security deposit to initial invoice" />
                  </FormGroup>
                </Grid>
              </Grid>
            }
            { activeStep === 2 &&
              <>
                <Box justifyContent="center" width={650} margin="0 auto" padding={2}>
                  <Typography variant="h6">Tenant information</Typography>
                  <Grid container spacing={1} padding={1} marginBottom={1}>
                    <Grid item xs={8}><Typography variant="subtitle2">Full name:</Typography></Grid>
                    <Grid item xs={4}>{getValues('fullName')}</Grid>
                    <Grid item xs={8}><Typography variant="subtitle2">Email:</Typography></Grid>
                    <Grid item xs={4}>{getValues('email')}</Grid>
                    <Grid item xs={8}><Typography variant="subtitle2">Move in date:</Typography></Grid>
                    <Grid item xs={4}>{moveInDate.toLocaleDateString()}</Grid>
                    <Grid item xs={8}><Typography variant="subtitle2">Billing start date:</Typography></Grid>
                    <Grid item xs={4}>{billingStartDate.toLocaleDateString()}</Grid>
                  </Grid>
                  <Divider />
                  <Typography variant="h6" marginTop={1}>Invoice details</Typography>
                  <Grid container spacing={1} padding={1} marginBottom={1}>
                    <Grid item xs={8}><Typography variant="subtitle2">Generate monthly invoices to collect rent?</Typography></Grid>
                    <Grid item xs={4}>{getValues('createMonthlySubscription') ? 'Yes' : 'No'}</Grid>
                    <Grid item xs={8}><Typography variant="subtitle2">Add first months prorated rent to initial invoice?</Typography></Grid>
                    <Grid item xs={4}>{getValues('addProratedFirstMonthsRent') ? 'Yes' : 'No'}</Grid>
                    <Grid item xs={8}><Typography variant="subtitle2">Add last months rent to initial invoice?</Typography></Grid>
                    <Grid item xs={4}>{getValues('addLastMonthsRentToInvoice') ? 'Yes' : 'No'}</Grid>
                    <Grid item xs={8}><Typography variant="subtitle2">Add security deposit to initial invoice?</Typography></Grid>
                    <Grid item xs={4}>{getValues('addSecurityDepositToInvoice') ? 'Yes' : 'No'}</Grid>
                  </Grid>
                  <Divider/>
                  <Typography variant="h6" marginTop={1}>Deposit</Typography>
                  { (addLastMonthsRentToInvoice || addSecurityDepositToInvoice) &&
                      <Box margin={2}>
                        <TableContainer component={Paper}>
                          <Table size="small">
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
                </Box>
              </>
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
                <Button onClick={handleNext} disabled={!landlord?.paymentAccountStatus?.isOnboarded}>
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
