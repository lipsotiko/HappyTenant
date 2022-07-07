import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import useAuth from '../../hooks/useAuth'
import axios from 'axios';
import styles from './admin.module.css'

const Admin = () => {
  const { tokenized } = useAuth();
  const [landlords, setLandlords] = useState([])

  const handleDelete = async (landlordId) => {
    await axios.delete(`/api/landlords/${landlordId}`)
  }

  const columns = [
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
      field: 'actions',
      headerName: 'Actions',
      width: 158,
      renderCell: (params) => <>
        <Link id={`delete_${params.row.id}`} className={styles.action} onClick={() => handleDelete(params.row.id)}>Delete</Link>
      </>
    }
  ]

  useEffect(async () => {
    if (!tokenized) return
    const { data: { _embedded: { landlords }} } = await axios.get('/api/landlords')
    setLandlords(landlords)
  }, [tokenized])

  return <>
    <p>Landlords</p>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={landlords}
        columns={columns}
        disableSelectionOnClick
      />
    </Box>
  </>
}

export default Admin
