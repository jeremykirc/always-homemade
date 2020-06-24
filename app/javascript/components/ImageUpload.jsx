import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ReactCrop from 'react-image-crop';

import { getCroppedImg } from '../helpers/crop-image';

const ImageUpload = () => {
  const [imageSource, setImageSource] = useState(null);
  const [cropData, setCropData] = useState({});
  const [imageRef, setImageRef] = useState();
  const [croppedImageUrl, setCroppedImageUrl] = useState();

  // Set the src state when the user selects a file.
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImageSource(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

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
        const imageUrl = await getCroppedImg(imageRef, crop, 'newFile.jpeg');
        window.URL.revokeObjectURL(croppedImageUrl);
        setCroppedImageUrl(imageUrl);
      } catch (err) {
        console.error('Failed to crop image', err);
      }
    }
  };

  const onCropChange = (_crop, percentCrop) => setCropData(percentCrop);

  return (
    <div className='imageCropper'>
      <Form>
        <Button variant='primary' className='save-btn'>Save</Button>
        <Form.Control 
          type='file'
          accept='image/*'
          onChange={onSelectFile}
        />
      </Form>
      {imageSource && (
        <ReactCrop
          src={imageSource}
          crop={cropData}
          ruleOfThirds
          keepSelection
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
        />
      )}
    </div>
  );
};

export default ImageUpload;