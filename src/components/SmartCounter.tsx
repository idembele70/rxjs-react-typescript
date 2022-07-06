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
  return (
    <>
    </>
  )
}

export default SmartCounter