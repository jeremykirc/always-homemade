import { loaded, loading } from '../../actions/preloader';

describe('loaded', () => {
  it('should generate loaded action object', () => {
    const action = loaded();
    expect(action).toEqual({
      type: 'LOADED'
    });
  });
});

describe('loading', () => {
  it('should generate loaded action object', () => {
    const action = loading();
    expect(action).toEqual({
      type: 'LOADING'
    });
  });
});
