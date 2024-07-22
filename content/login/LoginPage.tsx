/* React */

/* Externals */

/* App */
import MainAppBar from "../../components/AppBar/MainAppBar";
import LoginContent from "./LoginContent";
import AppTitleButton from "../../components/Button/AppTitleButton";

interface LoginPageProps {
    title?: string;
}

function LoginPage({ title = "테스트를 시작해보세요" }: LoginPageProps) {

    return (
        <>
            <MainAppBar >
                <AppTitleButton />
            </MainAppBar>
            <LoginContent title={title} />
        </>
    );
}
export default LoginPage;