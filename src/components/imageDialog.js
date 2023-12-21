import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { dialogOpen } from "../features/dialog/dialogSlice";

const ImageDialog = () => {
  const open = useSelector((state) => state.dialog.open);
  const selectedImage = useSelector((state) => state.dialog.url);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(dialogOpen(false));
  };

  return (
    <div onClick={handleClose}>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent >
          <img
            src={selectedImage}
            alt="Selected"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageDialog;
