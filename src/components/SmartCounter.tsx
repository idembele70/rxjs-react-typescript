import { useObservable, useObservableState } from 'observable-hooks';
import React from "react";
import { map, scan, switchMap, takeWhile, tap, timer } from 'rxjs';
import styled from 'styled-components';
const Input = styled.input`
  height: 20px;
  width: 115px;
  margin-top: 20px;
  `;
const Counter = styled.h2`
width: 115px;
  font-size:2rem;
  text-align: center;
`;
const SmartCounter = () => {
  const [endRange, setendRange] = React.useState(0);
  const [startRange, setStartRange] = React.useState(0);
  const handleKeyDown = (ev:React.KeyboardEvent<HTMLInputElement>) => { 
    if(ev.code === "Enter")
    setendRange(ev.currentTarget.valueAsNumber)
   }
   const enter$ = useObservable(inp$=>inp$.pipe(
     switchMap(([endRange, startRange])=> timer(0).pipe(
       map(()=> startRange < endRange ? 1 : -1),
       scan(
         (acc,cur)=>acc + cur,startRange
       ),
       takeWhile((currentValue)=> startRange < endRange ?
       currentValue <= endRange : currentValue >= endRange
       )
     )),
     tap((endValue)=>setStartRange(endValue))
   ),[endRange, startRange])

  
  return (
    <>
    <Input onKeyDown={handleKeyDown} type="number"/>
    <Counter>{useObservableState(enter$,0)}</Counter>
    </>
  )
}

export default SmartCounter