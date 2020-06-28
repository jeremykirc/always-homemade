import axios from 'axios';
import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import ReactCrop from 'react-image-crop';

import { getCroppedImg } from '../helpers/crop-image';

const RecipeCreate = () => {
  const instruction = index => {
    return <li key={index}><Form.Control name='instructions' onChange={handleInputChange}></Form.Control></li>;
  }
  const [imageSource, setImageSource] = useState(null);
  const [cropData, setCropData] = useState({});
  const [imageRef, setImageRef] = useState();
  const [croppedImageUrl, setCroppedImageUrl] = useState();
  const [formData, setFormData] = useState({});
  const [instructions, setInstructions] = useState([instruction(0)]);

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
    .then(() => {
      console.log('test');
      location.href = '/'
    })
    .catch(error => console.error(error))
  }

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
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

  const onCropChange = (_crop, percentCrop) => setCropData(percentCrop);

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

  const addInstruction = () => {
    let index = instructions.length;
    setInstructions([...instructions, instruction(index)]);
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Row>
        <Col xs='12' md='5' lg='6'>
          <Form.Row>
            <Col xs='12'>
              <Form.Label>
                Title
                <Form.Control name='title' onChange={handleInputChange}></Form.Control>
              </Form.Label>
            </Col>
            <Col xs='12'>
              <Form.Label>
                Description
                <Form.Control as='textarea' rows='5' name='description' onChange={handleInputChange}></Form.Control>
              </Form.Label>
            </Col>
            <Col xs='12'>
              <Form.Label>
                Instructions
                <ol>{instructions}</ol>
                <i className='fas fa-plus-square add-btn' tabIndex='0' onClick={addInstruction}></i>
              </Form.Label>
            </Col>
            <Col xs='12'>
              <Form.Label>
                Photo
                <input 
                  type='file'
                  accept='image/*'
                  onChange={onSelectFile}
                />
              </Form.Label>
            </Col>
          </Form.Row>
        </Col>
        <Col xs='12' md='7' lg='6' className='imageCropper'>
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
        </Col>
        <Col xs='12'>
          <button className='btn btn-primary save-btn'>Save</button>
        </Col>
      </Form.Row>
      </Form>
  );
};

export default RecipeCreate;
