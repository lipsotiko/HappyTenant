import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Crumbs = ({ crumbs = [] }) => {
  return <Breadcrumbs aria-label="breadcrumb">
    { crumbs.map(({ title, onClick }, i) => {
      return (onClick)
        ? <Link  underline="hover" className="pointer" color="inherit" onClick={onClick}>{title}</Link>
        : <Typography color="text.primary">{title}</Typography>
    })}
  </Breadcrumbs>
}

export default Crumbs
