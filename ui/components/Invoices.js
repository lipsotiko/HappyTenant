import { rnd } from 'util/utils'
import Link from '@mui/material/Link';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'

const Invoices = ({ invoices }) => {

  const columns = [
    {
      field: 'number',
      headerName: 'Invoice #',
      width: 138,
      renderCell: (params) => {
        switch(params.row.status) {
          case 'draft':
            return '-'
          default:
            return params.row.number
        }
      }
    }, {
      field: 'description',
      headerName: 'Description',
      width: 288,
      renderCell: (params) => {
        if (params.row.subscription) {
          return params.row.lines.data[0].description
        } else {
          return params.row.description
        }
      }
    }, {
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => {
        switch(params.row.status) {
          case 'draft':
            return 'Pending'
          case 'open':
            return 'Open'
          case 'paid':
            return 'Paid'
          case 'void':
            return 'Void'
          default:
            return '-'
        }
      }
    }, {
      field: 'created',
      headerName: 'Created',
      width: 110,
      renderCell: (params) => moment.unix(params.row.created).format('MM/DD/YYYY')
    }, {
      field: 'dueDate',
      headerName: 'Due',
      width: 110,
      renderCell: (params) => moment.unix(params.row.dueDate).format('MM/DD/YYYY')
    }, {
      field: 'total',
      headerName: 'Total',
      renderCell: (params) => rnd(params.row.total)
    }, {
      field: 'hostedInvoiceUrl',
      headerName: 'Payment',
      renderCell: (params) => {
        switch(params.row.status) {
          case 'draft':
          default:
            return <>
              <Link id={`invoice_url_${params.row.id}`} className='pointer' href={params.row.hostedInvoiceUrl} target="_blank">Link</Link>
            </>
        }
      }
    }
  ]

  return <DataGrid
    rows={invoices}
    columns={columns}
    disableSelectionOnClick
  />
}

export default Invoices
