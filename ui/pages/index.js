import { useEffect, useState } from 'react'

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { getLayout } from 'components/layouts/LandlordLayout'
import { useRouter } from 'next/router';
import { useAuth0 } from "@auth0/auth0-react";
import useAuth from 'hooks/useAuth'
import axios from 'axios';

const Properties = () => {
  const { user } = useAuth0();
  const { tokenized } = useAuth();
  const router = useRouter();
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
      headerName: 'Monthly Rent ($)',
      width: 120
    }
  ]

  const getProperties = async () => {
    const { data: { _embedded: { properties }} } = await axios.get('/api/properties/search/findByCreatedBy', {
      params: {
        email: user.email
      }
    })
    setProperties(properties)
  }

  useEffect(async () => {
    if (!tokenized) return
    getProperties()
  }, [tokenized])

  return <>
    <Breadcrumbs aria-label="breadcrumb">
      <Typography color="text.primary">Properties</Typography>
    </Breadcrumbs>
    <Box m={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={() => router.push('/properties/create')}>Create</Button>
    </Box>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={properties}
        columns={columns}
        disableSelectionOnClick
      />
    </Box>
  </>
}

Properties.getLayout = getLayout;

export default Properties