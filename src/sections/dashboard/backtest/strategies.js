import { 
    Box, 
    Typography, 
    Select, 
    MenuItem, 
    Slider, 
    Switch, 
    FormControl, 
    InputLabel, 
    FormGroup, 
    FormControlLabel,
    Card,
    CardHeader,
    CardContent
  } from '@mui/material';
  import { useState } from 'react';
  
  export default function Strategies() {
    const [pattern, setPattern] = useState('');
    const [size, setSize] = useState(30);
    const [showPattern, setShowPattern] = useState(true);
  
    return (
      <Card sx={{ maxWidth: 345, m: 2 }}>
        <CardHeader title="Settings" />
  
        <CardContent>
          <FormControl fullWidth variant="standard" margin="normal">
            <InputLabel htmlFor="pattern-select">Pattern</InputLabel>
            <Select
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              label="Pattern"
              id="pattern-select"
            >
              <MenuItem value="Doji">Doji</MenuItem>
              <MenuItem value="Engulfing">Engulfing</MenuItem>
              {/* ... other patterns */}
            </Select>
          </FormControl>
  
          <Typography id="size-slider" gutterBottom>
            Size
          </Typography>
          <Slider
            aria-labelledby="size-slider"
            value={size}
            onChange={(e, newValue) => setSize(newValue)}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={10}
            max={110}
          />
  
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={showPattern}
                  onChange={(e) => setShowPattern(e.target.checked)}
                  name="showPatternSwitch"
                />
              }
              label="Show Pattern"
            />
            {/* ... other switches */}
          </FormGroup>
        </CardContent>
      </Card>
    );
  }
  