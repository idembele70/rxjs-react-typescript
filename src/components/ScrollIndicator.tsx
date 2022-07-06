import { useObservable, useSubscription } from 'observable-hooks';
import React from 'react'
import { fromEvent, map, scan, share, switchMap, tap, throttleTime } from 'rxjs';
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
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollPosition = document.documentElement.scrollTop
      const newWidth = scrollPosition * 100 / scrollHeight 
      setProgressWidth(newWidth)
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