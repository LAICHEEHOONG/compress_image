import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InputFileUpload from "./uploadFile";
import LinearWithValueLabel from "./progress";
import ParametersFields from "./parameters";

const UploadPage = () => {
  const progressOpen = useSelector((state) => state.progress.open);
  const [widthObj, setWidthObj] = useState({fontSize: 300});
  const screenWidth = useSelector(state => state.screen.screenWidth);

  useEffect(() => {
    if(screenWidth < 800) {
      setWidthObj(state => ({...state, fontSize: 150}));
    } else {
      setWidthObj(state => ({...state, fontSize: 300}));
    }
  }, [screenWidth]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        <CloudUploadIcon className="mb-4" style={{ fontSize: widthObj.fontSize }} />
      </div>
      <ParametersFields />

      {progressOpen ? <LinearWithValueLabel /> : <InputFileUpload />}
    </div>
  );
};

export default UploadPage;
