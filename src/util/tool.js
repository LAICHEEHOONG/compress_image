export function resizeAndConvertToWebP(file, maxWidth, maxHeight, quality, imageType) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const image = new Image();

      image.onload = function () {
        const canvas = document.createElement("canvas");
        let width = image.width;
        let height = image.height;

        //Horizontal image
        if (width > height) {
          if (width > maxWidth) {
            //When the input image width is larger than the setting, the width will become the setting width
            //The height will be adjusted according to the set width
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else if (width === height) {
          width = maxWidth;
          height = maxHeight;
        } else {
          //vertical image
          if (height > maxHeight) {
            //When the input image height is larger than the setting, the height will become the setting height
            //The width will be adjusted according to the set height
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);

        // Add watermark
        ctx.font = `${48 * (width / 1024)}px Arial`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillText('THE NEXT SIX', canvas.width / 2 - (180 * (width / 1024)), canvas.height / 2);

        if(imageType === 'keep') {
          imageType = file.type
        } else {
          imageType = "image/webp"
        }

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          imageType,
          // file.type,
          // "image/webp",
          quality
        );
      };

      image.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });
}

// Example usage:
// Assume you have an event in your component containing the uploaded file
// For instance, in your onChange handler for file input:
// const handleFileChange = async (event) => {
//   const file = event.target.files[0];
//   const resizedImage = await resizeAndConvertToWebP(file, 300, 300, 0.8);
//   // Use the resizedImage blob as needed (e.g., upload it or display it)
// };

export const bytesToMB = (size) => {
  let result;
  if (size < 1024 * 1024) {
    result = size / 1024;
    return `${result.toFixed(2)} KB`;
  } else {
    result = size / (1024 * 1024);
    return `${result.toFixed(2)} MB`;
  }
};
