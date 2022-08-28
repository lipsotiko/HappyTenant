import { useState, useMemo } from 'react'

import { rnd } from 'util/utils'
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Invoices = ({ invoices }) => {
  const [selectedInvoice, setSelectedInvoice] = useState()

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
      renderCell: (params) => (params.row.description) ? params.row.description : params.row.lines.data[0].description
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
      renderCell: (params) => (params.row.dueDate) ? moment.unix(params.row.dueDate).format('MM/DD/YYYY') : '-'
    }, {
      field: 'total',
      headerName: 'Total',
      renderCell: (params) => rnd(params.row.total)
    }, {
      field: 'hostedInvoiceUrl',
      headerName: 'Payment URL',
      renderCell: (params) => {
        switch(params.row.status) {
          case 'draft':
            return <Tooltip title="Payment URL will be available shortly">
              <span>Upcomming...</span>
            </Tooltip>
          default:
            return <>
              <Link id={`invoice_url_${params.row.id}`} className='pointer' href={params.row.hostedInvoiceUrl} target="_blank">Link</Link>
            </>
        }
      }
    }
  ]

  const lineItems = useMemo(() => (selectedInvoice) ? invoices.find(i => i.id === selectedInvoice).lines.data : [], [invoices, selectedInvoice])

  return <Box>
    <Box sx={{ height: 400, width: '100%', margin: '12px', marginBottom: '64px' }}>
      <Typography variant="h5" sx={{ marginBottom: '8px'}}>
          Invoices
      </Typography>
      <DataGrid
        rows={invoices}
        columns={columns}
        onRowClick={(r) => setSelectedInvoice(r.id)}
      />
    </Box>
    { selectedInvoice &&
    <Box sx={{ height: 400, width: '100%', margin: '12px'}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h5">
          Line Items
        </Typography>
        <IconButton onClick={() => setSelectedInvoice(null)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DataGrid
        rows={lineItems}
        columns={[{
          field: 'invoiceItem',
          headerName: 'Invoice Item ID',
          width: 222,
        }, {
          field: 'description',
          headerName: 'Description',
          width: 180,
        }, {
          field: 'amount',
          headerName: 'Amount',
          renderCell: (params) => rnd(params.row.amount)
        }]}
        disableSelectionOnClick
      />
      </Box>
    }
  </Box>
}

export default Invoices
