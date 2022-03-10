import { useMutation, useQuery, useQueryClient } from "react-query"

import { request } from '../utils/axios-utils'


const fetchSuperHeroes = () => {
	return request(
		{
			url: '/superheroes'
		}
	)
}

const addSuperHero = (hero) => {
	return request(
		{
			url: '/superheroes', method: 'post', data: hero
		}
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
	const queryClient = useQueryClient()
	return useMutation(addSuperHero, {
		onMutate: async (newHero) => {
			const previousData = queryClient.getQueryData('super-heroes')

			await queryClient.cancelQueries('super-heroes')

			queryClient.setQueryData(
				'super-heroes',
				(oldQueryData) => {
					return {
						...oldQueryData,
						data: [
							...oldQueryData.data,
							{id: oldQueryData.data.length + 1, ...newHero}
						]						
					}
				}
			)			

			return {
				previousData
			}
		},

		onError: (_error, _hero, context) => {
			queryClient.setQueryData(
				'super-heroes',
				context.previousData
			)
		},

		onSettled: () => {
			queryClient.invalidateQueries('super-heroes')
		}
	})
}
