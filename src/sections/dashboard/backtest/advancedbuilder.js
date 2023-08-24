import { useState } from 'react';
import { Card, CardContent, CardHeader, Tabs, Tab, Typography, Box } from '@mui/material';
import Configuration from './config/config';



const AdvancedBuilder = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
         
      <Card sx={{height: "100%"}}>
        <CardHeader title="Advanced Builder" />
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
            {value === 0 && <Configuration />}
            {value === 1 && <Typography variant="body1">Compatibilities content goes here.</Typography>}
            {value === 2 && <Typography variant="body1">WARNING: This is a template/example strategy for Coin Trader, intended purely for illustrative purposes and not to be construed as financial advice. Financial risks exist; always conduct your own research before making decisions..</Typography>}
          </Box>
        </CardContent>
      </Card>
      
    );
}

export default AdvancedBuilder