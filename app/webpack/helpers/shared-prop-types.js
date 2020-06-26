import PropTypes from 'prop-types';

export const RecipePropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
});
