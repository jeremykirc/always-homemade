import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';

import { getCroppedImg } from '../../helpers/crop-image';

const RecipeImageCropper = ({ imageSource, setCroppedImageBlob }) => {
  const [cropData, setCropData] = useState({});
  const [imageRef, setImageRef] = useState();

  const onCropChange = (_crop, percentCrop) => setCropData(percentCrop);

  const onImageLoaded = (image) => {
    setImageRef(image);
    setCropData({
      width: image.width,
      aspect: 1,
    });
    return false;
  };

  const onCropComplete = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      try {
        const imageBlob = await getCroppedImg(imageRef, crop);
        setCroppedImageBlob(imageBlob);
      } catch (err) {
        console.error('Failed to crop image', err);
      }
    }
  };

  return (
    <ReactCrop
      src={imageSource}
      crop={cropData}
      ruleOfThirds
      keepSelection
      onImageLoaded={onImageLoaded}
      onComplete={onCropComplete}
      onChange={onCropChange}
    />
  );
};

RecipeImageCropper.propTypes = {
  imageSource: PropTypes.string.isRequired,
  setCroppedImageBlob: PropTypes.func.isRequired,
};

export default RecipeImageCropper;