import { useEffect, useState } from 'react'

import Crumbs from 'components/Crumbs'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { getLayout } from 'components/layouts/LandlordLayout'
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import axios from 'axios';

const Tenants = () => {
  const router = useRouter();
  const [tenants, setTenants] = useState([])

  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 158,
      renderCell: (params) => <>
       <Link id={`invite${params.row.id}`} className='pointer' onClick={() => router.push(`/tenants/${params.row.id}`)}>{params.row.fullName}</Link>
      </>
    }, {
      field: 'email',
      headerName: 'Email',
      width: 244
    }, {
      field: 'property',
      headerName: 'Property',
      width: 138,
      valueGetter: (params) => {
        return params.row?.property?.address
      }
    }
  ]

  const getTenants = async () => {
    const { data } = await axios.get('/api/tenants/all')
    setTenants(data)
  }

  useEffect(() => {
    getTenants()
  }, [])

  return <>
    <Crumbs crumbs={[{
        title: 'Tenants'
      }]}
    />
    <Box m={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={() => router.push('/tenants/create')}>Create</Button>
    </Box>
    <Box sx={{ height: 400 }}>
      <DataGrid
        rows={tenants}
        columns={columns}
      />
    </Box>
  </>
}

Tenants.getLayout = getLayout

export default Tenants
