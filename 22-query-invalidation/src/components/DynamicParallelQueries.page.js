import React from 'react'
import { useQueries } from "react-query"
import axios from 'axios'

const fetchSuperHero = (heroId) => {
	return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const DynamicParallelQueriesPage = ({heroIds}) => {
	console.log(heroIds)
	const queryResults = useQueries(
		heroIds.map((heroId) => {
			return {
				queryKey: ['super-hero', heroId],
				queryFn: (() => fetchSuperHero(heroId))
			}
		})
	)

	console.log('queryResults: ', {queryResults})

	return (
		<div>Dynamic Parallel Queries</div>
	)
}
