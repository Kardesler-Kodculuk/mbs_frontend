import React, { useContext, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { QueryContext } from "@mbs/contexts"
import { Query } from "@mbs/interfaces"
import { MBS } from "@mbs/utils"

type props = {
	children: React.ReactNode
}

export async function queryID<T>(endPoint: string): Promise<T> {
	return await axios
		.get<Promise<T>>(`${MBS?.url}${endPoint}`, { withCredentials: true })
		.then((res) => res.data)
}

export async function queryInfo<T>(endPoint: string, IDList: number[]): Promise<T[]> {
	let request: Promise<AxiosResponse<T>>[] = IDList.map((id) =>
		axios.get<T>(`${MBS?.url}${endPoint}/${id}`, { withCredentials: true })
	)
	return await axios.all([...request]).then(axios.spread((...res) => res.map((r) => r.data)))
}

export async function updateInfo<T>(
	endPoint: string,
	ID: number,
	body: { [key: string]: any }
): Promise<T> {
	console.log(`${MBS?.url}${endPoint}/${ID}`)
	console.log(body)
	return await axios
		.patch<Promise<T>>(`${MBS?.url}${endPoint}/${ID}`, body, { withCredentials: true })
		.then((res) => res.data)
}

export async function postAction<T>(endPoint: string, ID: number): Promise<T> {
	return await axios
		.post<Promise<T>>(`${MBS?.url}${endPoint}/${ID}`, { withCredentials: true })
		.then((res) => res.data)
}

export async function postActionWithBody<T>(
	endPoint: string,
	body: { [key: string]: any }
): Promise<T> {
	return await axios
		.post<Promise<T>>(`${MBS?.url}${endPoint}`, body, { withCredentials: true })
		.then((res) => res.data)
}
export async function deleteID<T>(endPoint: string): Promise<T> {
	return await axios
		.delete<Promise<T>>(`${MBS?.url}${endPoint}`, { withCredentials: true })
		.then((res) => res.data)
}
export async function putID<T>(endPoint: string): Promise<T> {
	return await axios
		.put<Promise<T>>(`${MBS?.url}${endPoint}`, {},{ withCredentials: true })
		.then((res) => res.data)
}
export const QueryProvider = (props: props) => {
	const value: Query = {
		queryID,
		queryInfo,
		updateInfo,
		postAction,
		postActionWithBody,
		deleteID,
		putID,
	}

	return <QueryContext.Provider value={value}>{props.children}</QueryContext.Provider>
}

export const useQuery = () => {
	return useContext(QueryContext)
}
