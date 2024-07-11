import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { koKR } from '@mui/x-date-pickers/locales'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { HelmetProvider, Helmet } from 'react-helmet-async'

import theme from './mui/theme'
import routes from './routes'

import './common/axios'

import './styles/index.css'
import env from './env'

export default function App() {

    /*  React Router - Routers - Picking A Router. Remix Software, Inc.
        ( https://reactrouter.com/en/main/guides/ssr ) */
    let router = createBrowserRouter(routes);

    return (
        <HelmetProvider>
            <Helmet>
                <title>{"여행 타입 테스트"}</title>
                <meta name="description" content={"친구와 나의 여행 스타일 비교하기. 여행 계획, 여행 일정, 여행 예산, 국내 및 해외 여행지까지 서로 다른 취향을 맞춰봐."} />
                <meta name="keywords" content={"여행, 여행 일정, 여행지, 여행 계획, 여행 예산, 국내여행, 해외여행"} />
                <meta name="author" content="Hyeon. hyeon.expression@gmail.com" />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={"여행 타입 테스트"} />
                <meta property="og:title" content={"여행 타입 테스트"} />
                <meta property="og:description" content={"친구와 나의 여행 스타일 비교하기"} />
                <meta property="og:url" content={env.REACT_APP_PUBLIC_URL} />
                <meta property="og:image" content={"/images/icon/app-large.webp"} />

                <link rel="canonical" href={env.REACT_APP_PUBLIC_URL} />
            </Helmet>
            <ThemeProvider theme={theme}>
                <LocalizationProvider 
                    dateAdapter={AdapterDayjs}
                    localeText={koKR.components.MuiLocalizationProvider.defaultProps.localeText}
                >
                    <RouterProvider router={router} />
                </LocalizationProvider>
            </ThemeProvider>
        </HelmetProvider>
    )
};