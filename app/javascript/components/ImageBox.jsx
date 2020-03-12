import React from 'react';
import Col from 'react-bootstrap/Col';

class ImageBox extends React.Component {
  render() {
    return (
      <Col className='image-box-container' sm='6' md='4' lg='3'>
        <div
          style={{ backgroundImage: `url(${this.props.imageInfo['url']})` }}
          className='image-box'
          onClick={() => this.props.handleImageBoxClick(this.props.imageInfo)}
        >
        </div>
        <div className='image-info'>
          <div className='image-title'>{this.props.imageInfo['title']}</div>
          <div className='image-desc'>{this.props.imageInfo['description']}</div>
        </div>
      </Col>
    )
  }
}

export default ImageBox
