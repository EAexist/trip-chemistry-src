import { Box, BoxProps, styled } from "@mui/material";

const PaginationBullets = styled(Box)<BoxProps>(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: "4px",
    zIndex: "1",    
    "& .swiper-pagination-bullet-active" : {
        backgroundColor: theme.palette.primary.main,
    }
}));

export default PaginationBullets;