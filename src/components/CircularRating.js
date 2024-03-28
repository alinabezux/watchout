import {Box, Typography, CircularProgress} from "@mui/material";

const CircularRate = ({value}) => {
    return (
        <Box sx={{
            position: "relative",
            display: "inline-block",
            width: "max-content"
        }}>
            <CircularProgress variant="determinate" value={value * 10} size={50} sx={{color: "#C41C1C"}}/>
            <Box sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Typography
                    fontFamily="Montserrat"
                    fontWeight="500"
                    sx={{marginTop: "-5px"}}
                >
                    {Math.round(value * 10) / 10}
                </Typography>
            </Box>
        </Box>
    );
};

export default CircularRate;