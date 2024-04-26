import { PropsWithChildren, createContext, useContext } from "react";

interface GoogleMapContextProps {
    map: google.maps.Map;
    setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null | undefined>>
}

const GoogleMapContext = createContext<GoogleMapContextProps>({} as GoogleMapContextProps);

const useGoogleMapContext = () => useContext( GoogleMapContext );

const GoogleMapContextProvider = ({ children, ...value } : PropsWithChildren<GoogleMapContextProps>) => (
    <GoogleMapContext.Provider value={ value }>
        {children}
    </GoogleMapContext.Provider>
)

export default GoogleMapContext;
export { useGoogleMapContext };