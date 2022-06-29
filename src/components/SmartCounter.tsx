import { pluckCurrentTargetValue, useObservable, useObservableCallback, useObservableGetState, useObservableState, useSubscription } from 'observable-hooks';
import React from 'react';
import { filter, map, Observable, pluck, scan, startWith, switchMap, takeWhile, tap, timer } from 'rxjs';
import styled from 'styled-components';
const Input = styled.input`
  height: 20px;
  width: 115px;
  margin-top: 20px;
  `;
const Count = styled.h2`
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