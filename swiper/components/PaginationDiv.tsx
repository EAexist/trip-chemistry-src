import { Box, BoxProps, styled } from "@mui/material";

const PaginationDiv = styled(Box)<BoxProps>(({ theme }) => ({
    marginTop: "16px",
    marginBottom: "16px",
    // width: "fit-content",
    display: "flex",
    /* justify-content: "center", */
    gap: "4px",
    zIndex: "1",    
    "& .swiper-pagination-bullet-active" : {
        backgroundColor: theme.palette.primary.main,
    }
}));

export default PaginationDiv;