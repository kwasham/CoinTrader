import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ConfigurationSchema = Yup.object().shape({
  market: Yup.string().required('Required'),
  initialCapital: Yup.number().required('Required'),
  backtestRange: Yup.string().required('Required'),
});

const Configuration = () => {
  const formik = useFormik({
    initialValues: {
      market: '',
      initialCapital: '',
      backtestRange: '',
    },
    validationSchema: ConfigurationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box>
      <Typography variant="h6">Configuration</Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          fullWidth
          variant="outlined"
          margin="normal"
        >
          <InputLabel id="market-label">Market to trade</InputLabel>
          <Select
            labelId="market-label"
            id="market"
            name="market"
            value={formik.values.market}
            onChange={formik.handleChange}
            label="Market to trade"
            error={formik.touched.market && Boolean(formik.errors.market)}
          >
            <MenuItem value="market1">Market 1</MenuItem>
            <MenuItem value="market2">Market 2</MenuItem>
            <MenuItem value="market3">Market 3</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          id="initialCapital"
          name="initialCapital"
          label="Initial capital"
          value={formik.values.initialCapital}
          onChange={formik.handleChange}
          error={formik.touched.initialCapital && Boolean(formik.errors.initialCapital)}
          helperText={formik.touched.initialCapital && formik.errors.initialCapital}
        />
        <TextField
          fullWidth
          margin="normal"
          id="backtestRange"
          name="backtestRange"
          label="Backtest range"
          value={formik.values.backtestRange}
          onChange={formik.handleChange}
          error={formik.touched.backtestRange && Boolean(formik.errors.backtestRange)}
          helperText={formik.touched.backtestRange && formik.errors.backtestRange}
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          style={{ marginTop: '16px' }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Configuration;
