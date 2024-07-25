/* React */
import loadable from '@loadable/component';
import { Provider } from 'react-redux';
import { createRoutesFromElements, Navigate, Outlet, Route, ScrollRestoration } from 'react-router-dom';

/* App */
import { CITIES } from './common/app-const';
import { store } from './store';
import Page from './content/Page';
import HideOnScrollTest from './components/HideOnScrollTest';
import { Helmet } from 'react-helmet-async';
import env from "~/env";
import LoginPage from './content/login/LoginPage';

/* Loadable Components */

/* Intermediate Routes */
const AuthRequiredRoute = loadable(() => import(/* webpackChunkName: "AuthRequiredRoute" */ './content/AuthRequiredRoute'));
const ChemistryPage = loadable(() => import(/* webpackChunkName: "ChemistryPage" */ './content/chemistry/ChemistryPage'));

/* Public Contents */
const HomeContent = loadable(() => import(/* webpackChunkName: "HomeContent" */ './content/home/HomeContent'));

/* Auth-requiring Contents */
const CityDetailContent = loadable(() => import( /* webpackChunkName: "CityDetailContent" */'./content/city/CityDetailContent'));

const TestContent = loadable(() => import(/* webpackChunkName: "TestContent" */ './content/test/TestContent'));
const InitializeNicknameContent = loadable(() => import( /* webpackChunkName: "InitializeNicknameContent" */'./content/login/InitializeNicknameContent'));
const KakaoAuthRedirectPage = loadable(() => import( /* webpackChunkName: "KakaoAuthRedirectPage" */'./content/login/KakaoAuthRedirectPage'));
const UserContent = loadable(() => import( /* webpackChunkName: "UserContent" */'./content/user/UserContent'));
const EditNicknameContent = loadable(() => import( /* webpackChunkName: "EditNicknameContent" */'./content/login/EditNicknameContent'));
const ResultPage = loadable(() => import( /* webpackChunkName: "ResultPage" */'./content/result/ResultPage'));
const PublicResultPage = loadable(() => import( /* webpackChunkName: "PublicResultPage" */'./content/result/PublicResultPage'));
const ChemistryListContent = loadable(() => import( /* webpackChunkName: "ChemistryListContent" */'./content/chemistryList/ChemistryListContent'));
const CreateChemistryContent = loadable(() => import( /* webpackChunkName: "CreateChemistryContent" */'./content/chemistryList/CreateChemistryContent'));

/* Deprecated */
// const GuestRoute = loadable(() => import( /* webpackChunkName: "GuestRoute" */'./route/GuestRoute'));
// const AuthRecommendedPage = loadable(() => import(/* webpackChunkName: "AuthRecommendedPage" */ './route/AuthRecommendedPage'));
// const TestRequiredRoute = loadable(() => import( /* webpackChunkName: "TestRequiredRoute" */'./route/TestRequiredRoute'));

const routes = createRoutesFromElements(
    <Route path={'*'} element={
        <Provider store={store}>
            <ScrollRestoration
                getKey={(location, matches) => {
                    console.log(`[ScrollRestoration path=${location.pathname.split('/')[1]}`)
                    const path = location.pathname.split('/')[1];
                    const restorePath = ['result', 'chemistry']
                    return restorePath.includes(path) ? location.pathname : location.key;
                }}
            />
            <Page />
        </Provider>} >
        <Route key={'index'} element={<Outlet />} >
            <Route path="*" element={<Navigate to="/" />} />
            <Route key={'home'} index element={
                <>
                    <Helmet>
                        <link rel="canonical" href={`${env.REACT_APP_PUBLIC_URL}`} />
                    </Helmet>
                    <HomeContent />
                </>
            } />
            <Route key={'result'} path={'result/:profileId'} element={<PublicResultPage />} />
            <Route key={'chemistry'} path={'chemistry/:chemistryId'} element={
                <ChemistryPage />
            } />
            <Route key={'city'} path={'city'} element={<Outlet />}>
                {
                    Object.keys(CITIES).map((cityId) => (
                        <Route key={cityId} path={cityId} element={<CityDetailContent cityId={cityId} />} />
                    ))
                }
            </Route>
            {/** @TODO 닉네임을 통한 사용자 검색 및 친구 초대 */}
            {/* <Route key={'searchAndInviteFriend'} path={'searchAndInviteFriend'} element={<SearchAndInviteFriendContent />} /> */}
            {/* [SEO, Authorization] Routes are excluded in robots.txt. URL Accesses are redirected to login page. */}
            <Route key={'authRequired'} element={<AuthRequiredRoute />}>
                <Route key={'test'} path={'test'} element={<Outlet />} >
                    <Route key={'index'} index element={<TestContent />} />
                </Route>
                <Route key={'user'} path={'user'} element={<Outlet />} >
                    <Route key={'index'} index element={<UserContent />} />
                    <Route key={'setNickname'} path={'setNickname'} element={<EditNicknameContent />} />
                </Route>
                <Route key={'result'} path={'result'} element={<ResultPage />} />
                <Route key={'myChemistry'} path={'myChemistry'} element={<Outlet />} >
                    <Route key={'myChemistry'} index element={<ChemistryListContent />} />
                    <Route key={'new'} path={'new'} element={<CreateChemistryContent />} />
                </Route>
            </Route>
            {/* [SEO, Authorization] Routes are protected from access-by-URL. Can only be accessed by useNavigate Hook (/initializeNickname) or redirection from Kakao Auth API Page (/kakaoAuthRedirect). Routes are excluded in robots.txt. URL Accesses are redirected to login page. */}
            <Route key={'login'} path={'login'} element={<Outlet />} >
                <Route key={'index'} index element={<LoginPage />} />
                <Route key={'initializeNickname'} path={'initializeNickname'} element={<InitializeNicknameContent />} />
                <Route key={'redirectURI'} path={'kakaoAuthRedirect'} element={<KakaoAuthRedirectPage />} />
            </Route>

            {/* Debug */}
            <Route key={'initializeNickname'} index path={'initializeNickname'} element={
                <HideOnScrollTest />
            } />
        </Route>


        {/** 
         * [ Deprecated ] 
         *  게스트 로그인 사용자를 위한 route 를  구분된 path로 관리 e.g. domain/guest/{guestId}/{pathname}
         * -> 통합된 path 에서 query parameter 를통해 관리 e.g. domain/{pathname}?guestId={guestId}  
         */}
        {/* <Route key={'guest'} path={'guest/:id'} element={<GuestRoute />}>
            {sessionRoute}
        </Route> */}
    </Route>
)

export default routes;