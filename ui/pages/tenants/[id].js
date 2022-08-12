import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getLayout } from 'components/layouts/LandlordLayout'
import Crumbs from 'components/Crumbs'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { TENANTS_ROUTE } from 'util/constants'
import { rnd } from 'util/utils'
import moment from 'moment'

const Tenant = () => {
  const router = useRouter()
  const { id } = router.query
  const [tenant, setTenant] = useState()
  const [invoices, setInvoices] = useState([])

  const columns = [
    {
      field: 'number',
      headerName: 'Invoice #',
      width: 138,
      renderCell: (params) => {
        switch(params.row.status) {
          case 'draft':
            return '-'
          default:
            return params.row.number
        }
      }
    }, {
      field: 'description',
      headerName: 'Description',
      width: 288,
      renderCell: (params) => {
        if (params.row.subscription) {
          return params.row.lines.data[0].description
        } else {
          return params.row.description
        }
      }
    }, {
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => {
        switch(params.row.status) {
          case 'draft':
            return 'Pending'
          case 'open':
            return 'Open'
          case 'paid':
            return 'Paid'
          case 'void':
            return 'Void'
          default:
            return '-'
        }
      }
    }, {
      field: 'created',
      headerName: 'Created',
      width: 110,
      renderCell: (params) => moment.unix(params.row.created).format('MM/DD/YYYY')
    }, {
      field: 'dueDate',
      headerName: 'Due',
      width: 110,
      renderCell: (params) => moment.unix(params.row.dueDate).format('MM/DD/YYYY')
    }, {
      field: 'total',
      headerName: 'Total',
      renderCell: (params) => rnd(params.row.total)
    }, {
      field: 'invoicePdf',
      headerName: 'PDF',
      renderCell: (params) => {
        switch(params.row.status) {
          case 'draft':
            return '-'
          default:
            return <>
              <Link id={`invoice_url_${params.row.id}`} className='pointer' onClick={() => router.push(params.row.invoicePdf)}>PDF</Link>
            </>
        }
      }
    }, {
      field: 'hostedInvoiceUrl',
      headerName: 'URL',
      renderCell: (params) => {
        switch(params.row.status) {
          case 'draft':
            return '-'
          default:
            return <>
              <Link id={`invoice_url_${params.row.id}`} className='pointer' onClick={() => router.push(params.row.hostedInvoiceUrl)}>URL</Link>
            </>
        }
      }
    }
  ]

  const getInvoices = async () => {
    const { data } = await axios.get(`/api/tenants/${id}/invoices`)
    setInvoices(data)
  }

  const getTenant = async () => {
    const { data } = await axios.get(`/api/tenants/${id}`)
    setTenant(data)
  }

  useEffect(async () => {
    getInvoices()
    getTenant()
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
      <DataGrid
        rows={invoices}
        columns={columns}
        disableSelectionOnClick
      />
    </Box>
  </>
}

Tenant.getLayout = getLayout

export default Tenant
