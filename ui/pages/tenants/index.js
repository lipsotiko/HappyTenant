import { useEffect, useState } from 'react'

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import { getLayout } from 'components/layouts/LandlordLayout'
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { useAuth0 } from "@auth0/auth0-react";
import useAuth from 'hooks/useAuth'
import axios from 'axios';

const Tenants = () => {
  const { user } = useAuth0();
  const { tokenized } = useAuth();
  const router = useRouter();
  const [tenants, setTenants] = useState([])
  const [selectedTenantIds, setSelectedTenantIds] = useState([])

  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 158
    }, {
      field: 'email',
      headerName: 'Email',
      width: 200
    }, {
      field: 'property',
      headerName: 'Property',
      width: 138,
      valueGetter: (params) => {
        return params.row.property.address
      }
    }, {
      field: 'actions',
      headerName: 'Actions',
      width: 158,
      renderCell: (params) => <>
        <Link id={`invite${params.row.id}`} className='pointer' onClick={() => handleInvite(params.row.id)}>Invite</Link>
      </>
    }
  ]

  const getTenants = async () => {
    const { data } = await axios.get('/api/tenants/all', {
      params: {
        email: user.email
      }
    })
    setTenants(data)
  }

  useEffect(async () => {
    if (!tokenized) return
    getTenants()
  }, [tokenized])

  const handleDelete = async () => {
    console.log(selectedTenantIds)
    await Promise.all(
      selectedTenantIds.map((tenantId) => axios.delete(`/api/tenants/${tenantId}`)))
    getTenants()
  }

  const handleInvite = (tenantId) => {
    console.log('Invite tenant: ', tenantId)
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
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={setSelectedTenantIds}
      />
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '12px'}}>
      <Button variant="outlined" color="error" startIcon={<DeleteIcon />} disabled={selectedTenantIds.length === 0} onClick={handleDelete}>
        Delete
      </Button>
    </Box>
  </>
}

Tenants.getLayout = getLayout

export default Tenants
