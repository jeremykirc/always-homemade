import { getCroppedImg } from '../../helpers/crop-image';

describe('getCroppedImage', () => {
  let canvas;
  let ctx;
  let image;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    image = document.createElement('img');

    jest.spyOn(document, 'createElement').mockReturnValue(canvas);
    jest.spyOn(canvas, 'getContext').mockReturnValue(ctx);
    jest.spyOn(ctx, 'drawImage');
    jest.spyOn(canvas, 'toBlob');
  });

  it('should create a blob from the cropped image', async () => {
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

    const blob = await getCroppedImg(image, crop);

    expect(blob instanceof Blob).toBeTruthy();
    expect(ctx.drawImage).toHaveBeenCalledWith(
      image, 2, 4, 20, 20, 0, 0, 10, 10
    );
  });

  it('should reject if the canvas is empty', () => {
    const crop = {
      x: 1,
      y: 2,
      width: 10,
      height: 10,
    };

    const resultPromise = getCroppedImg(image, crop);
    expect(resultPromise).rejects.toThrow();
  });
});
