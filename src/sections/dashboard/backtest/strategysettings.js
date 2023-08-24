import { useState } from 'react';
import { Card, CardContent, Typography, TextField, Grid, Button } from '@mui/material';
import {performBacktest} from '../../../backtest/performBacktest';

const BacktestInputCard = ({onBacktestComplete}) => {

  const [strategy, setStrategy] = useState('SMA');
  const [shortWindow, setShortWindow] = useState(20);
  const [longWindow, setLongWindow] = useState(50);
  const [startDate, setStartDate] = useState('2022-01-01');
  const [endDate, setEndDate] = useState('2023-07-31');
  const [asset, setAsset] = useState('BTC-USD');
  const [initialCapital, setInitialCapital] = useState(10000);

  const handleStrategyChange = (event) => {
    setStrategy(event.target.value);
  };

  const handleShortWindowChange = (event) => {
    setShortWindow(event.target.value);
  };

  const handleLongWindowChange = (event) => {
    setLongWindow(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleAssetChange = (event) => {
    setAsset(event.target.value);
  };

  const handleInitialCapitalChange = (event) => {
    setInitialCapital(event.target.value);
  };

  const handleBacktest = async() => {
    const data = {
      strategy,
      shortWindow,
      longWindow,
      startDate,
      endDate,
      asset,
      initialCapital
    };
    const results = await performBacktest(data);
    onBacktestComplete(results);
  };
  
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          Strategy Settings
        </Typography>

        <Grid
          container
          spacing={2}
        >
          {/* Strategy Selection */}
          <Grid
            item
            xs={12}
            sm={6}
          >
            

            <TextField
              fullWidth
              select
              value={strategy}
              label="Strategy"
              variant="outlined"
              SelectProps={{
                native: false,
              }}
              onChange={handleStrategyChange}
            >
              
              <option value="SMA">SMA</option>
              <option value="EMA">EMA</option>
            </TextField>
          </Grid>

          {/* Strategy Parameters */}
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              fullWidth
              value={shortWindow}
              label="Short Window"
              variant="outlined"
              type="number"
              onChange={handleShortWindowChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              fullWidth
              value={longWindow}
              label="Long Window"
              variant="outlined"
              type="number"
              onChange={handleLongWindowChange}
            />
          </Grid>

          {/* Date Range */}
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              fullWidth
              value={startDate}
              label="Start Date"
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleStartDateChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              fullWidth
              value={endDate}
              label="End Date"
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleEndDateChange}
            />
          </Grid>

          {/* Asset Selection */}
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              fullWidth
              select
              value={asset}
              label="Asset"
              variant="outlined"
              SelectProps={{
                native: false,
              }}
              onChange={handleAssetChange}
            >
              {/* Replace with your assets */}
              <option value="BTC-USD">BTC-USD</option>
              <option value="ETH-USD">ETH-USD</option>
            </TextField>
          </Grid>

          {/* Initial Capital */}
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              fullWidth
              value={initialCapital}
              label="Initial Capital"
              variant="outlined"
              type="number"
              onChange={handleInitialCapitalChange}
            />
          </Grid>

          {/* Backtest Button */}
          <Grid
            item
            xs={12}
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleBacktest}
            >
              Backtest Strategy
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BacktestInputCard;
