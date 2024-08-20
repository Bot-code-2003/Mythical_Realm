import React, { useState } from "react";
import Compressor from "compressorjs";

const ImageInput = () => {
  const [image, setImage] = useState(null);
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const sizeInKB = (file.size / 1024).toFixed(2);
      new Compressor(file, {
        quality: sizeInKB > 500 ? 0.2 : 0.5,
        success: (compressedImage) => {
          const reader = new FileReader();
          reader.onload = () => {
            const imageElement = new Image();
            imageElement.onload = () => {
              setImage(reader.result);
              setImageHeight(imageElement.height);
              setImageWidth(imageElement.width);
            };
            setUploadStatus("success");
            imageElement.src = reader.result;
          };
          reader.readAsDataURL(compressedImage);
        },
        error: () => {
          setUploadStatus("error");
        },
      });
    }
  };

  const handleReset = () => {
    setImage(null);
    setUploadStatus("");
    setImageWidth(null);
    setImageHeight(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <div className={`file-upload-container ${uploadStatus}`}>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <label htmlFor="file-input" className="file-upload-label">
            <span className="file-upload-text flex items-center">
              {image ? "File Uploaded Successfully" : "Upload an image"}
            </span>
          </label>
        </div>
        {image && (
          <p className="px-2 border border-black" onClick={handleReset}>
            Cancel
          </p>
        )}
      </div>
      {image && (
        <img
          src={image}
          height={imageHeight > 600 ? 600 : imageHeight}
          width={imageWidth > 600 ? 600 : imageWidth}
          alt="Uploaded Preview"
        />
      )}
    </div>
  );
};

export default ImageInput;
