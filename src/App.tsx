import { useObservable, useObservableCallback, useObservableState, useSubscription } from 'observable-hooks';
import React from 'react';
import { concat, debounceTime, defer, delay, distinctUntilChanged, EMPTY, filter, map, merge, mergeMap, Observable, of, pluck, share, startWith, switchAll, tap, timer } from 'rxjs';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding-left: 20px;
  box-sizing: border-box;
`;
const Title = styled.h2`
  
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
`;
const Input = styled.input`
height: 32px;
`;
const SaveStatus = styled.h4`
  align-self: flex-end;
  margin: 10px 0;
`;
function App() {

  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [handleChange, change$] = useObservableCallback<string, React.FormEvent<HTMLInputElement>>(e$=>e$.pipe(
    debounceTime(500),
    pluck("target","value"),
    map((v)=>v as string),
    distinctUntilChanged(),
    share()
  ));
  const saveInProgress$ = useObservable<Observable<string>>(
    ()=>{
      return change$.pipe(
      map(()=> of("saving")),
      tap(()=>setIsSaving(true)))
    }
    )
    const saveCompleted$ =  useObservable(
      ()=> saveInProgress$.pipe(
        mergeMap(()=>of(null).pipe(delay(2000))),
        tap(()=>setIsSaving(false)),
        filter(()=>!isSaving),
        map(()=>concat(
          of("saved"),
          EMPTY.pipe(delay(1800)),
          defer(()=> of(`Last save ${new Date().toLocaleTimeString()}`))
        ))
      )
    )
    const merged$ = useObservable(()=>merge(saveCompleted$, saveInProgress$).pipe(
      switchAll()
    ))
    const c = useObservableState(merged$, "All changes saved")
  React.useEffect(()=>{})
  return (<Container>
    <Title>
      Take a note!
    </Title>
    <InputContainer>
    <Input onChange={handleChange}/>
    <SaveStatus>{c}</SaveStatus>
    </InputContainer>
  </Container>
  );
}

export default App;
