import React from 'react';
import { shallow } from 'enzyme';
import RecipePhotoUploader from '../../../components/recipe-form/RecipePhotoUploader';

describe('RecipePhotoUploader', () => {
  it('should call setImageSource with the first file loaded by the input', () => {
    const fakeBlob = { blob: 'I am a blob' };
    const setImageSource = jest.fn();

    const readAsDataURL = jest.spyOn(FileReader.prototype, 'readAsDataURL').mockImplementation(() => null);
    const addEventListener = jest.spyOn(FileReader.prototype, 'addEventListener');

    const wrapper = shallow(<RecipePhotoUploader setImageSource={setImageSource} />);
    wrapper.simulate('change', { target: { files: [fakeBlob] } });

    expect(readAsDataURL).toHaveBeenCalledWith(fakeBlob);
    expect(addEventListener).toHaveBeenCalledWith('load', expect.any(Function));

    const eventListener = addEventListener.mock.calls[0][1];
    eventListener();

    expect(setImageSource).toHaveBeenCalled();
  });

  it('should do nothing on change if there are not files', () => {
    const readAsDataURL = jest.spyOn(FileReader.prototype, 'readAsDataURL').mockImplementation(() => null);
    const addEventListener = jest.spyOn(FileReader.prototype, 'addEventListener');

    const wrapper = shallow(<RecipePhotoUploader setImageSource={() => {}} />);
    wrapper.simulate('change', { target: { files: [] } });

    expect(readAsDataURL).not.toHaveBeenCalled();
    expect(addEventListener).not.toHaveBeenCalled();
  });
});
