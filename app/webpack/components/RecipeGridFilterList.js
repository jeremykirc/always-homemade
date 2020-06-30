import React from 'react';
import { Col, Row } from 'react-bootstrap';

import RecipeGridFilter from './RecipeGridFilter';
import RecipeGridSearch from './RecipeGridSearch';

const RecipeGridFilterList = () => {
  return (
    <Row>
      <Col xs='6' className='recipe-group-filters-container'>
        <ul>
          <RecipeGridFilter displayText='All' />
          <RecipeGridFilter displayText='Only Mine' group='OWN' />
          <RecipeGridFilter displayText='Favorites' group='FAVORITES' />
        </ul>
      </Col>
      <Col xs='6' className='recipe-search-container'>
        <RecipeGridSearch />
      </Col>
    </Row>
  );
};

export default RecipeGridFilterList;
