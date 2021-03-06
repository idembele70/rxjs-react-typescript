import React from 'react';
import styled from 'styled-components';
import ProgressBar from './components/ProgressBar';
import SaveIndicator from './components/SaveIndicator';
import ScrollIndicator from './components/ScrollIndicator';
import SmartCounter from './components/SmartCounter';
import TypeAhead from './components/TypeAhead';

const Container = styled.div`
  width: 100vw;
`;


function App() {
 
  React.useEffect(()=>{})
  return (<Container>
    <TypeAhead />
  </Container>
  );
}

export default App;
