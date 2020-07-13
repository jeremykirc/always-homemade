import PropTypes from 'prop-types';

export const RecipePropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    display_name: PropTypes.string.isRequired,
  }),
  image_url: PropTypes.string.isRequired,
});
