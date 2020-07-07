import axios from 'axios';
import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import ReactCrop from 'react-image-crop';

import { getCroppedImg } from '../helpers/crop-image';
import RecipeInstructionInput from './RecipeInstructionInput';

const RecipeCreate = ({ history }) => {
  const handleInputChange = (e) => {
    if (e.target.getAttribute('name') == 'instruction') {
      let instructions = formData.instructions || [];
      let index = e.target.getAttribute('data-index');
      instructions[index] = e.target.value;
      setFormData({...formData, instructions: instructions })
    } else {
      setFormData({...formData, [e.target.name]: e.target.value })
    }
  }

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  }

  const [imageSource, setImageSource] = useState(null);
  const [cropData, setCropData] = useState({});
  const [imageRef, setImageRef] = useState();
  const [croppedImageBlob, setCroppedImageBlob] = useState();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    instructions: '',
    image: ''
  });
  const [instructions, setInstructions] = useState(['']);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let data = new FormData();
    for (const key in formData) {
      if (key == 'instructions') {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    }
    console.log(croppedImageBlob)
    data.append('image', croppedImageBlob);

    const token = document.querySelector('[name=csrf-token]').content;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    axios.post('/api/v1/recipes', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      history.push('/');
    })
    .catch(error => console.error(error))
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
        const imageBlob = await getCroppedImg(imageRef, crop);
        setCroppedImageBlob(imageBlob);
      } catch (err) {
        console.error('Failed to crop image', err);
      }
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Row>
        <Col xs='12' md='5' lg='6'>
          <Form.Row>
            <Col xs='12' lg='6'>
              <Form.Label>
                Title
                <Form.Control name='title' onChange={handleInputChange} value={formData.title}></Form.Control>
              </Form.Label>
            </Col>
            <Col xs='12'>
              <Form.Label>
                Description
                <Form.Control as='textarea' rows='5' name='description' onChange={handleInputChange} value={formData.description}></Form.Control>
              </Form.Label>
            </Col>
            <Col xs='12'>
              <Form.Label>
                Link
                <Form.Control name='link' onChange={handleInputChange} value={formData.link}></Form.Control>
              </Form.Label>
            </Col>
            <Col xs='12'>
              <Form.Label>
                Instructions
                <ol>
                  {
                    instructions.map((value, index) => {
                      return <RecipeInstructionInput index={index} onChange={handleInputChange} value={value} />
                    })
                  }
                </ol>
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
