import { useQuery } from "react-query"
import axios from 'axios'

const fetchSuperHeroes = () => {
	return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
	const {isLoading, data, isError, error, isFetching, refetch } = useQuery(
		'super-heroes', 
		fetchSuperHeroes,
		{
			enabled: false
			// by default 'enabled' set to true
			// indicating not to fire the query immediately on component mount
		}
	)

	console.log(isLoading, isFetching)

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }

	if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>

			{
			/* refetch method comes handy in invoking the query manually on user interaction */
			/* below here shows that query is fired manually on user clicking the button */			
			}
			<button onClick={refetch}>Fetch Heroes</button>

      {data?.data.map(hero => {
        return <div key={hero.name}>{hero.name}</div>
      })}
    </>
  )

}
