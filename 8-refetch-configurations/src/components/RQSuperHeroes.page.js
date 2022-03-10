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
			refetchOnMount: true,
			// by default refetchOnMount always set to true, which means enabling refetching the data every time component mounts
			// setting to false, disables refetching on component mount
			// can also be set to 'always', which refetches the data irrespective of cached data stale or not

			refetchOnWindowFocus: true
			// by default refetchOnWindowFocus always set to true, which means enabling refetching the data every time window gains focus on
			// setting to false, disables data refetching on window focus
			// can also be set to 'always', which refetches the data on window focus, irrespective of cached data stale or not
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
