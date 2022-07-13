import { useEffect, useState } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getLayout } from 'components/layouts/TenantPortalLayout'
import useAuth from 'hooks/useAuth'
import axios from 'axios';

const TenantPortal = () => {
  const { tokenized } = useAuth();
  const [properties, setProperties] = useState([])

  const columns = [
    {
      field: 'address',
      headerName: 'Address',
      width: 188
    }, {
      field: 'city',
      headerName: 'City',
      width: 148
    }, {
      field: 'state',
      headerName: 'State',
      width: 100
    }, {
      field: 'country',
      headerName: 'Country',
      width: 148
    }, {
      field: 'rent',
      headerName: 'Rent ($)',
      width: 100
    }, {
      field: 'deposit',
      headerName: 'Deposit ($)',
      width: 100
    }
  ]

  const getProperties = async () => {
    const { data } = await axios.get('/api/properties/tenant/all')
    setProperties(data)
  }

  useEffect(async () => {
    if (!tokenized) return
    getProperties()
  }, [tokenized])

  return <>
    <Breadcrumbs aria-label="breadcrumb">
      <Typography color="text.primary">Properties</Typography>
    </Breadcrumbs>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={properties}
        columns={columns}
        disableSelectionOnClick
      />
    </Box>
  </>
  }

TenantPortal.getLayout = getLayout

export default TenantPortal
