import React from 'react'
import { pluckCurrentTargetValue, useObservable, useObservableCallback, useObservableState } from 'observable-hooks';
import { concat, debounceTime, delay, distinctUntilChanged, filter, map, merge, of, pluck, share, switchAll, tap } from 'rxjs';
import styled from 'styled-components';

const Title = styled.h1``;
const SubTitle = styled.h2`
margin-bottom:10px;`;
const InputContainer = styled.div`
  display: flex;
  width: 350px;
  flex-direction: column;
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 25px;
  border-radius: 5px;
  border: 2px solid #6B6B6B;
  outline-width: 0px;
  &:focus {
    outline-color: transparent;
    border: 2px solid #428DF0;
  }
`;
const SaveInfo = styled.h4`
  align-self: flex-end;
  margin-top: 5px;
`;
const SaveIndicator = () => {
  return (
    <></>
  )
}

export default SaveIndicator