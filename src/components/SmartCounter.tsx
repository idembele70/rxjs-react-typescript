import { useObservable, useObservableState, useSubscription } from 'observable-hooks';
import React from "react";
import { map, scan, startWith, switchMap, takeWhile, tap, timer } from 'rxjs';
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

  const [endCount, setEndCount] = React.useState(0);
  const [startCount, setStartCount] = React.useState(0);
  const takeUntilFunc = (endRange:number, currentNumber:number) => {
    return endRange > currentNumber
      ? (val:number) => val <= endRange
      : (val:number) => val >= endRange;}
  const handleChange = (e:React.KeyboardEvent<HTMLInputElement>) => { 
    if(e.code === "Enter"){
      setEndCount(e.currentTarget.valueAsNumber)
    }
  }
   const enter$ = useObservable(input$=>input$.pipe(
    switchMap(([startCount,endCount])=>timer(0).pipe(
      map(()=> startCount > endCount ? -1 : 1),
      startWith(startCount),
      scan((acc,cur)=> {
      return  acc + cur
      }),
      takeWhile((value)=> startCount > endCount ? value >= endCount : value <= endCount)
    )),
    tap(v=>setStartCount(v))
   ),[startCount,endCount])
  return (
    <>
    <Input type="number" onKeyUp={handleChange} />
    <Counter>{useObservableState(enter$,0)}</Counter>
    </>
  )
}

export default SmartCounter