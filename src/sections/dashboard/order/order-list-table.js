
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import numeral from 'numeral';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  FILLED: 'success',
  OPEN: 'info',
  CANCELLED: 'warning',
  FAILED: 'error',
};

export const OrderListTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelect,
    page = 0,
    rowsPerPage = 0,
  } = props;

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow >
            <TableCell>Time Placed</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Side</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Fills</TableCell>
            <TableCell>% Filled</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((order) => {
            const parsedDate = parseISO(order.created_time);
            const createdAtMonth = format(parsedDate, 'LLL').toUpperCase();
            const createdAtTime = format(parsedDate, 'HH:mm');
            const createdAtDay = format(parsedDate, 'd');
            const createdAtYear = format(parsedDate, 'yyyy');
            const statusColor = statusMap[order.status] || 'warning';
            const BaseCurrency = order.product_id.split("-")[0];
            const QuoteCurrency = order.product_id.split("-")[1];
          
          

            return (
              <TableRow
                hover
                key={order.order_id}
                onClick={() => onSelect?.(order.order_id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.200',
                      borderRadius: 2,
                      maxWidth: 'fit-content',
                      ml: 3,
                      p: 1,
                    }}
                  >
                    <Typography
                      align="center"
                      variant="subtitle2"
                    >
                      {createdAtMonth + " " + createdAtDay}
                    </Typography>
                    
                    <Typography
                      align="center"
                      variant="subtitle2"
                    >
                      {createdAtYear}
                    </Typography>
                   
                  </Box>
                  
                </TableCell>
                <TableCell>
                  {order.product_id}
                </TableCell>
                <TableCell>
                  {order.order_type}
                </TableCell>
                <TableCell>
                  {order.side}
                </TableCell>
                <TableCell>
                {parseFloat(order.average_filled_price).toFixed(2) + " " + QuoteCurrency}
                </TableCell>
                <TableCell>
                  {parseFloat(order.filled_size).toFixed(8) + " " + BaseCurrency}
                </TableCell>
                <TableCell>
                  {order.number_of_fills}
                </TableCell>
                <TableCell>
                  {order.completion_percentage.split(".")[0] + "%"}
                </TableCell>
                <TableCell>
                {parseFloat(order.total_value_after_fees).toFixed(2) + " " + QuoteCurrency}
                </TableCell>
                <TableCell align="right">
                  <SeverityPill color={statusColor}>{order.status}</SeverityPill>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

OrderListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelect: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
