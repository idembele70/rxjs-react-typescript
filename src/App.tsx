import { useObservable, useObservableCallback, useObservableState, useSubscription } from 'observable-hooks';
import React from 'react';
import { concat, debounceTime, delay, distinctUntilChanged, filter, fromEvent, map, merge, mergeMap, Observable, of, pluck, share, switchAll, tap, throttleTime } from 'rxjs';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding-left: 20px;
  box-sizing: border-box;
`;
const Title = styled.h2`
  
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
`;
const Input = styled.input`
height: 32px;
`;
const SaveStatus = styled.h4`
  align-self: flex-end;
  margin: 10px 0;
`;
interface ProgressProps {
  width: number
}
const Progress = styled.div<ProgressProps>`
  border: 1px solid pink;
  height: 20px;
  margin-top: 20px;
  width:95vw;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  &:after {
    content:"";
    position: absolute;
    left: 0;
    width: ${props => props.width}%;
    height: 100%;
    background-color: rgba(${props => props.width === 100 ? "0, 254, 62, 1" : "255, 250, 67, 1"});
    transition: all 350ms linear;
  }
`;
const Button = styled.button`
  max-width: 361px;
  width: 80vw;
  margin: 20px auto;
  display: block;
`;
const Message = styled.div`
text-align: center;
`;
// horizontal scoll indicator
const ExtendsPage = styled.div`
  height:200vh;
`;
const ProgressIndicator = styled.div<ProgressProps>`
  position:sticky;
  top: 0;
  width:${props => props.width}%;
  height: 10px;
  background-color: #FF145C;
  transition: all 350ms linear;
`;
//
function App() {
  const scroll$ = useObservable<number>(()=> fromEvent(document,"scroll").pipe(
    throttleTime(20),
    tap(()=>console.log()),
    map(()=>window.scrollY * 100 / window.innerHeight )
  ))
  const progressWidth = useObservableState<number>(scroll$,0)
  React.useEffect(()=>{})
  return (<Container>
    <ProgressIndicator width={progressWidth}/>
    <Title>Scroll down</Title>
    <ExtendsPage/>
    <Title>Boom</Title>
  </Container>
  );
}

export default App;
