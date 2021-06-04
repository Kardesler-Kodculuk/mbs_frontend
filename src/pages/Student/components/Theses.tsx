/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react"
import { useQuery, useAlert } from "@mbs/services"
import { ThesesData } from "@mbs/interfaces"
import CheckIcon from "@material-ui/icons/Check"
import { UserTable } from "@mbs/components"
import { TableRow, TableCell, Button, IconButton, Box, Typography } from "@material-ui/core"
import { PlagiarismRatio } from "@mbs/components"
import axios from "axios"
import { MBS } from "@mbs/utils"
import { Delete, CloudDownload } from "@material-ui/icons"
export function Theses() {
	const [load, setLoad] = useState<boolean>(true)
	const [theses, setTheses] = useState<number[] | null>(null)
	const [thesesData, setThesesData] = useState<ThesesData[] | null>(null)
	const query = useQuery()
	const [file, setFile] = useState<File | null>(null)
	const alert = useAlert()

	useEffect(() => {
		async function fetchTheses() {
			await query
				?.queryID<number[]>("theses")
				.then((data) => {
					setTheses(data)
				})
				.catch((err) => {})
		}
		fetchTheses()
	}, [load])

	useEffect(() => {
		async function fetchMetaData() {
			if (theses) {
				await query
					?.queryInfo<ThesesData>("theses/metadata", theses)
					.then((data) => {
						setThesesData(data)
					})
					.then(() => {})
					.catch((err) => {
						console.log(err.response)
					})
			}
		}
		fetchMetaData()
	}, [theses])

	useEffect(() => {
		if (file) {
			let formData = new FormData()
			formData.append("file", file)
			axios
				.post(`${MBS?.url}/theses`, formData, {
					withCredentials: true,
					headers: {
						"Content-Type": "application/pdf",
					},
				})
				.then((res) => {
					console.log(res.data)
					setLoad(!load)
					alert?.openAlert("success", "thesis-upload")
				})
				.catch((err) => {
					console.log(err)
					alert?.openAlert("error", "thesis-upload")
				})
		}
	}, [file])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileList = e.target.files
		if (fileList) {
			setFile(fileList[0])
		}
	}
	const handleDelete = (id: number) => {
		axios
			.delete(`${MBS?.url}/theses/${id}`, {
				withCredentials: true,
			})
			.then((res) => {
				setLoad(!load)
				alert?.openAlert("success", "thesis-delete-student")
				console.log(res.data)
			})
			.catch((err) => {})
	}


	return (
		<div>
			<UserTable
				title={"Theses"}
				buttons={[
					<Button
						variant="contained"
						component="label"
						color="secondary"
						key="thesis-upload-button">
						Upload New
						<input type="file" accept="application/pdf" hidden onChange={handleChange} />
					</Button>,
				]}>
				{thesesData?.map((theses) => (
					<TableRow key={"table_row_" + theses.thesis_id}>
						<TableCell component="th" scope="row" align="left">
							{`${new Date(theses.submission_date * 1000).toLocaleDateString("en-US")} (${
								theses.thesis_topic
							})`}
						</TableCell>
						<TableCell component="th" scope="row" align="right">
							<a href={`${MBS?.url}/theses/${theses.thesis_id}`} download>
								<IconButton>
									<CloudDownload fontSize="large" />
								</IconButton>
							</a>
							<IconButton onClick={() => handleDelete(theses.thesis_id)}>
								<Delete />
							</IconButton>
						</TableCell>
						<TableCell component="th" scope="row" align="right">
							<PlagiarismRatio ratio={theses.plagiarism_ratio} />
						</TableCell>
					</TableRow>
				))}
			</UserTable>
		</div>
	)
}
