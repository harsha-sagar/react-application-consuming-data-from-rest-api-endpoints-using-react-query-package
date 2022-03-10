import { useSuperHeroesData } from "../hooks/useSuperHeroesData"

const onSuccess = (data) => {
	console.log('perform side effects after data fetching', data)	
}

const onError = (error) => {
	console.log('perform side effects encountered error', error)	
}

export const RQSuperHeroesPage = () => {
	const {isLoading, data, isError, error, isFetching } = useSuperHeroesData(onSuccess, onError)

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

      {data.map(heroName => {
        return <div key={heroName}>{heroName}</div>
      })}
    </>
  )

}
