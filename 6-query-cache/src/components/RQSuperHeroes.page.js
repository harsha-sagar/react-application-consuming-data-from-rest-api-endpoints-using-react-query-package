import { useQuery } from "react-query"
import axios from 'axios'

const fetchSuperHeroes = () => {
	return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
	const {isLoading, data, isError, error, isFetching } = useQuery(
		'super-heroes', 
		fetchSuperHeroes,
		// by default cache expiry duration is 5 min. If required can be configured, explicitly passing as 3rd parameter to useQuery
		{
			cacheTime: 5000 // 5 seconds
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
