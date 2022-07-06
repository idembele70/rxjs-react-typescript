import { useObservable, useObservableCallback, useSubscription } from 'observable-hooks';
import React from 'react';
import { concatAll, count, delay, from, map, of, scan, share, switchMap, tap, withLatestFrom } from 'rxjs';
import styled from 'styled-components';

interface ProgressProps {
  width: number
}
const Progress = styled.div<ProgressProps>`
  border: 1px solid pink;
  height: 20px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width:95vw;
  max-width: 700px;
  position: relative;
  border: 1px solid #FF06F7;
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
  cursor: pointer;
  transition: background-color 350ms linear;
  &:hover {
    color:white;
    background-color: black;
  }
`;

const Message = styled.div`
text-align: center;
`;
const ProgressBar = () => {
  const [handleClick, click$] = useObservableCallback(e$=>e$);
  const array$ = useObservable(()=>from(
    [
      of("first").pipe(delay(1000)),
      of("second").pipe(delay(1000)),
      of("third").pipe(delay(1000)),
      of("fourth").pipe(delay(1000)),
      of("fifth").pipe(delay(1000))
    ]
  ))
  const request$ = useObservable(()=>array$.pipe(concatAll()))
  const [messages, setMessages] = React.useState<string[]>([]);
  const message$ = useObservable(()=>click$.pipe(
    switchMap(()=>request$),
    share()
  ))
  const count$ =  useObservable(()=> array$.pipe(count()))
  const ratio$ = useObservable(()=>message$.pipe(
    scan((current)=>current + 1,0),
    withLatestFrom(count$),
    map(([current,total])=> current * 100 / total),
    tap(newWidth=>setProgressWidth(newWidth))
  ))
  const clicky$ = useObservable(()=>click$.pipe(switchMap(()=>ratio$)))
  useSubscription(clicky$,console.log)
  useSubscription(message$,(message)=> setMessages(oldMessages=>[...oldMessages,message]))
  const [progressWidth, setProgressWidth] = React.useState(0);
  return (
    <>
    <Progress width={progressWidth} />
    <Button onClick={handleClick}>Load Data</Button>
    {messages.map(
      (message,idx)=><Message key={idx}>{message}</Message>
    )}
    </>
  )
}

export default ProgressBar