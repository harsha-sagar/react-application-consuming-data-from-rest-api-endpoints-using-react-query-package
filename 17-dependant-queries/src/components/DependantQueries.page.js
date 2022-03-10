import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchUserByEmail = (userEmail) => {
	return axios.get(`http://localhost:4000/users/${userEmail}`)
}

const fetchChannelByName = (channelName) => {
	return axios.get(`http://localhost:4000/channels/${channelName}`)
}


export const DependantQueriesPage = ({email}) => {
	const {data: user} = useQuery(
		['user', email],
		() => fetchUserByEmail(email)
	)

	const channelName = user?.data.channelId

	useQuery(
		['courses', channelName],
		() => fetchChannelByName(channelName),
		{
			enabled: !!channelName
		}
	)

	return (
		<div>Dependant Queries</div>
	)
}
