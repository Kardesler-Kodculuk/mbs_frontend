
import { CircularProgress, Box, Typography, makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    top: {
        position: 'absolute',
        left: 0,
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
}));
type plagiarism = {
    ratio: number
}

export function PlagiarismRatio(props: plagiarism) {
    const classes = useStyles();
    return (
        <Box position="relative" display="inline-flex">
            <div className={classes.root}>
                <CircularProgress variant="determinate" className={classes.bottom} value={100} />
                <CircularProgress variant="determinate" className={classes.top} color={props.ratio > 12 ? "secondary" : "primary"} value={props.ratio} />
                <Box
                    top={20}
                    left={9}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography variant="caption" className={classes.top} component="div" color="textSecondary">{`${ Math.round(
                        props.ratio,
                    ) }%`}</Typography>
                </Box>
            </div>
        </Box>
    );
}
