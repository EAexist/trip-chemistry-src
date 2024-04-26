import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useGoogleMapContext } from "./GoogleMapContext";

interface InfoWindowContextProps {
    activeInfoWindow?: google.maps.InfoWindow;
    setActiveInfoWindow?: React.Dispatch<React.SetStateAction<google.maps.InfoWindow | undefined>>
}

const InfoWindowContext = createContext<InfoWindowContextProps>({} as InfoWindowContextProps);

const useInfoWindowContext = () => useContext(InfoWindowContext);

// const InfoWindowContextProvider = ({ children }: PropsWithChildren) => {

//     /**
//      * DOM 에서 오픈되어 있는 Info Window. 
//      * Active Info Window 가 변경 될 경우 기존 Active Info Window 의 close() 함수를 호출해 닫기 위해 참조. 
//      * */
//     const [prevActiveInfoWindow, setPrevActiveInfoWindow] = useState<google.maps.InfoWindow>(); 
    
//     /* Contexts */
//     const { map } = useGoogleMapContext();


//     useEffect(()=>{
//         console.log(`activeInfoWindow.content=${activeInfoWindow?.getContent().toString()}`)

//         // 새로운 Info Window 가 열릴 경우 기존의 Active Info Window를 닫음. Close 버튼을 눌러 Info Window를 닫을 경우 상태를 undefined 로 설정. Context의 Active Info Window 와 DOM 에서 오픈되어있는 Info Window 를 동기화.
//         if ( activeInfoWindow !== prevActiveInfoWindow ){
//             prevActiveInfoWindow?.close()
//             setPrevActiveInfoWindow( activeInfoWindow )
//         }

//         // Close 버튼을 눌러 Info Window를 닫을 경우 Info Window로 인해 이동한 지도의 center를 기본값으로 초기화.
//         if ( activeInfoWindow === undefined ){
//             map.panTo(center)
//         }

//     }, [ activeInfoWindow ])

//     return (
//         <InfoWindowContext.Provider value={{ activeInfoWindow, setActiveInfoWindow, activeInfoWindowId, setActiveInfoWindowId }}>
//             {children}
//         </InfoWindowContext.Provider>
//     )
// }

export default InfoWindowContext;
export { useInfoWindowContext };