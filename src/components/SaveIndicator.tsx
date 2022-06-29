import { pluckCurrentTargetValue, useObservable, useObservableCallback, useObservableState } from 'observable-hooks';
import React from 'react'
import { concat, debounceTime, delay, distinctUntilChanged, distinctUntilKeyChanged, filter, map, merge, mergeMap, Observable, of, pluck, share, switchAll, switchMap, tap, timer } from 'rxjs';
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
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [handleChange, change$] = useObservableCallback(e$=>e$.pipe(
    debounceTime(500),
    pluck("target","value"),
    distinctUntilChanged(),
  ));
  const saveInProgress$ = useObservable<Observable<string>>(()=>change$.pipe(
    map(()=>of("saving")),
    tap(()=>setIsSaving(true))
  ))
  const saveCompleted$ = useObservable<Observable<string>>(()=>change$.pipe(
    mergeMap((v)=>of(v).pipe(delay(1500))),
    tap(()=>setIsSaving(false)),
    filter(()=>isSaving === false),
    map(()=>concat(
      of('saved'),
      timer(1500).pipe(
        map(()=>`Last updated: ${new Date().toLocaleString()}`)
      )
    ))
  ))
  const merged$ = useObservable<string>(()=> merge(saveInProgress$, saveCompleted$).pipe(switchAll()))
  return (
    <>
    <Title>SaveIndicator</Title>
    <SubTitle>Take a note</SubTitle>
    <InputContainer>
    <Input onChange={handleChange} />
    <SaveInfo>{useObservableState(merged$,"All Changes saved")}</SaveInfo>
    </InputContainer>
    </>
  )
}

export default SaveIndicator