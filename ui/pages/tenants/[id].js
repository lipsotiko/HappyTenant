import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getLayout } from 'components/layouts/LandlordLayout'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import useAuth from 'hooks/useAuth'
import axios from 'axios';
import { TENANTS_ROUTE } from 'util/constants'
import moment from 'moment'

const Tenant = () => {
  const { tokenized } = useAuth();
  const router = useRouter()
  const { id } = router.query
  const [tenant, setTenant] = useState()
  const [invoices, setInvoices] = useState([])

  const columns = [
    {
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
    },
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
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => {
        switch(params.row.status) {
          case 'draft':
            return 'Pending'
          case 'open':
            return 'Open'
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
      renderCell: (params) => params.row.total / 100
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
    if (!tokenized) return
    getInvoices()
    getTenant()
  }, [tokenized])

  return <>
   <Breadcrumbs aria-label="breadcrumb">
      <Typography color="text.primary" class="pointer" onClick={() => router.push(TENANTS_ROUTE)}>Tenants</Typography>
      <Typography color="text.primary">
        { tenant?.fullName }
      </Typography>
    </Breadcrumbs>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={invoices}
        columns={columns}
        disableSelectionOnClick
      />
      { JSON.stringify(tenant) }
    </Box>
  </>
}

Tenant.getLayout = getLayout

export default Tenant
