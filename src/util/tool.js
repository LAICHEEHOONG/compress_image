export function resizeAndConvertToWebP(
  file,
  maxWidth,
  maxHeight,
  quality,
  imageType
) {
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
        ctx.fillText(
          "THE NEXT SIX",
          canvas.width / 2 - 180 * (width / 1024),
          canvas.height / 2
        );
        
    

        if (imageType === "keep" || !isAppleBrowser()) {
          imageType = file.type;
        } else {
          imageType = "image/webp";
        }

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          imageType,
          quality
        );

      };


      image.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });
}

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



function isAppleBrowser() {
  const elem = document.createElement('canvas');
  if (!!(elem.getContext && elem.getContext('2d'))) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
}

// if (isAppleBrowser()) {
//   // The browser is in the Apple ecosystem
//   // You can perform specific actions or checks for Apple devices here
// } else {
//   // Not in the Apple ecosystem
// }
