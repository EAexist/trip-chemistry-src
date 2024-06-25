/* React */

/* Externals */

/* App */
import MainAppBar from "~/components/AppBar/MainAppBar";
import LoginContent from "./LoginContent";

interface LoginPageProps {
    title?: string;
}

function LoginPage({ title = "테스트를 시작해볼까요?" }: LoginPageProps) {

    return (
        <>
            <MainAppBar />
            <LoginContent title={title} />
        </>
    );
}
export default LoginPage;