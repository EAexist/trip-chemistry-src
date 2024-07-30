import { SliderProps } from "@mui/material";

export const specialRestaurantBudgetSliderProps: SliderProps = {
    step: 20000,
    min: 20000,
    max: 120000,
    getAriaLabel: () => "maximum budget for special restaurant",
    marks: [
        {
            value: 20000,
            label: "2만원"
        },
        {
            value: 40000,
        },
        {
            value: 60000,
            label: "6만원"
        },
        {
            value: 80000,
        },
        {
            value: 100000,
            label: "10만원"
        },
        {
            value: 120000,
        },
    ]
};