import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { getLayout } from 'components/layouts/LandlordLayout'
import useAuth from 'hooks/useAuth'
import axios from 'axios';

const Admin = () => {
  const { tokenized } = useAuth();
  const [landlords, setLandlords] = useState([])
  const [tenants, setTenants] = useState([])

  const landLordColumns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 222
    }, {
      field: 'fullName',
      headerName: 'Full Name',
      width: 158
    }, {
      field: 'organization',
      headerName: 'Organization',
      width: 158
    }, {
      field: 'createdBy',
      headerName: 'Email',
      width: 244
    }, {
      field: 'createdDate',
      headerName: 'Created',
      width: 188
    }, {
      field: 'actions',
      headerName: 'Actions',
      width: 158,
      renderCell: (params) => <>
        <Link id={`delete_${params.row.id}`} className='pointer' onClick={() => handleDelete(params.row.id)}>Delete</Link>
      </>
    }
  ]

  const tenantsColumns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 222
    }, {
      field: 'fullName',
      headerName: 'Full Name',
      width: 158
    }, {
      field: 'createdBy',
      headerName: 'Email',
      width: 244
    }, {
      field: 'createdDate',
      headerName: 'Created',
      width: 188
    }, {
      field: 'actions',
      headerName: 'Actions',
      width: 158,
      renderCell: (params) => <>
        <Link id={`delete_${params.row.id}`} className='pointer' onClick={() => handleDelete(params.row.id)}>Delete</Link>
      </>
    }
  ]

  const getLandlords = async () => {
    const { data: { _embedded: { landlordUsers }} } = await axios.get('/api/landlordUsers')
    setLandlords(landlordUsers)
  }

  const getTenants = async () => {
    const { data: { _embedded: { tenantUsers }} } = await axios.get('/api/tenantUsers')
    setTenants(tenantUsers)
  }

  useEffect(async () => {
    if (!tokenized) return
    getLandlords()
    getTenants()
  }, [tokenized])

  const handleDelete = async (landlordId) => {
    await axios.delete(`/api/landlordUsers/${landlordId}`)
    getLandlords()
  }

  return <>
    <p>Landlords</p>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={landlords}
        columns={landLordColumns}
        disableSelectionOnClick
      />
    </Box>
    <p>Tenants</p>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tenants}
        columns={tenantsColumns}
        disableSelectionOnClick
      />
    </Box>
  </>
}

Admin.getLayout = getLayout;

export default Admin
