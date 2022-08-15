import { useEffect, useState } from 'react'
import Crumbs from 'components/Crumbs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getLayout } from 'components/layouts/TenantPortalLayout'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import axios from 'axios';

const TenantPortal = () => {
  const [tenant, setTenant] = useState()
  const [properties, setProperties] = useState([])
  const router = useRouter();

  const getProperties = async () => {
    const { data: { tenant, properties } } = await axios.get('/api/properties/tenant/all')
    setTenant(tenant)
    setProperties(properties)
  }

  useEffect(async () => {
    getProperties()
  }, [])

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: '100px'
  }));

  const handleSelect = () => {
    router.push(`/tenant-portal/invoices`)
  }

  return <>
    <Crumbs crumbs={[{
        title: 'Home'
      }]}
    />
    <Box sx={{ margin: '32px' }}>
      <Grid container spacing={2}>
        { properties.map(p => {
          return <Grid item xs={8} sm={6} md={4} lg={3}>
            <Item key={`property_${p.id}`} className='pointer' onClick={() => handleSelect()}>
              <Typography>{ p.address }</Typography>
              <Typography variant="caption">${ p.rent } / Month</Typography>
            </Item>
          </Grid>
        }) }
      </Grid>
    </Box>
  </>
}

TenantPortal.getLayout = getLayout

export default TenantPortal
