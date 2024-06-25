import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useGoogleMapContext } from "./GoogleMapContext";

interface SelectedPlaceContextProps {
    selectedPlaceId?: string;
    setSelectedPlaceId?: React.Dispatch<React.SetStateAction<string | undefined>>
}

const SelectedPlaceContext = createContext<SelectedPlaceContextProps>({} as SelectedPlaceContextProps);

const useSelectedPlaceContext = () => useContext(SelectedPlaceContext);

// const SelectedPlaceContextProvider = ({ children }: PropsWithChildren) => {

//     /**
//      * DOM 에서 오픈되어 있는 Info Window. 
//      * Active Info Window 가 변경 될 경우 기존 Active Info Window 의 close() 함수를 호출해 닫기 위해 참조. 
//      * */
//     const [prevActiveInfoWindow, setPrevActiveInfoWindow] = useState<google.maps.InfoWindow>(); 
    
//     /* Contexts */
//     const { map } = useGoogleMapContext();


//     useEffect(()=>{
//         console.log(`selectedInfoWindow.content=${selectedInfoWindow?.getContent().toString()}`)

//         // 새로운 Info Window 가 열릴 경우 기존의 Active Info Window를 닫음. Close 버튼을 눌러 Info Window를 닫을 경우 상태를 undefined 로 설정. Context의 Active Info Window 와 DOM 에서 오픈되어있는 Info Window 를 동기화.
//         if ( selectedInfoWindow !== prevActiveInfoWindow ){
//             prevActiveInfoWindow?.close()
//             setPrevActiveInfoWindow( selectedInfoWindow )
//         }

//         // Close 버튼을 눌러 Info Window를 닫을 경우 Info Window로 인해 이동한 지도의 center를 기본값으로 초기화.
//         if ( selectedInfoWindow === undefined ){
//             map.panTo(center)
//         }

//     }, [ selectedInfoWindow ])

//     return (
//         <SelectedPlaceContext.Provider value={{ selectedInfoWindow, setSelectedInfoWindow, selectedInfoWindowId, setSelectedInfoWindowId }}>
//             {children}
//         </SelectedPlaceContext.Provider>
//     )
// }

export default SelectedPlaceContext;
export { useSelectedPlaceContext };