/* eslint-disable react-hooks/exhaustive-deps */
import { useStudent } from "@mbs/services"
import { Container, Box, Typography } from "@material-ui/core";
import { PlagiarismRatio } from "@mbs/components";

type props = {
    data?: { name: string, status: string }[]
}

export function TheseData(props: props) {
    const studentContext = useStudent()

    if (!studentContext || !studentContext?.theses) {
        return <div />;
    }

    return (
        <Container>
            <Box display="flex">
                <Typography variant="body1" noWrap>
                    <Box m={1}>
                        <Box>
                            <Box fontWeight="fontWeightBold" component="div" display="inline">
                                Thesis Topic:
							</Box>
                            {"   " + studentContext?.theses?.thesis_topic}
                        </Box>
                        <Box>
                            <Box fontWeight="fontWeightBold" component="div" display="inline">
                                Submission Date:
							</Box>
                            {`  ${ new Date(studentContext?.theses?.submission_date * 1000).toLocaleDateString(
                                "en-US"
                            ) }`}
                        </Box>
                        <Box>
                            <Box fontWeight="fontWeightBold" component="div" display="inline">
                                Deadline Date:
							</Box>
                            {`  ${ new Date(studentContext?.theses?.due_date * 1000).toLocaleDateString("en-US") }`}
                        </Box>
                        <Box>
                            <Box fontWeight="fontWeightBold" component="div" display="inline">
                                TSS Status:
							</Box>
                            {`  ${ studentContext?.dissertation?.status }`}
                        </Box>
                        {props.data?.map((data) =>
                            <Box>
                                <Box fontWeight="fontWeightBold" component="div" display="inline">
                                    {data.name}:
							</Box>
                                {`  ${ data.status }`}
                            </Box>)
                        }
                    </Box>
                </Typography>
                <Box marginTop="2.5em" m={1}>
                    <PlagiarismRatio ratio={studentContext?.theses?.plagiarism_ratio} />
                </Box>
            </Box>
        </Container>
    );
}
