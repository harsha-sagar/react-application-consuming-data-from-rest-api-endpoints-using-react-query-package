import { useState } from "react"
import { Link } from "react-router-dom"
import { useAddSuperHeroData, useSuperHeroesData } from "../hooks/useSuperHeroesData"

const onSuccess = (data) => {
	console.log('perform side effects after data fetching', data)	
}

const onError = (error) => {
	console.log('perform side effects encountered error', error)	
}


export const RQSuperHeroesPage = () => {
	const [name, setName] = useState('')
	const [alterEgo, setAlterEgo] = useState('')

	const {isLoading, data, isError, error, isFetching } = useSuperHeroesData(onSuccess, onError)

	const {mutate: addHero, isError: isErrorOnPost, error: errorOnPost} = useAddSuperHeroData()

	const handleAddHero = () => {
		const hero = {name, alterEgo}
		addHero(hero)
	}
	
	if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }

	if (isError) {
    return <h2>{error.message}</h2>
  }

	if (isErrorOnPost) {
    return <h2>{errorOnPost.message}</h2>
  }

	console.log(data)

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
			<div>
				<input 
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input 
					type="text"
					value={alterEgo}
					onChange={(e) => setAlterEgo(e.target.value)}				
				/>
				<button
					onClick={handleAddHero}
				>Add Hero</button>
			</div>

      {data?.data.map(hero => {
        return (
					<div key={hero.id}>
						<Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
					</div>
				)
      })}

    </>
  )

}
