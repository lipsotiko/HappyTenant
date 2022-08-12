import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getLayout } from 'components/layouts/TenantPortalLayout'
import Crumbs from 'components/Crumbs';
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
    <Crumbs crumbs={[
        {
          title: 'Home',
          onClick: () => router.push(TENANT_PORTAL_BASE_ROUTE)
        }, {
          title: property.address
        }
      ]}
    />
    <span>Add payment method</span>
  </>
}

Property.getLayout = getLayout

export default Property
