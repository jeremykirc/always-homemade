import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';

import { createRecipe } from '../../api/v1/recipes';
import RecipeImageCropper from './RecipeImageCropper';
import RecipeInstructionInput from './RecipeInstructionInput';

const RecipeForm = ({ history }) => {
  const handleInputChange = (e) => {
    if (e.target.getAttribute('name') == 'instruction') {
      let instructions = formData.instructions;
      let index = e.target.getAttribute('data-index');
      instructions[index] = e.target.value;
      setFormData({...formData, instructions: instructions });
    } else {
      setFormData({...formData, [e.target.name]: e.target.value });
    }
  };

  const addInstructionInput = () => {
    let instructions = formData.instructions;
    setFormData({...formData, instructions: [...instructions, ''] });
  };

  const [imageSource, setImageSource] = useState(null);
  const [croppedImageBlob, setCroppedImageBlob] = useState();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    instructions: [''],
    image: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (key == 'instructions') {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    }
    data.append('image', croppedImageBlob);

    createRecipe(data)
      .then(() => {
        history.push('/');
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Set the src state when the user selects a file.
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImageSource(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Row>
        <Col xs='12' md='5' lg='6'>
          <Form.Row>
            <Form.Group as={Col} xs='12' controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                name='title'
                value={formData.title}
                onChange={handleInputChange}>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs='12' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows='5'
                name='description'
                value={formData.description}
                onChange={handleInputChange}>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs='12' controlId='link'>
              <Form.Label>Link</Form.Label>
              <Form.Control
                name='link'
                value={formData.link}
                 onChange={handleInputChange}>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs='12' controlId='instructions'>
              <Form.Label>Instructions</Form.Label>
              <ol>
                {
                  formData.instructions.map((value, index) => {
                    return (
                      <RecipeInstructionInput
                        key={index}
                        index={index}
                        value={value}
                        onChange={handleInputChange} />
                    );
                  })
                }
              </ol>
              <i className='fas fa-plus-square add-btn' tabIndex='0' onClick={addInstructionInput}></i>
            </Form.Group>
            <Form.Group as={Col} xs='12' controlId='photo'>
              <Form.Label>Photo</Form.Label>
              <input
                type='file'
                accept='image/*'
                onChange={onSelectFile}
              />
            </Form.Group>
          </Form.Row>
        </Col>
        <Col xs='12' md='7' lg='6' className='imageCropper'>
          {imageSource && <RecipeImageCropper
              imageSource={imageSource}
              setCroppedImageBlob={setCroppedImageBlob}
            />
          }
        </Col>
        <Col xs='12'>
          <Button variant='primary' type='submit'>Submit</Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

RecipeForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RecipeForm;
