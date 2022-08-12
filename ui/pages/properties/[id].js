import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Crumbs from 'components/Crumbs'
import Typography from '@mui/material/Typography';
import { getLayout } from 'components/layouts/LandlordLayout'
import Grid from '@mui/material/Grid';
import { rnd } from 'util/utils'
import axios from 'axios';

const Property = () => {
  const router = useRouter()
  const { id } = router.query
  const [property, setProperty] = useState()

  const getProperty = async () => {
    const { data } = await axios.get(`/api/properties/${id}`)
    setProperty(data)
  }

  useEffect(async () => {
    getProperty()
  }, [])

  if (!property) return <></>

  return <>
    <Crumbs crumbs={[
        {
          title: 'Properties',
          onClick: () => router.push("/")
        }, {
          title: property?.address
        }
      ]}
    />
    <Grid container spacing={1} padding={1} marginBottom={1}>
      <Grid item xs={1}><Typography variant="subtitle2">Address:</Typography></Grid>
      <Grid item xs={11}>{property?.address}</Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={11}>{property?.city}, {property?.state} {property?.zipcode}</Grid>
      <Grid item xs={1}><Typography variant="subtitle2">Rent:</Typography></Grid>
      <Grid item xs={11}>${rnd(property?.rent)}</Grid>
    </Grid>
  </>
}

Property.getLayout = getLayout

export default Property
