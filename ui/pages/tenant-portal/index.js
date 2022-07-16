import { useEffect, useState } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getLayout } from 'components/layouts/TenantPortalLayout'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import useAuth from 'hooks/useAuth'
import { useRouter } from 'next/router';
import axios from 'axios';

const TenantPortal = () => {
  const { tokenized } = useAuth();
  const [properties, setProperties] = useState([])
  const router = useRouter();

  const getProperties = async () => {
    const { data } = await axios.get('/api/properties/tenant/all')
    setProperties(data)
  }

  useEffect(async () => {
    if (!tokenized) return
    getProperties()
  }, [tokenized])

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: '100px'
  }));

  const handlePropertySelect = (propertyId) => {
    router.push(`/tenant-portal/properties/${propertyId}`)
  }

  return <>
    <Breadcrumbs aria-label="breadcrumb">
      <Typography color="text.primary">Home</Typography>
    </Breadcrumbs>
    <Box sx={{ margin: '32px' }}>
      <Grid container spacing={2}>
        { properties.map(p => {
          return <Grid item xs={8} sm={6} md={4} lg={3}>
            <Item key={`property_${p.id}`} className='pointer'onClick={() => handlePropertySelect(p.id)}>
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
