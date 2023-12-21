import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setQuality } from '../features/parameter/parameterSlice';


export default function QualitySelector() {
  const dispatch = useDispatch();
  const quality = useSelector(state => state.parameter.quality);
  const screenWidth = useSelector(state => state.screen.screenWidth);
  const [widthObj, setWidthObj] = useState({width: 224.61});

  useEffect(() => {
    if(screenWidth < 800) {
      setWidthObj(state => ({...state, width: 134.77}));
    } else {
      setWidthObj(state => ({...state, width: 224.61}));
    }
  }, [screenWidth]);




  const handleChange = (event) => {
    dispatch(setQuality(event.target.value));
  };

  return (
    <Box sx={{ width: widthObj.width, marginLeft: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Quality</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={quality}
          label="Quality"
          onChange={handleChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={0.9}>0.9</MenuItem>
          <MenuItem value={0.8}>0.8</MenuItem>
          <MenuItem value={0.7}>0.7</MenuItem>
          <MenuItem value={0.6}>0.6</MenuItem>
          <MenuItem value={0.5}>0.5</MenuItem>
          <MenuItem value={0.4}>0.4</MenuItem>
          <MenuItem value={0.3}>0.3</MenuItem>
          <MenuItem value={0.2}>0.2</MenuItem>
          <MenuItem value={0.1}>0.1</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
