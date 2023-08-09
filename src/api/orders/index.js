import { order, orders } from './data';
import { deepCopy } from 'src/utils/deep-copy';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';

class OrdersApi {
  async getOrders(request = {}) {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    // Fetch orders from your API
    const response = await fetch('/api/orders');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    
    let result = await response.json();
    let data = result.orders
    let count = data.length;
    console.log(data);
    if (typeof filters !== 'undefined') {
      data = data.filter((order) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          // Checks only the order number, but can be extended to support other fields, such as customer
          // name, email, etc.
          const containsQuery = (order.order_number || '')
            .toLowerCase()
            .includes(filters.query.toLowerCase());

          if (!containsQuery) {
            return false;
          }
        }

        if (typeof filters.status !== 'undefined') {
          const statusMatched = order.status === filters.status;

          if (!statusMatched) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof sortBy !== 'undefined' && typeof sortDir !== 'undefined') {
      data = applySort(data, sortBy, sortDir);
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count,
    });
  }

  getOrder(request) {
    return Promise.resolve(deepCopy(order));
  }
}

export const ordersApi = new OrdersApi();
