import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { getLayout } from 'components/layouts/TenantPortalLayout'

const Settings = () => {
  return <>
    <Breadcrumbs aria-label="breadcrumb">
      <Typography color="text.primary">Settings</Typography>
    </Breadcrumbs>
  </>
}

Settings.getLayout = getLayout;

export default Settings
