import { useObservable, useSubscription } from 'observable-hooks';
import React from 'react';
import { fromEvent, tap, throttleTime } from 'rxjs';
import styled from 'styled-components';

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

const ScrollIndicator = () => {
  const [progressWidth, setProgressWidth] = React.useState(0);
  const scroll$ = useObservable(()=>fromEvent(document,"scroll").pipe(
    throttleTime(20),
    tap(()=>{
      const {offsetHeight,clientHeight,scrollTop:scrollPosition} = document.documentElement
      const scrollMaxHeight = offsetHeight - clientHeight
      const newWidth = scrollPosition * 100 / scrollMaxHeight
      setProgressWidth(Math.round(newWidth))
    })
  ))
  useSubscription(scroll$)
  return (
    <>
    <ProgressIndicator width={progressWidth}/>
    <ExtendsPage/>
    </>
  )
}

export default ScrollIndicator