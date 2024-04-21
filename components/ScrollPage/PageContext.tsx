import { PropsWithChildren, createContext, useContext } from "react";

interface PageContextProps {
    activePage?: number; 
};

const PageContext = createContext<PageContextProps>( {} as PageContextProps );

const usePage = () => useContext(PageContext);

const PageContextProvider = ( { value, children }: PropsWithChildren<{ value : PageContextProps }> ) => {
    return(
        <PageContext.Provider value={ value }>
            { children }
        </PageContext.Provider>
    )
}

export default PageContext;
export { usePage, PageContextProvider }; 