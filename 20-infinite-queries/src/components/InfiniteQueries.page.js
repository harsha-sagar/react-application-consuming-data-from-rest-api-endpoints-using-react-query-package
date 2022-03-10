import React, { Fragment } from 'react'
import { useInfiniteQuery } from "react-query"
import axios from 'axios'

const fetchColors = ({pageParam = 1}) => {
	return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

export const InfiniteQueriesPage = () => {

	const { isLoading,  data,  isError,  error, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
		'colors', 
		fetchColors,
		{
			getNextPageParam: (_lastPage, pages) => {
				if (pages.length < 4){
					return (pages.length + 1)
				} else {
					return undefined
				}
			}
		}
	)

  if (isLoading) {
    return <h2>Loading...</h2>
  }

	if (isError) {
    return <h2>{error.message}</h2>
  }
	console.log(data)
  return (
    <>
			<div>
				{data?.pages.map((group, index) => {
						return (
							<Fragment key={index}>
								{
									group?.data.map(color => {
										return (
											<div key={color.id}>
												<h2>
													{color.id} - {color.label} 
												</h2>												
											</div>
										)
									})
								}
							</Fragment>
						)
					})
				}
			</div>

			<div>
				{
					!isFetching ?
						<button 
							onClick={fetchNextPage} 
							disabled={!hasNextPage}
						>
							Load more...
						</button>
						:
						null
				}
			</div>

			<div>
				{
					(isFetching && !isFetchingNextPage) ? 'Loading...' : null
				}
			</div>
    </>
  )

}
