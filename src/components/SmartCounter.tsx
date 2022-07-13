import { useObservable, useObservableState } from 'observable-hooks';
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
  const handleChange = (e:React.KeyboardEvent<HTMLInputElement>) => { 
    if(e.code === "Enter")
    setEndCount(e.currentTarget.valueAsNumber)
   }
   const count$ = useObservable((input$)=>input$.pipe(
    switchMap(([startCount,endCount])=>timer(0).pipe(
      map(()=>startCount < endCount ? 1 : -1),
      startWith(startCount),
      scan((acc,cur)=>acc + cur),
      takeWhile((v)=>{
        if(startCount > endCount)
        return v > endCount
        else
        return v < endCount
      }),
      tap((v)=>setStartCount(v)),
    ))
   ) ,[startCount,endCount])
  return (
    <>
    <Input type="number" onKeyUp={handleChange}/>
    <Counter>{useObservableState(count$,0)}</Counter>
    </>
  )
}

export default SmartCounter