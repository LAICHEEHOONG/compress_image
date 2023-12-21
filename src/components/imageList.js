import React from "react";
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

export default function StandardImageList() {
  const dispatch = useDispatch();
  const oriUrls = useSelector((state) => state.image.urls);
  const oriSizes = useSelector((state) => state.image.oriSizes);
  const oriTypes = useSelector((state) => state.image.oriTypes);
  const compressUrls = useSelector((state) => state.image.compressUrls);
  const compressSizes = useSelector((state) => state.image.compressSizes);
  const compressTypes = useSelector((state) => state.image.compressTypes);
  const compressPercent = useSelector(
    (state) => state.image.compressionPercentage
  );
  const oriWH = useSelector((state) => state.image.oriWH);
  const compressWH = useSelector((state) => state.image.compressWH);

  const clickImageHandle = (event) => {
    dispatch(dialogURL(event.target.name));
    dispatch(dialogOpen(true));
  };

  return (
    <div>
      {oriUrls.length > 0 ? (
        <Typography variant="h4" gutterBottom>
          Image comparison
        </Typography>
      ) : null}

      <div style={{ display: "flex" }}>
        <ImageList
          sx={{ width: 500, height: 800, marginRight: 5 }}
          cols={1}
          rowHeight={300}
        >
          {oriUrls.map((url, index) => (
            <ImageListItem key={index}>
              <img
                name={`${url}`}
                onClick={clickImageHandle}
                style={{ maxHeight: 300, cursor: "pointer" }}
                src={url}
                alt={` ${index + 1}`}
              />
              <ImageListItemBar
                title={`
                   Type: ${oriTypes[index].substring(6)} , 
                   Size: ${bytesToMB(oriSizes[index])}
                  `}
                actionIcon={
                  <IconButton sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    {`${oriWH[index][0]} x ${oriWH[index][1]}`}
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>

        <ImageList sx={{ width: 500, height: 800 }} cols={1} rowHeight={300}>
          {compressUrls.map((url, index) => (
            <ImageListItem key={index}>
              <img
                name={`${url}`}
                onClick={clickImageHandle}
                style={{ maxHeight: 300, cursor: "pointer" }}
                src={url}
                alt={` ${index + 1}`}
              />
          
              <ImageListItemBar
                title={`
                Type: ${compressTypes[index].substring(6)} , 
                Size: ${bytesToMB(compressSizes[index])} ,
                Compression: ${100 - compressPercent[index].toFixed(2)}%
                `}
                actionIcon={
                  <IconButton sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    {`${compressWH[index][0]} x ${compressWH[index][1]}`}
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
}
