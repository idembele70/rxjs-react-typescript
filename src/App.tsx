import { useObservable, useObservableCallback, useSubscription } from 'observable-hooks';
import React from 'react';
import { concatAll, count, from, map, Observable, scan, share, switchMap, tap, timer, withLatestFrom } from 'rxjs';
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
function App() {
    const [progressWidth, setProgressWidth] = React.useState(0);
    const [handleClick, click$] = useObservableCallback((e$)=>e$.pipe(
      share()
    ));
    const firstRequest$ = useObservable<string>(()=>timer(1000).pipe(
      map(()=>"First")
    ))
    const secondRequest$ = useObservable<string>(()=>timer(1000).pipe(
      map(()=>"Second")
    ))
    const thirdRequest$ = useObservable<string>(()=>timer(1000).pipe(
      map(()=>"Third")
    ))
    const fourthRequest$ = useObservable<string>(()=>timer(1000).pipe(
      map(()=>"Fourth")
    ))
    const fifthRequest$ = useObservable<string>(()=>timer(1000).pipe(
      map(()=>"Fifth")
    ))
    const observalesArray:Observable<string>[] = [
      firstRequest$,
      secondRequest$,
      thirdRequest$,
      fourthRequest$,
      fifthRequest$
    ]
    const array$ = useObservable<Observable<string>>(()=>from(
      observalesArray
    ))
    const request$ = useObservable<string>(()=>array$.pipe(concatAll()))
    const [message, setMessage] = React.useState<Array<string>>([]);
    const count$ = useObservable<number>(()=>array$.pipe(count()))
    const progress$ = useObservable<string>(()=>click$.pipe(
      switchMap(()=>request$),
     // share(),
      ))
    const ratio$ = useObservable<number>(()=>progress$.pipe(
      tap((v)=>setMessage(vv=>([...vv,v]))),
      scan(acc=>acc + 1,0),
      withLatestFrom(count$),
      map(([current,total])=>current / total * 100),
      tap(newWidth=>setProgressWidth(newWidth))
    ))
    const clicky$ = useObservable<number>(()=>click$.pipe(
      switchMap(()=> ratio$)
    ))
    useSubscription(clicky$)
    useSubscription(progress$)
  React.useEffect(()=>{})
  return (<Container>
    <Progress width={progressWidth}/>
    <Button onClick={(e)=>{
      setMessage([])
      setProgressWidth(0)
      handleClick(e)
      }}>Load Data</Button>
    {message.map(
      (msg,idx)=><Message key={idx}>{msg}</Message>
    )}
  </Container>
  );
}

export default App;
