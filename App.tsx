import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '@mui/material'
import routes from './routes'
import './styles/index.css'
import theme from './mui/theme'

import { HelmetProvider } from 'react-helmet-async'

export default function App() {

    /*  React Router - Routers - Picking A Router. Remix Software, Inc.
        ( https://reactrouter.com/en/main/guides/ssr ) */
    let router = createBrowserRouter(routes);

    return (
        <HelmetProvider>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </HelmetProvider>
    )
};