import { pluckCurrentTargetValue, useObservable, useObservableCallback, useObservableState, useSubscription } from 'observable-hooks';
import { distinctUntilChanged, filter, map, pluck, repeat, scan, share, startWith, switchMap, take, takeWhile, tap, timer } from 'rxjs';
import styled from 'styled-components';
import React, { KeyboardEvent } from "react"
import { createInputFiles } from 'typescript';
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
  const inputEl = React.useRef<HTMLInputElement | null >(null)
  const [currentCounter, setCurrentCounter] = React.useState<number>(0);
  const [endValue, setEndValue] = React.useState(0);
  const handleKeyUp = (e:React.KeyboardEvent<HTMLInputElement>) => { 
    if(e.code === "Enter"){
      setEndValue(e.currentTarget.valueAsNumber)
    }
   }
   const takeUntilFunc = (endRange:number, currentNumber:number) => {
    return endRange > currentNumber
      ? (val:number) => val <= endRange
      : (val:number) => val >= endRange;}
   const enter$ = useObservable(input$=>input$.pipe(
    switchMap(([endValue,currentCounter])=> timer(0,20).pipe(
      map(()=>currentCounter < endValue ? 1 : -1),
      scan((acc,cur)=> acc+ cur,currentCounter),
    takeWhile(takeUntilFunc(endValue,currentCounter))
     )),
     tap(v=>setCurrentCounter(v)),
      startWith(currentCounter)
   ),[endValue,currentCounter])
  
  const count =  useObservableState(enter$,0)
  
  return (
    <>
    <Input ref={inputEl} onKeyUp={handleKeyUp} type="number"/>
    <Counter>{count}</Counter>
    </>
  )
}

export default SmartCounter