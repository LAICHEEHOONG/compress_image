import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TypeSelector from "./typeSelector";
import QualitySelector from "./qualitySeletor";
import {
  setAlertStatus,
  setAlertText,
  setWidth,
  setHeight,
} from "../features/parameter/parameterSlice";

export default function ParametersFields() {
  const dispatch = useDispatch();
  const { width, height } = useSelector((state) => state.parameter);
  const screenWidth = useSelector(state => state.screen.screenWidth);
  const [widthObj, setWidthObj] = useState({width: '25ch'});

  useEffect(() => {
    if(screenWidth < 800) {
      setWidthObj(state => ({...state, width: '15ch'}));
    } else {
      setWidthObj(state => ({...state, width: '25ch'}));
    }
  }, [screenWidth]);


  const handleWidthInputChange = (event) => {
    let numStatus = Number(event.target.value);

    if (numStatus <= 0) {
      dispatch(setAlertStatus(true));
      dispatch(setAlertText("The input box does not accept 0 or less than 0"));
      dispatch(setWidth(1024));
    } else if (!numStatus) {
      dispatch(setAlertStatus(true));
      dispatch(setAlertText("The input box only accepts numbers"));
      dispatch(setWidth(1024));
    } else {
      dispatch(setAlertStatus(false));
      dispatch(setAlertText(""));
      dispatch(setWidth(numStatus));
    }
  };
  const handleHeightInputChange = (event) => {
    let numStatus = Number(event.target.value);

    if (numStatus <= 0) {
      dispatch(setAlertStatus(true));
      dispatch(setAlertText("The input box does not accept 0 or less than 0"));
      dispatch(setHeight(768));
    } else if (!numStatus) {
      dispatch(setAlertStatus(true));
      dispatch(setAlertText("The input box only accepts numbers"));
      dispatch(setHeight(768));
    } else {
      dispatch(setAlertStatus(false));
      dispatch(setAlertText(""));
      dispatch(setHeight(numStatus));
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: widthObj.width },
        marginBottom: "10px",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Width"
        variant="outlined"
        onChange={handleWidthInputChange}
        value={width}
      />
      <TextField
        id="outlined-basic"
        label="Height"
        variant="outlined"
        onChange={handleHeightInputChange}
        value={height}
      />
      <div style={{ display: "flex" }}>
        <div>
          <TypeSelector />
        </div>
        <div>
          <QualitySelector />
        </div>
      </div>
    </Box>
  );
}
