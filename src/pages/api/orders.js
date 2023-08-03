import { listOrders } from '../../utils/apiModule';

export default async function handler(req, res) {
  try {
    const ordersList = await listOrders();
    
    res.status(200).json(ordersList);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}
