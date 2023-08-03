

export default async function handler(req, res) {
  const url = 'https://d8f7-24-27-36-117.ngrok-free.app/api/webhook';
  const data = {
    "order" : "buy",
    "ticker": "BTCUSDT",
   "position": "1"
   };

  try {
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error sending data' });
  }
}
