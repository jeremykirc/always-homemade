import { getCroppedImg } from '../../helpers/crop-image';

describe('getCroppedImage', () => {
  let canvas;
  let ctx;
  let image;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    image = document.createElement('img');

    global.URL.createObjectURL = jest.fn().mockReturnValue('http://object.url');
    jest.spyOn(document, 'createElement').mockReturnValue(canvas);
    jest.spyOn(canvas, 'getContext').mockReturnValue(ctx);
    jest.spyOn(ctx, 'drawImage');
    jest.spyOn(canvas, 'toBlob');
  });

  it('should create a blob url from the cropped image', async () => {
    const crop = {
      x: 1,
      y: 2,
      width: 10,
      height: 10,
    };
    Object.defineProperties(image, {
      naturalHeight: { value: 100 },
      naturalWidth: { value: 200 },
      height: { value: 50 },
      width: { value: 100 }
    });
    canvas.toBlob.mockImplementation((cb) => cb({}));

    const blobUrl = await getCroppedImg(image, crop, 'foo.jpg');

    expect(blobUrl).toBe('http://object.url');
    expect(ctx.drawImage).toHaveBeenCalledWith(
      image, 2, 4, 20, 20, 0, 0, 10, 10
    );
    expect(window.URL.createObjectURL).toHaveBeenCalledWith({
      name: 'foo.jpg'
    });
  });

  it('should reject if the canvas is empty', () => {
    const crop = {
      x: 1,
      y: 2,
      width: 10,
      height: 10,
    };
    canvas.toBlob.mockImplementation((cb) => cb());

    const resultPromise = getCroppedImg(image, crop, 'foo.jpg');
    expect(resultPromise).rejects.toThrow();
  });
});
