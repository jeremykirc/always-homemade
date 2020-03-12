import React from 'react';
import Container from 'react-bootstrap/Container';
import ImageBox from './ImageBox';
import ImageModal from './ImageModal';
import Row from 'react-bootstrap/Row';

class ImageGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      imageInfo: {}
    };
  }

  showModal = (imageInfo) => {
    this.setState({ showModal: true, imageInfo: imageInfo });
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    var imageBoxes = this.props.imageGridData.map((imageInfo, i) => {
      return (
        <ImageBox
          key={i}
          imageInfo={imageInfo}
          handleImageBoxClick={this.showModal}
        />
      )
    });

    return (
      <Container className='image-grid'>
	<Row>{imageBoxes}</Row>
        <ImageModal
          show={this.state.showModal}
          imageInfo={this.state.imageInfo}
          handleClose={this.hideModal}
        />
      </Container>
    )
  }
}

export default ImageGrid
