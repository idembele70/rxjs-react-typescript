import { useObservable, useObservableCallback, useObservableState, useSubscription } from 'observable-hooks';
import React from 'react';
import { concat, debounceTime, delay, distinctUntilChanged, filter, map, merge, of, pluck, share, switchAll, tap, timer } from 'rxjs';
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
  const [isSaving, setIsSaving] = React.useState(false);
  const [handleChange, change$] = useObservableCallback(e$=>e$.pipe(
    debounceTime(500),
    pluck("target","value"),
    distinctUntilChanged(),
    //share()
  ));
  const saveInProgress$ =  useObservable(
    ()=>change$.pipe(
      map(()=>of("saving")),
      tap(()=>setIsSaving(true))
    )
  )
  const saveCompleted$ = useObservable(()=>change$.pipe(
    tap(()=> setIsSaving(false)),
    filter(()=>isSaving === false),
    map(()=>concat(
      of("saved").pipe(delay(1000)),
      of(`Last updated ${new Date().toDateString()}`).pipe(delay(1000))
    ))
  ))
  const saveMerge$  = useObservable(()=>merge(saveInProgress$,saveCompleted$).pipe(switchAll()))
     // useSubscription(saveMerge$,console.log)
  return (
    <>
    <Title>SaveIndicator</Title>
    <SubTitle>Take a note</SubTitle>
    <InputContainer onChange={handleChange}>
    <Input />
    <SaveInfo>{useObservableState(saveMerge$,"All Changes saved")}</SaveInfo>
    </InputContainer>
    </>
  )
}

export default SaveIndicator