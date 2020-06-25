import PropTypes from 'prop-types';
import React from 'react';
import { Col } from 'react-bootstrap';

import { ImageInfoPropType } from '../helpers/shared-prop-types';

const ImageBox = ({ handleImageBoxClick, imageInfo }) => (
  <Col className='image-box-container' sm='6' md='4' lg='3'>
    <div
      style={{ backgroundImage: `url(${imageInfo['url']})` }}
      className='image-box'
      onClick={() => handleImageBoxClick(imageInfo)}
    >
    </div>
    <div className='image-info'>
      <div className='image-title'>{imageInfo.title}</div>
      <div className='image-desc'>{imageInfo.description}</div>
    </div>
  </Col>
);

ImageBox.propTypes = {
  handleImageBoxClick: PropTypes.func.isRequired,
  imageInfo: ImageInfoPropType.isRequired,
};

export default ImageBox;