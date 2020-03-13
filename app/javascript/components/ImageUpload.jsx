import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginImageEdit);

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  handleInit = () => {
    console.log('FilePond instance has initialised', this.pond);
  }

  render() {
    return(
      <FilePond
        ref={ref => this.pond = ref}
        files={this.state.files}
        allowMultiple={false}
        allowImageEdit={true}
	server='/upload'
	instantUpload={false}
        imageCropAspectRatio='1:1'
	oninit={this.handleInit}
        onupdatefiles={(fileItems) => {
	  this.setState({
	    files: fileItems.map(fileItem => fileItem.file)
	  });
        }}
        labelIdle="Drag & Drop your files or <span class='filepond--label-action'>Browse</span>"
      />
    )
  }
}

export default ImageUpload
