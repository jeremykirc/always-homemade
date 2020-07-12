import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';

import { createRecipe } from '../../api/v1/recipes';
import RecipeImageCropper from './RecipeImageCropper';
import RecipeInstructions from './RecipeInstructions';
import RecipePhotoUploader from './RecipePhotoUploader';

const RecipeForm = ({ history }) => {
  const [imageSource, setImageSource] = useState(null);
  const [croppedImageBlob, setCroppedImageBlob] = useState();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    instructions: [''],
    image: ''
  });

  const handleInputChange = ({ target: { name: field, value } }) => {
    setFormData((currentData) => ({ ...currentData, [field]: value }));
  };

  const addNewInstruction = () => {
    setFormData((currentData) => ({
      ...currentData,
      instructions: currentData.instructions.concat(''),
    }));
  };

  const updateInstruction = (index, newValue) => {
    setFormData((currentData) => ({
      ...currentData,
      instructions: currentData.instructions.map((value, i) => (
        index === i ? newValue : value
      )),
    }));
  };

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
              <RecipeInstructions
                addNewInstruction={addNewInstruction}
                instructions={formData.instructions}
                updateInstruction={updateInstruction}
              />
            </Form.Group>
            <Form.Group as={Col} xs='12' controlId='photo'>
              <Form.Label>Photo</Form.Label>
              <RecipePhotoUploader setImageSource={setImageSource} />
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
