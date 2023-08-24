import { useState } from 'react';
import { Card, CardContent, CardHeader, Tabs, Tab, Typography, Box } from '@mui/material';

const BacktestResults = ({ results }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!results) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" align="center">
            No Data to display. Choose a Strategy to run a backtest.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Backtest Results
        </Typography>
        {Object.entries(results).map(([key, value], index) => (
          <Typography key={index}>
            {key}: {value}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default BacktestResults;
