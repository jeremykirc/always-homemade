import React from 'react';
import ReactCrop from 'react-image-crop';
import { shallow } from 'enzyme';
import RecipeImageCropper from '../../../components/recipe-form/RecipeImageCropper';
import { getCroppedImg } from '../../../helpers/crop-image';

jest.mock('../../../helpers/crop-image');

describe('RecipeImageCropper', () => {
  it('should pass the image source to the react cropper', () => {
    const imageSource = 'fake-image-source';

    const wrapper = shallow(<RecipeImageCropper
      imageSource={imageSource}
      setCroppedImageBlob={jest.fn()}
    />);

    const reactCropElem = wrapper.find(ReactCrop);
    expect(reactCropElem.props()).toHaveProperty('src', imageSource);
  });

  it('should set the crop data when the image loads', () => {
    const setCroppedImageBlob = jest.fn();
    const imageBlob = 'fake-image-blob';
    getCroppedImg.mockResolvedValue(imageBlob);

    const wrapper = shallow(<RecipeImageCropper
      imageSource="fake-image-source"
      setCroppedImageBlob={setCroppedImageBlob}
    />);

    const { onImageLoaded, crop: originalCropData } = wrapper.find(ReactCrop).props();
    expect(originalCropData).toEqual({});

    const imageData = { width: 20, height: 20 };
    onImageLoaded(imageData);

    // Note: Need to find the ReactCrop element a second time here, as it is a new instance due to
    // re-rendering after onImageLoaded calles a callback which came from useState.
    const { crop: newCropData } = wrapper.find(ReactCrop).props();
    expect(newCropData).toEqual({ width: imageData.width, aspect: 1 });
  });

  it('should set the crop data onChange', () => {
    const setCroppedImageBlob = jest.fn();
    const imageBlob = 'fake-image-blob';
    getCroppedImg.mockResolvedValue(imageBlob);

    const wrapper = shallow(<RecipeImageCropper
      imageSource="fake-image-source"
      setCroppedImageBlob={setCroppedImageBlob}
    />);

    const { onChange, crop: originalCropData } = wrapper.find(ReactCrop).props();
    expect(originalCropData).toEqual({});

    const percentCrop = { unit: '%' };
    onChange({}, percentCrop);

    // Note: Need to find the ReactCrop element a second time here, as it is a new instance due to
    // re-rendering after onImageLoaded calles a callback which came from useState.
    const { crop: newCropData } = wrapper.find(ReactCrop).props();
    expect(newCropData).toEqual(percentCrop);
  });

  it('should call setCroppedImageBlob when cropping is complete', async () => {
    const setCroppedImageBlob = jest.fn();
    const imageBlob = 'fake-image-blob';
    getCroppedImg.mockResolvedValue(imageBlob);

    const wrapper = shallow(<RecipeImageCropper
      imageSource="fake-image-source"
      setCroppedImageBlob={setCroppedImageBlob}
    />);

    const { onImageLoaded } = wrapper.find(ReactCrop).props();
    const imageData = { width: 20, height: 20 };
    onImageLoaded(imageData);

    // Note: Need to find the ReactCrop element a second time here, as it is a new instance due to
    // re-rendering after onImageLoaded calles a callback which came from useState.
    const { onComplete } = wrapper.find(ReactCrop).props();
    const cropData = { width: 10, height: 10 };
    await onComplete(cropData);

    expect(getCroppedImg).toHaveBeenCalledWith(imageData, cropData);
    expect(setCroppedImageBlob).toHaveBeenCalledWith(imageBlob);
  });
});
