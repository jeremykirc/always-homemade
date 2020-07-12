import PropTypes from 'prop-types';
import React from 'react';

const RecipePhotoUploader = ({ setImageSource }) => (
  <input
    type='file'
    accept='image/*'
    onChange={(e) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener('load', () => setImageSource(reader.result));
        reader.readAsDataURL(e.target.files[0]);
      }
    }}
  />
);

RecipePhotoUploader.propTypes = {
  setImageSource: PropTypes.func.isRequired,
};

export default RecipePhotoUploader;
