import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import DrawerAppBar from "../components/homeContainer";
import AlertSnackbar from "../components/alertSnackbar";
import ImageDialog from "../components/imageDialog";
import { setScreenWidth } from "../features/screenWidth/screenWidthSlice";


const Home = () => {
  const dispatch = useDispatch();
  const handleResize = () => {
    let screenInnerWidth = window.innerWidth;
    dispatch(setScreenWidth(screenInnerWidth));
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <DrawerAppBar />
      <AlertSnackbar />
      <ImageDialog />
    </>
  );
};

export default Home;
