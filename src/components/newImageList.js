import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ImageListItem,
  ImageList,
  ImageListItemBar,
  IconButton,
  Typography,
} from "@mui/material";
import { bytesToMB } from "../util/tool";
import { dialogURL, dialogOpen } from "../features/dialog/dialogSlice";
import { mergeData } from "../features/image_/imageSlice";

export default function NewImageList() {
  const dispatch = useDispatch();
  const oriUrls = useSelector((state) => state.image.urls);
  const mergeDataArr = useSelector((state) => state.image.mergeData);
  const screenWidth = useSelector((state) => state.screen.screenWidth);

  let [widthControl, setWidthControl] = useState({ minWidth: 950, cols: 2 });

  const clickImageHandle = (event) => {
    dispatch(dialogURL(event.target.name));
    dispatch(dialogOpen(true));
  };

  useEffect(() => {
   
    if(screenWidth < 960) {
      setWidthControl(state => ({...state, minWidth: 360, cols: 1}))
    } else {
      setWidthControl(state => ({...state, minWidth: 950, cols: 2}))
    }

    dispatch(mergeData());
  }, [dispatch, screenWidth]);

  return (
    <div style={{ margin: "20px" }}>
      {oriUrls.length > 0 ? (
        <Typography variant="h4" gutterBottom>
          Image Comparison
        </Typography>
      ) : null}

      <div>
        <ImageList
          sx={{ minWidth: widthControl.minWidth }}
          cols={widthControl.cols}
        >
          {mergeDataArr.length > 0 ? (
            mergeDataArr.map((data, index) => (
              <ImageListItem
                key={index + data.name}
                sx={{ position: "relative" }}
              >
                <img
                  name={`${data.urls}`}
                  onClick={clickImageHandle}
                  style={{ cursor: "pointer", marginTop: "20px" }}
                  src={data.urls}
                  alt={` ${index + 1}`}
                />
                <ImageListItemBar
                  title={
                  `Type: ${data.type.substring(6)} , Size: ${bytesToMB(data.size)}
                   ${data.percentage && screenWidth > 570 ? `, Compression: ${data.percentage.toFixed(2)}%`: ""}`
                  }
                  actionIcon={
                    <IconButton
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: "1rem",
                      }}
                    >
                      {`${data.wH[0]} x ${data.wH[1]}`}
                    </IconButton>
                  }
                  sx={{fontSize: '5px'}}
                />
              </ImageListItem>
            ))
          ) : (
            <></>
          )}
        </ImageList>
      </div>
    </div>
  );
}
