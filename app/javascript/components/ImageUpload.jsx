import React from 'react';
import ImageEditor from '@toast-ui/react-image-editor';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  editorTheme = {
  };

  render() {
    return(
      <ImageEditor
	includeUI={{
	  theme: this.editorTheme,
	  menu: ['crop', 'filter'],
	  initMenu: 'crop',
	  uiSize: {
	    width: '1000px',
	    height: '700px'
	  },
	  menuBarPosition: 'bottom'
	}}
	cssMaxHeight={500}
	cssMaxWidth={700}
	selectionStyle={{
	  cornerSize: 20,
	  rotatingPointOffset: 70
	}}
      />
    )
  }
}

export default ImageUpload
