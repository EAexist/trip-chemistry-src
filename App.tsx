import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom'

import { ThemeProvider } from '@mui/material'
import routes from './routes'
import './styles/index.css'
import theme from './mui/theme'

import { HelmetProvider } from 'react-helmet-async'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function App() {

    /*  React Router - Routers - Picking A Router. Remix Software, Inc.
        ( https://reactrouter.com/en/main/guides/ssr ) */
    let router = createBrowserRouter(routes);

    return (
        <HelmetProvider>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <RouterProvider router={router} />
                </LocalizationProvider>
            </ThemeProvider>
        </HelmetProvider>
    )
};