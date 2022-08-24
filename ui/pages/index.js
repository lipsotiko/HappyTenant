import { useEffect, useState } from 'react'

import Crumbs from 'components/Crumbs'
import LoadingOverlay from 'components/LoadingOverlay'
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { getLayout } from 'components/layouts/LandlordLayout'
import { useRouter } from 'next/router';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const Properties = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth0();
  const router = useRouter();
  const [properties, setProperties] = useState([])

  const columns = [
    {
      field: 'address',
      headerName: 'Address',
      width: 188,
      renderCell: (params) => {
        return <>
          <Link id={`property_${params.row.id}`} className='pointer' onClick={() => router.push(`/properties/${params.row.id}`)}>{params.row.address}</Link>
        </>
      }
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

  useEffect(() => {
    const getProperties = async () => {
      const { data: { _embedded: { properties }} } = await axios.get('/api/properties/search/findByCreatedBy', {
        params: {
          email: user.email
        }
      })
      setProperties(properties)
      setIsLoading(false)
    }
    getProperties()
  }, [user])

  if (isLoading) {
    return <LoadingOverlay />
  }

  return <>
    <Crumbs crumbs={[{
        title: 'Properties'
      }]}
    />
    <Box m={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={() => router.push('/properties/create')}>Create</Button>
    </Box>
    <Box sx={{ height: 400 }}>
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
