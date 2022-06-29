import { useObservable, useObservableCallback, useSubscription } from 'observable-hooks';
import React from 'react';
import { concatAll, count, delay, from, map, of, scan, share, switchAll, switchMap, withLatestFrom } from 'rxjs';
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
  const [progressWidth, setProgressWidth] = React.useState<number>(0);
  const [messages, setMessages] = React.useState<string[]>([]);
  const [handleClick, click$] = useObservableCallback(e$=>e$);
  const first$ = useObservable(()=>of("First").pipe(delay(1000)))
  const second$ = useObservable(()=>of("Second").pipe(delay(1000)))
  const third$ = useObservable(()=>of("Third").pipe(delay(1000)))
  const fourth$ = useObservable(()=>of("Fourth").pipe(delay(1000)))
  const fifth$ = useObservable(()=>of("Fifth").pipe(delay(1000)))
  const array$ = useObservable(()=>from([first$,
    second$,
    third$,
    fourth$,
    fifth$]))
    const request$ = useObservable(()=>array$.pipe(concatAll()))
    const progress$ = useObservable(()=>click$.pipe(
      switchMap(()=>request$),
      share()
    ))
    const count$ = useObservable(()=>array$.pipe(count()))
    const ratio$ = useObservable(()=>progress$.pipe(
      scan((acc)=>acc + 1 ,0),
      withLatestFrom(count$),
      map(([current, total])=> current / total * 100),
    ))
    const clicky$ = useObservable(()=>click$.pipe(
      switchMap(()=>ratio$)
    ))
    useSubscription(progress$, newMessage=>setMessages([...messages,newMessage]))
    useSubscription(clicky$, newWidth=>setProgressWidth(newWidth))
  return (
    <>
    <Progress width={progressWidth} />
    <Button onClick={handleClick}>Load Data</Button>
    {
      messages.map((msg,idx)=>
      <Message key={idx}>{msg}</Message>
      )
    }
    </>
  )
}

export default ProgressBar