import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getLayout } from 'components/layouts/TenantPortalLayout'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { TENANT_PORTAL_BASE_ROUTE } from 'util/constants'
import useAuth from 'hooks/useAuth'
import axios from 'axios';

const Property = () => {
  const { tokenized } = useAuth();
  const router = useRouter()
  const { id } = router.query
  const [property, setProperty] = useState()

  useEffect(async () => {
    if (!tokenized) return
    const { data } = await axios.get(`/api/properties/${id}`)
    setProperty(data)
  }, [tokenized])

  if (!property) {
    return <></>
  }

  return <>
    <Breadcrumbs aria-label="breadcrumb">
      <Link className="pointer" underline="hover" color="inherit" onClick={() => router.push(TENANT_PORTAL_BASE_ROUTE)} >
        Home
      </Link>
      <Typography color="text.primary">
        { property.address }
      </Typography>
    </Breadcrumbs>
    <span>Add payment method</span>
  </>
}

Property.getLayout = getLayout

export default Property
