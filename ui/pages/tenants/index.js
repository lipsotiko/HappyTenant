import { useEffect, useState } from 'react'

import Crumbs from 'components/Crumbs'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import { getLayout } from 'components/layouts/LandlordLayout'
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import axios from 'axios';

const Tenants = () => {
  const router = useRouter();
  const [landlord, setLandlord] = useState()
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

  useEffect(() => {
    const fetchProfile = async () => {
      await axios.get('/api/landlord-user/profile', {
        params: {
          returnPath: '/tenants'
        }
      }).then(({ data }) => {
        setLandlord(data)
      })
    }

    const getTenants = async () => {
      const { data } = await axios.get('/api/tenants/all')
      setTenants(data)
    }

    fetchProfile().then(() => getTenants())
  }, [])

  return <>
    <Crumbs crumbs={[{
        title: 'Tenants'
      }]}
    />
    <Box m={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={() => router.push('/tenants/create')} disabled={!landlord?.paymentAccountStatus?.isOnboarded}>Create</Button>
    </Box>
    { landlord?.paymentAccountStatus?.isOnboarded === false &&
      <Alert severity="warning" sx={{margin: '8px'}}>
        Click <Link className="pointer" href={landlord.paymentAccountStatus?.onboardingUrl}>here</Link> to configure your payout method with Stripe before inviting tenants.
      </Alert>
    }

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
