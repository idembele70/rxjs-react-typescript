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
  const [handleChange, change$] = useObservableCallback(e$=>e$.pipe(
    debounceTime(500),
    pluck("target","value"),
    distinctUntilChanged(),
    share()
  ));
  const [isSaving, setIsSaving] = React.useState(false);
  const saving$ = useObservable(()=> change$.pipe(
    map(()=>of("saving")),
    tap(()=>setIsSaving(true)),
    
  ))
  const saved$ = useObservable(()=>change$.pipe(
    tap(()=>setIsSaving(false)),
    filter(()=> !isSaving),
    map(()=>concat(
      of("Saved").pipe(delay(1500)),
      of(`Last updated: ${new Date().toLocaleString()}`).pipe(delay(1000)),
    ))
  ))
  const saveStatus$ = useObservable(()=>merge(saving$,saved$).pipe(
    switchAll()
  ))
  return (
    <>
    <Title>Take a note!</Title>
    <InputContainer>
    <Input onChange={handleChange}/>
    <SaveInfo>{useObservableState(saveStatus$,"All changes saved")}</SaveInfo>
    </InputContainer>
    </>
  )
}

export default SaveIndicator