import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addImage, addCompressWH, mergeData } from "../features/image_/imageSlice";
import Button from "@mui/joy/Button";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";
import { resizeAndConvertToWebP } from "../util/tool";
import {
  progressOpen,
  progressReset,
  progressPercent,
} from "../features/progress/progressSlice";
import StandardImageList from "./imageList";
import NewImageList from "./newImageList";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function InputFileUpload() {
  const parameter = useSelector((state) => state.parameter);
  const urls = useSelector((state) => state.image.urls);
  const dispatch = useDispatch();

  const handleFileChange = async (event) => {
    dispatch(progressOpen(true));
    dispatch(progressPercent(10));
    const file = event.target.files[0];
    let oriW, oriH, compressW, compressH;

    if (file.type.startsWith("image/")) {
      const img = new Image();

      img.onload = function () {
        oriW = img.width;
        oriH = img.height;

        // console.log(`Image width: ${width}px`);
        // console.log(`Image height: ${height}px`);
      };

      img.src = URL.createObjectURL(file);
    } else {
      console.log("The selected file is not an image.");
    }

    dispatch(progressPercent(10));
    if (file === "" || !file) {
      return;
    }
    dispatch(progressPercent(10));
    const resizedImage = await resizeAndConvertToWebP(
      file,
      parameter.width,
      parameter.height,
      parameter.quality,
      parameter.fileType
    );

    const compressImage = new Image();

    dispatch(progressPercent(60));
    const compressUrl = URL.createObjectURL(resizedImage);
    compressImage.src = compressUrl;
    compressImage.onload = function () {
      compressW = compressImage.width;
      compressH = compressImage.height;
      dispatch(addCompressWH([compressW, compressH]));
    };

    let dataObj = {
      url: URL.createObjectURL(file),
      compressUrl,
      name: file.name,
      oriSize: file.size,
      compressSize: resizedImage.size,
      oriType: file.type,
      compressType: resizedImage.type,
      compressionPercentage: resizedImage.size * (100 / file.size),
      oriWH: [oriW, oriH],
    };

    dispatch(addImage(dataObj));

    dispatch(progressPercent(10));
    // dispatch(mergeData())
    setTimeout(() => {
      dispatch(progressReset());
    }, 1000);
  };

  return (
    <>
      <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="outlined"
        color="neutral"
        // onClick={handleUpload}
        startDecorator={
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </SvgIcon>
        }
      >
        Upload a image
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>

      {urls.length > 0 ? <NewImageList /> : null}

      {/* {urls.length > 0 ? <StandardImageList /> : null} */}
    </>
  );
}
