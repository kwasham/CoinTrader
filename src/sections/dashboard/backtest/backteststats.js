import { useState } from 'react';
import { Card, CardContent, CardHeader, Tabs, Tab, Typography, Box } from '@mui/material';

const BacktestStats = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Card sx={{height: '100%'}}>
        <CardHeader title="Backtest Stats" />
        <CardContent>
          <Tabs value={value} 
          onChange={handleChange} 
          indicatorColor="primary" 
          textColor="primary">
            <Tab label="Configuration" />
            <Tab label="Compatibilities" />
            <Tab label="Notes" />
          </Tabs>
          <Box mt={2}>
            {value === 0 && <Typography variant="body1">Configuration content goes here.</Typography>}
            {value === 1 && <Typography variant="body1">Compatibilities content goes here.</Typography>}
            {value === 2 && <Typography variant="body1">Notes content goes here.</Typography>}
          </Box>
        </CardContent>
      </Card>
    );
}

export default BacktestStats  