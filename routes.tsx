/* React */
import { createRoutesFromElements, Navigate, Outlet, Route } from 'react-router-dom';

import loadable from '@loadable/component';

/* App */
import Page from './route/Page';
import { TEST } from './common/app-const';
import { Provider } from 'react-redux';
import { store } from './store';

/* Loadable Components */

/* Intermediate Routes */
const AuthRequiredRoute = loadable(() => import(/* webpackChunkName: "AuthRequiredRoute" */ './route/AuthRequiredRoute'));
const TestRequiredRoute = loadable(() => import( /* webpackChunkName: "TestRequiredRoute" */'./route/TestRequiredRoute'));
const ChemistryRoute = loadable(() => import(/* webpackChunkName: "ChemistryRoute" */ './route/ChemistryRoute'));

/* Deprecated */
// const GuestRoute = loadable(() => import( /* webpackChunkName: "GuestRoute" */'./route/GuestRoute'));
// const AuthRecommendedPage = loadable(() => import(/* webpackChunkName: "AuthRecommendedPage" */ './route/AuthRecommendedPage'));

/* Public Contents */
const HomeContent = loadable(() => import(/* webpackChunkName: "HomeContent" */ './content/home/HomeContent'));
const ChemistryContent = loadable(() => import( /* webpackChunkName: "ChemistryContent" */'./content/chemistry/ChemistryContent'));

/* Auth-requiring Contents */
const CityDetailContent = loadable(() => import( /* webpackChunkName: "CityDetailContent" */'./content/city/CityDetailContent'));
const TestContent = loadable(() => import(/* webpackChunkName: "TestContent" */ './content/test/TestContent'));
const LoginContent = loadable(() => import( /* webpackChunkName: "LoginContent" */'./content/login/LoginContent'));
const InitializeNicknameContent = loadable(() => import( /* webpackChunkName: "InitializeNicknameContent" */'./content/login/InitializeNicknameContent'));
const KakaoAuthRedirectPage = loadable(() => import( /* webpackChunkName: "KakaoAuthRedirectPage" */'./content/login/KakaoAuthRedirectPage'));
const UserContent = loadable(() => import( /* webpackChunkName: "UserContent" */'./content/user/UserContent'));
const EditNicknameContent = loadable(() => import( /* webpackChunkName: "EditNicknameContent" */'./content/login/EditNicknameContent'));
const ResultContent = loadable(() => import( /* webpackChunkName: "ResultContent" */'./content/result/ResultContent'));
const ChemistryListContent = loadable(() => import( /* webpackChunkName: "ChemistryListContent" */'./content/chemistry/ChemistryListContent'));
const CreateChemistryContent = loadable(() => import( /* webpackChunkName: "CreateChemistryContent" */'./content/chemistry/CreateChemistryContent'));

const cityDetailRoute =
    <Route key={'city'} path={'city'} element={<Outlet />} >
        {
            Object.keys(TEST.city.subTests).map((cityClass) => (
                <Route key={cityClass} path={cityClass} element={<CityDetailContent cityClass={cityClass as keyof typeof TEST.city.subTests} />} />
            ))
        }
    </Route>

const routes = createRoutesFromElements(
    <Route path={'/'} element={
        <Provider store={store}>
            <Page />
        </Provider>} >
        <Route key={'index'} element={<Outlet />} >
            <Route key={'testPreview'} path={'testPreview'} element={<TestContent />} />
            <Route path="/" element={<Navigate to="home" />} />
            <Route key={'home'} index path={'home'} element={<HomeContent />} />
            <Route key={'chemistry'} path={'chemistry/:chemistryId'} element={<ChemistryRoute />} >
                <Route key={'index'} index element={<ChemistryContent />} />
                {/** @TODO 닉네임을 통한 사용자 검색 및 친구 초대 */}
                {/* <Route key={'searchAndInviteFriend'} path={'searchAndInviteFriend'} element={<SearchAndInviteFriendContent />} /> */}
                {cityDetailRoute}
            </Route>
            {/* [SEO, Authorization] Routes are excluded in robots.txt. URL Accesses are redirected to login page. */}
            <Route key={'authRequired'} element={<AuthRequiredRoute />}>
                <Route key={'test'} path={'test'} element={<Outlet />} >
                    <Route key={'index'} index element={<TestContent />} />
                    {cityDetailRoute}
                </Route>
                <Route key={'user'} path={'user'} element={<Outlet />} >
                    <Route key={'index'} index element={<UserContent />} />
                    <Route key={'setNickname'} path={'setNickname'} element={<EditNicknameContent />} />
                </Route>
                <Route key={'testRequired'} element={<TestRequiredRoute />}>
                    <Route key={'result'} path={'result'} element={<ResultContent />} />
                </Route>
                <Route key={'myChemistry'} path={'myChemistry'} element={<Outlet />} >
                    <Route key={'myChemistry'} index element={<ChemistryListContent />} />
                    <Route key={'new'} path={'new'} element={<CreateChemistryContent />} />
                </Route>
            </Route>
            {/* [SEO, Authorization] Routes are protected from access-by-URL. Can only be accessed by useNavigate Hook (/initializeNickname) or redirection from Kakao Auth API Page (/kakaoAuthRedirect). Routes are excluded in robots.txt. URL Accesses are redirected to login page. */}
            <Route key={'login'} path={'login'} element={<Outlet />} >
                <Route key={'index'} index element={<LoginContent />} />
                <Route key={'initializeNickname'} path={'initializeNickname'} element={<InitializeNicknameContent />} />
                <Route key={'redirectURI'} path={'kakaoAuthRedirect'} element={<KakaoAuthRedirectPage />} />
            </Route>
        </Route>

        {/** [ Deprecated ] 
         *  게스트 로그인 사용자를 위한 route 를  구분된 path로 관리 e.g. domain/guest/{guestId}/{pathname}
         * -> 통합된 path 에서 query parameter 를통해 관리 e.g. domain/{pathname}?guestId={guestId}  
         * */}
        {/* <Route key={'guest'} path={'guest/:id'} element={<GuestRoute />}>
            {sessionRoute}
        </Route> */}
    </Route>
)

export default routes;