import { useObservable, useSubscription } from 'observable-hooks';
import React from 'react'
import { fromEvent, map, scan, share, switchMap, tap } from 'rxjs';
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
    map(()=>Math.round(document.documentElement.scrollTop * 100 / (document.documentElement.offsetHeight - document.documentElement.clientHeight))),
    map(Math.round)
    ),
  )
  useSubscription(scroll$,setProgressWidth)
  return (
    <>
    <ProgressIndicator  width={progressWidth}/>
    <ExtendsPage/>
    </>
  )
}

export default ScrollIndicator