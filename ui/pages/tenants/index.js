import { useEffect, useState } from 'react'

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { getLayout } from 'components/layouts/LandlordLayout'
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import useAuth from 'hooks/useAuth'
import axios from 'axios';

const Tenants = () => {
  const { tokenized } = useAuth();
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
    }, {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => <>
        <Link id={`invite${params.row.id}`} className='pointer' onClick={() => handleInvite(params.row.id)}>Resend invite</Link>
      </>
    }
  ]

  const getTenants = async () => {
    const { data } = await axios.get('/api/tenants/all')
    setTenants(data)
  }

  useEffect(async () => {
    if (!tokenized) return
    getTenants()
  }, [tokenized])


  const handleInvite = (tenantId) => {
    axios.post(`/api/tenants/resend-invitation/${tenantId}`)
  }

  return <>
    <Breadcrumbs aria-label="breadcrumb">
      <Typography color="text.primary">Tenants</Typography>
    </Breadcrumbs>
    <Box m={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={() => router.push('/tenants/create')}>Create</Button>
    </Box>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tenants}
        columns={columns}
      />
    </Box>
  </>
}

Tenants.getLayout = getLayout

export default Tenants
