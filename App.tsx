import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
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
                <meta name="description" content={"여행 타입 테스트로 친구랑 함께 떠나는 여행 준비하기. 나의 여행 MBTI는 뭘까? 여행 계획, 여행 일정, 여행 예산, 국내 해외 여행지까지 서로 다른 취향을 맞춰봐."} />
                <meta name="keywords" content={"여행, 여행 일정, 여행지, 여행 계획, 여행 예산, 국내여행, 해외여행, MBTI"} />
                <meta name="author" content="Hyeon. hyeon.expression@gmail.com" />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={"여행 타입 테스트"} />
                <meta property="og:title" content={"여행 타입 테스트"} />
                <meta property="og:description" content={"여행 타입 테스트로 친구랑 함께 떠나는 여행 준비하기. 나의 여행 MBTI는 뭘까? 여행 계획, 여행 일정, 여행 예산, 국내 해외 여행지까지 서로 다른 취향을 맞춰봐."} />
                <meta property="og:url" content={env.PUBLIC_URL} />
                <meta property="og:image" content={"/images/icon/app-large.webp"} />

                <link rel="canonical" href={env.PUBLIC_URL} />
            </Helmet>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <RouterProvider router={router} />
                </LocalizationProvider>
            </ThemeProvider>
        </HelmetProvider>
    )
};