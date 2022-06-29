import React from 'react';
import styled from 'styled-components';
import ProgressBar from './components/ProgressBar';

const Container = styled.div`
  width: 100vw;
  box-sizing: border-box;
`;
// horizontal scoll indicator
const ExtendsPage = styled.div`
  height:200vh;
`;
interface ProgressProps {
  width:number
}
const ProgressIndicator = styled.div<ProgressProps>`
  position:sticky;
  top: 0;
  width:${props => props.width}%;
  height: 10px;
  background-color: #FF145C;
  transition: all 350ms linear;
`;

function App() {
 
  React.useEffect(()=>{})
  return (<Container>
    <ProgressBar/>
  </Container>
  );
}

export default App;
