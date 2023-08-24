import { useState } from 'react';
import { Card, CardContent, CardHeader, Tabs, Tab, Typography, Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    customSignalName: '',
    customSignalCondition: ''
  };
  
  const validationSchema = Yup.object({
    customSignalName: Yup.string().required('Signal Name is required'),
    customSignalCondition: Yup.string().required('Condition is required')
  });

const SignalsAndSelectors = () => {
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false)

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
          console.log(values);
        }
      });

    const handleOpen = () => {
        setOpen(true);
      };
      
      const handleClose = () => {
        setOpen(false);
      };

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Card>
        <CardHeader title="Signals & Selectors" />
        <CardContent>
          <Tabs value={value} 
          onChange={handleChange} 
          indicatorColor="primary" 
          textColor="primary">
            <Tab label="Signals" />
            <Tab label="Selectors" />
            
          </Tabs>
          <Box mt={2}>
            {value === 0 && <Typography variant="body1">Configuration content goes here.</Typography>}
            <Button onClick={handleOpen}>Add a new custom signal</Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Custom Signal</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name="customSignalName"
            label="Signal Name"
            value={formik.values.customSignalName}
            onChange={formik.handleChange}
            error={formik.touched.customSignalName && Boolean(formik.errors.customSignalName)}
            helperText={formik.touched.customSignalName && formik.errors.customSignalName}
          />
          <TextField
            name="customSignalCondition"
            label="Condition"
            value={formik.values.customSignalCondition}
            onChange={formik.handleChange}
            error={formik.touched.customSignalCondition && Boolean(formik.errors.customSignalCondition)}
            helperText={formik.touched.customSignalCondition && formik.errors.customSignalCondition}
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
            {value === 1 && <Typography variant="body1">Compatibilities content goes here.</Typography>}
            
          </Box>
        </CardContent>
      </Card>
    );
}

export default SignalsAndSelectors