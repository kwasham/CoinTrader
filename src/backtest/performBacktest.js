export async function performBacktest(data) {
    const response = await fetch('http://localhost:5000/backtest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const results = await response.json();
    console.log(results);
    return results;
}
