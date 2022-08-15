import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getLayout } from 'components/layouts/TenantPortalLayout'
import Crumbs from 'components/Crumbs';
import Invoices from 'components/Invoices'
import { TENANT_PORTAL_BASE_ROUTE } from 'util/constants'
import Box from '@mui/material/Box';
import axios from 'axios';

const InvoicesPage = () => {
  const router = useRouter()
  const [invoices, setInvoices] = useState()

  useEffect(() => {
    const fetchInvoices = async () => {
      const { data } = await axios.get(`/api/tenants/current-user-invoices`)
      setInvoices(data)
    }
    fetchInvoices()
  }, [])

  if (!invoices) {
    return <></>
  }

  return <>
    <Crumbs crumbs={[
        {
          title: 'Home',
          onClick: () => router.push(TENANT_PORTAL_BASE_ROUTE)
        }, {
          title: 'Invoices'
        }
      ]}
    />
    <Box sx={{ height: 400, width: '100%' }}>
      <Invoices invoices={invoices} />
    </Box>
  </>
}

InvoicesPage.getLayout = getLayout

export default InvoicesPage
