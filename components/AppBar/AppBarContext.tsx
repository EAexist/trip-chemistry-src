import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

interface AppBarContextProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppBarContext = createContext<AppBarContextProps>({} as AppBarContextProps);

const AppBarContextProvider = ({ children }: PropsWithChildren ) => {

    const [ showAppBar, setShowAppBar ] = useState(true);

    return (
        <AppBarContext.Provider value={{ show: showAppBar, setShow: setShowAppBar }}>
            {children}
        </AppBarContext.Provider>
    )
}

const useAppBar = () => useContext(AppBarContext).show;
const useShowAppBar = () => useContext(AppBarContext).setShow;

const useHideAppbar = () => {
    const { show, setShow } = useContext(AppBarContext);
    
    useEffect(() => {
        setShow(false);
        return (() => {
            setShow(true);
        })
    }, [ setShow ]);

    return !show;
}

export default AppBarContext;
export { useAppBar, useShowAppBar, useHideAppbar, AppBarContextProvider };