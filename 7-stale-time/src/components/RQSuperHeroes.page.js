import { useQuery } from "react-query"
import axios from 'axios'

const fetchSuperHeroes = () => {
	return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
	const {isLoading, data, isError, error, isFetching } = useQuery(
		'super-heroes', 
		fetchSuperHeroes,
		{
			// if it is ok serve the cached data & delay the refetching of fresh data, then stateTime need to be configured as below
			// staleTime should be always less than cacheTime
			// default staleTime is 0 seconds
			staleTime: 30000 // 30 seconds
		}
	)

	console.log(isLoading, isFetching)

  if (isLoading) {
    return <h2>Loading...</h2>
  }

	if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {data?.data.map(hero => {
        return <div key={hero.name}>{hero.name}</div>
      })}
    </>
  )

}
