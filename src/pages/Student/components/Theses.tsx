/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { useQuery, } from "@mbs/services"
import { ThesesData } from "@mbs/interfaces"
import CheckIcon from "@material-ui/icons/Check";
import { UserTable } from "@mbs/components"
import { TableRow, TableCell, IconButton, CircularProgress, Box, Typography } from "@material-ui/core";
import {PlagiarismRatio} from "@mbs/components"
import Alert from "@material-ui/lab/Alert";

export function Theses() {
    const [load, setLoad] = useState<boolean>(true)
    const [theses, setTheses] = useState<number[] | null>(null)
    const [thesesData, setThesesData] = useState<ThesesData[] | null>(null)
    const query = useQuery()



    useEffect(() => {
        async function fetchTheses() {
            await query?.queryID<number[]>("theses")
                .then(data => { setTheses(data); })
                .catch((err) => { })
        }
        fetchTheses()
    }, [])

    useEffect(() => {
        async function fetchMetaData() {
            if (theses) {
                console.log(theses)
                await query?.queryInfo<ThesesData>("theses/metadata", theses)
                    .then(data => { setThesesData(data); }).then(() => { })
                    .catch((err) => { console.log(err.response) })
            }
        }
        fetchMetaData()
    }, [theses])

    return (
        <div>
            <UserTable title={"Theses"} buttons={[{ value: "Upload New", handler: () => { } }]}>
                {
                    thesesData?.map((theses) =>
                        <TableRow key={"table_row_" + theses.thesis_id}>
                            <TableCell component="th" scope="row" align="left">
                                {`${ new Date(theses.submission_date * 1000).toLocaleDateString("en-US") } (${ theses.thesis_topic })`}
                            </TableCell>
                            <TableCell component="th" scope="row" align="right">
                                <PlagiarismRatio ratio={theses.plagiarism_ratio} />
                            </TableCell>
                        </TableRow>)
                }
            </UserTable>
        </div>
    );
}