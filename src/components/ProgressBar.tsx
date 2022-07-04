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
 
  return (
    <>
    <Button>Load Data</Button>
    </>
  )
}

export default ProgressBar