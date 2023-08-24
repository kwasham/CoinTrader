import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
  Typography,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const categories = [
  { label: 'Overlap Studies', indicators: ['SMA', 'EMA'] },
  // ... other categories
];

const Indicators = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const formik = useFormik({
    initialValues: { category: '', indicator: '', parameters: {} },
    // Yup schema can be defined as per requirement
    onSubmit: (values) => {
      // Handle indicator selection
    },
  });

  const selectedCategory = categories.find((cat) => cat.label === formik.values.category);

  return (
    <Card>
      <CardHeader title="Technical Indicators" />
      <CardContent>
        <Typography variant="h6">Select Technical Indicator</Typography>

        <Select
          value={formik.values.category}
          onChange={formik.handleChange}
          name="category"
        >
          {categories.map((cat) => (
            <MenuItem
              value={cat.label}
              key={cat.label}
            >
              {cat.label}
            </MenuItem>
          ))}
        </Select>

        {selectedCategory && (
          <Select
            value={formik.values.indicator}
            onChange={formik.handleChange}
            name="indicator"
          >
            {selectedCategory.indicators.map((indicator) => (
              <MenuItem
                value={indicator}
                key={indicator}
              >
                {indicator}
              </MenuItem>
            ))}
          </Select>
        )}

        {/* Based on the chosen indicator, render specific parameter fields */}
        {formik.values.indicator === 'SMA' && (
          <TextField
            name="parameters.period"
            label="Period"
          />
        )}

        {/* ... other indicators' parameters */}

        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Apply Indicator
        </Button>
      </CardContent>
    </Card>
  );
};

export default Indicators;
