import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getLayout } from 'components/layouts/LandlordLayout'
import Crumbs from 'components/Crumbs'
import Invoices from 'components/Invoices'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { TENANTS_ROUTE } from 'util/constants'

const Tenant = () => {
  const router = useRouter()
  const { id } = router.query
  const [tenant, setTenant] = useState()
  const [invoices, setInvoices] = useState([])

  const getTenant = async () => {
    const { data } = await axios.get(`/api/tenants/${id}`)
    setTenant(data)
  }

  const getInvoices = async () => {
    const { data } = await axios.get(`/api/tenants/${id}/invoices`)
    setInvoices(data)
  }

  useEffect(async () => {
    getTenant()
    getInvoices()
  }, [])

  return <>
    <Crumbs crumbs={[{
        title: 'Tenants',
        onClick: () => router.push(TENANTS_ROUTE)
      }, {
        title: tenant?.fullName
      }]}
    />
    <Grid container spacing={1} padding={1} marginBottom={1}>
      <Grid item xs={1}><Typography variant="subtitle2">Email:</Typography></Grid>
      <Grid item xs={11}>{tenant?.email}</Grid>
      <Grid item xs={1}><Typography variant="subtitle2">Move in date:</Typography></Grid>
      <Grid item xs={11}>{tenant?.moveInDate}</Grid>
      <Grid item xs={1}><Typography variant="subtitle2">Billing start date:</Typography></Grid>
      <Grid item xs={11}>{tenant?.billingStartDate}</Grid>
    </Grid>
    <Box sx={{ height: 400, width: '100%' }}>
      <Invoices invoices={invoices} />
    </Box>
  </>
}

Tenant.getLayout = getLayout

export default Tenant
