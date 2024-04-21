import { Provider } from "react-redux";
import { store } from "../store";
import Page from "./Page";

interface PageWrapperProps {

};

function PageWrapper({ }: PageWrapperProps) {

    return (
        <Provider store={store}>
            <Page />
        </Provider>
    );
}
export default PageWrapper;