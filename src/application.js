
/**
 * Module dependencies.
 */

import React, { Component } from 'react';
import styled from 'styled-components';

/**
 * Container.
 */

const Wrapper = styled.div`
  align-items: center;
  box-sizing: border-box;
  background-color: #f7f7f7;
  flex-direction: column;
  font-family: sans-serif;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  overflow: auto;
  padding: 0 80px;
`;

/**
 * App component.
 */

class App extends Component {

  render() {
    return (
      <Wrapper>
        {'Hey'}
      </Wrapper>
    );
  }

}

/**
 * Export App.
 */

export default App;
