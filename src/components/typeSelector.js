import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {setFileType} from '../features/parameter/parameterSlice';

export default function TypeSelector() {
  const dispatch = useDispatch();
  const convertType = useSelector((state) => state.parameter.fileType);
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
    dispatch(setFileType(event.target.value));
  };

  return (
    <Box sx={{ width: widthObj.width }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">File Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={convertType}
          label="File Type"
          onChange={handleChange}
        >
          <MenuItem value={"keep"}>Keep Image Type</MenuItem>
          <MenuItem value={"image/webp"}>webp</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
