import axios from 'axios';
import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';

import { getCroppedImg } from '../helpers/crop-image';

const ImageUpload = () => {
  const [imageSource, setImageSource] = useState(null);
  const [cropData, setCropData] = useState({});
  const [imageRef, setImageRef] = useState();
  const [croppedImageUrl, setCroppedImageUrl] = useState();
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let data = new FormData();
    for (const key in formData) { data.append(key, formData[key]); }
    data.append('image', croppedImageUrl);

    const token = document.querySelector('[name=csrf-token]').content;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    axios.post('/api/v1/recipes', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

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
        const imageUrl = await getCroppedImg(imageRef, crop, 'recipe.jpg');
        window.URL.revokeObjectURL(croppedImageUrl);
        setCroppedImageUrl(imageUrl);
      } catch (err) {
        console.error('Failed to crop image', err);
      }
    }
  };

  const onCropChange = (_crop, percentCrop) => setCropData(percentCrop);

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='imageCropper row'>
      <form onSubmit={handleFormSubmit}>
        <div className='col-12'>
          <label>
            Title
            <input type='text' name='title' className='form-control' onChange={handleInputChange}></input>
          </label>
        </div>
        <div className='col-12'>
          <label>
            Description
            <textarea type='text' name='description' className='form-control' onChange={handleInputChange}></textarea>
          </label>
        </div>
        <div className='col-12'>
          <input 
            type='file'
            accept='image/*'
            onChange={onSelectFile}
          />
        </div>
        <div className='col-12'>
          <button className='btn btn-primary save-btn'>Save</button>
        </div>
      </form>
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
