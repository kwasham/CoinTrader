import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import numeral from 'numeral';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import { SeverityPill } from 'src/components/severity-pill';
import { Scrollbar } from 'src/components/scrollbar';

const statusMap = {
  CANCELLED: 'warning',
  FILLED: 'success',
  OPEN: 'info',
  FAILED: 'error',
};

export const OrderDetails = (props) => {
  const { onApprove, onEdit, onReject, order } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const align = lgUp ? 'horizontal' : 'vertical';
  const config = order.order_configuration || {};
  const parsedDate = parseISO(order.created_time);
  const createdAt = format(parsedDate, 'MM/dd/yyyy hh:mm a');
  const statusColor = statusMap[order.status];
  const totalAmount = numeral(order.totalAmount).format(`${'$'}0,0.00`);

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Typography variant="h6">Details</Typography>
          <Button
            color="inherit"
            onClick={onEdit}
            size="small"
            startIcon={
              <SvgIcon>
                <Edit02Icon />
              </SvgIcon>
            }
          >
            Edit
          </Button>
        </Stack>
        <PropertyList>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="ID"
            value={order.order_id}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Order Type"
            value={order.order_type}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Trading Pair"
          >
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {order.product_id}
            </Typography>
           
          </PropertyListItem>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Date"
            value={createdAt}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Promotion Code"
            value="What can we put here?"
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Total Amount"
            value={order.total_value_after_fees}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Status"
          >
            <SeverityPill color={statusColor}>{order.status}</SeverityPill>
          </PropertyListItem>
        </PropertyList>
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          justifyContent="flex-end"
          spacing={2}
        >
          <Button
            onClick={onApprove}
            size="small"
            variant="contained"
          >
            Approve
          </Button>
          <Button
            color="error"
            onClick={onReject}
            size="small"
            variant="outlined"
          >
            Reject
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={3}>
        <Typography variant="h6">Order Config</Typography>
        <Scrollbar>
          <Table sx={{ minWidth: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell>Key</TableCell>
                <TableCell>Value</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
            {Object.entries(config).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>{JSON.stringify(value)}</TableCell>
            </TableRow>
          ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </Stack>
    </Stack>
  );
};

OrderDetails.propTypes = {
  onApprove: PropTypes.func,
  onEdit: PropTypes.func,
  onReject: PropTypes.func,
  order: PropTypes.object,
};
