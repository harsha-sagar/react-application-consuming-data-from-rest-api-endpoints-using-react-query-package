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
			refetchInterval: false,
			// by default set to false
			// can be set to time interval (milliseconds), which signfies for every that time interval, data is refetched
			// eventhough if it is configured, data refetching is not achieved in the window looses its focus

			refetchIntervalInBackground: false,
			// by default refetchIntervalInBackground is set to false
			// incase data refetching need to be achieved irrespective of window focus is on or off, then set 'refetchIntervalInBackground' to true
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
