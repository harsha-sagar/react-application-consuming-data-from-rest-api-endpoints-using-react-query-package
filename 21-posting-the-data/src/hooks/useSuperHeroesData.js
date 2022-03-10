import { useMutation, useQuery } from "react-query"
import axios from 'axios'

const fetchSuperHeroes = () => {
	return axios.get('http://localhost:4000/superheroes')
}

const addSuperHero = (hero) => {
	return axios.post(
		'http://localhost:4000/superheroes',
		hero
	)
}

export const useSuperHeroesData = (onSuccess, onError) => {

	return useQuery(
		'super-heroes', 
		fetchSuperHeroes,
		{
			onSuccess: onSuccess,
			onError: onError,
		}
	)
}

export const useAddSuperHeroData = () => {
	return useMutation(addSuperHero)
}
