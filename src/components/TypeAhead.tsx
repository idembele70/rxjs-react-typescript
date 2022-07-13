import { useObservable, useObservableCallback, useSubscription } from 'observable-hooks';
import React from 'react'
import { debounceTime, distinctUntilChanged, EMPTY, filter, fromEvent, map, pluck, switchMap, tap, timer } from 'rxjs';
import styled from 'styled-components';

const Container = styled.div`
  padding: 15px;
`;

const Title = styled.h5`
  display:inline;
  margin-right: 15px;
`;
const Input = styled.input`
  height:25px;
  width: 180px;
  `;
  const Hr = styled.hr`
    margin: 15px 0;
    max-width: 50%;
  `;
  const ContinentList = styled.ul`
    list-style-type: none;
    padding: 0;
  `;
  const Continent = styled.li`
    
  `;
  const Loader = styled.div`
    
  `;
const TypeAhead = () => {
  const continentsDB = React.useMemo(() => [
    "africa",
    "antartica",
    "asia",
    "australia",
    "europe",
    "north america",
    "south america",
    "africa",
    "antartica",
    "asia",
    "australia",
    "europe",
    "north america",
    "south america",
    "africa",
    "antartica",
    "asia",
    "australia",
    "europe",
    "north america",
    "south america",
    "africa",
    "antartica",
    "asia",
    "australia",
    "europe",
    "north america",
    "south america",
    "africa",
    "antartica",
    "asia",
    "australia",
    "europe",
    "north america",
    "south america",
    "africa",
    "antartica",
    "asia",
    "australia",
    "europe",
    "north america",
    "south america",
    "africa",
    "antartica",
    "asia",
    "australia",
    "europe",
    "north america",
    "south america",
    "africa",
    "antartica",
    "asia",
    "australia",
    "europe",
    "north america",
    "south america",
    "africa",
    "antartica",
    "asia",
    "australia",
    "europe",
    "north america",
    "south america",
    "africa",
    "antartica",
    "asia",
    "australia",
    "europe",
    "north america",
    "south america",
  ], [])
  const [searchDB, setSearchDB] = React.useState<string[]>([]);
  const [continents, setContinents] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [handleChange, change$] = useObservableCallback(e$=>e$.pipe(
    debounceTime(300),
    pluck("target","value"),
    distinctUntilChanged(),
    tap(()=>setContinents([])),
    filter((searchTerm:any)=>searchTerm?.length > 0),
    tap(()=>setLoading(true)),
    switchMap((searchTerm)=>timer(750).pipe(
      tap(()=>{
        const searchedContinents:string[] = continentsDB.filter(
        continent=>continent.includes(searchTerm as string)
        )
        setSearchDB(searchedContinents)
        setContinents(searchedContinents.slice(0,44))
        setLoading(false)
      })
    ))
  ));
  const scroll$ = useObservable(()=>fromEvent(document,"scroll").pipe(
    map(()=>{
      const {clientHeight,scrollHeight,scrollTop} = document.documentElement
      const scrollMaxHeight = scrollHeight - clientHeight
      const scrollPostion = Math.round(scrollTop)
      if(scrollMaxHeight <= scrollPostion){
        return true
      }
      return false
    })
  ))
  useSubscription(change$)
  useSubscription(scroll$,(v)=> {
    if(v){
      setContinents(searchDB.slice(0,continents.length + 10))
    }
  })
  return (
    <Container>
      <Title>Get continents</Title>
      <Input onChange={handleChange}/>
      <Hr/>
      <ContinentList>
      {
      loading ? <Loader>Loading ...</Loader> : 
      continents.map((continent,idx)=><Continent key={idx}>{continent}</Continent>)}
      </ContinentList>
    </Container>
  )
}

export default TypeAhead