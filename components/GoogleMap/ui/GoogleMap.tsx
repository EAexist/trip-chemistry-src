import { PropsWithChildren, useEffect, useRef } from 'react';

import { useGoogleMapContext } from '../common/GoogleMapContext';

interface GoogleMapProps { 
  className? : string,
  sx? : React.CSSProperties,
  opts?: google.maps.MapOptions
};

const GoogleMap = ({ children, sx = { width : '100%', height: '100%' }, opts } : PropsWithChildren<GoogleMapProps>) => {

  const ref = useRef<HTMLDivElement>( null );
  // const [ map, setMap ] = useState<google.maps.Map | null>();
  const { map, setMap } = useGoogleMapContext();
  
  useEffect(()=>{
    console.log(`Mounting [GoogleMap]`);
    async function importLibrary( mapDiv: HTMLElement ) {
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const map = new Map( mapDiv, opts ) 
      setMap( map );
    }

    if ( ref.current ){
      console.log("[GoogleMap] Setting Map");
      importLibrary( ref.current );      
    }
    return(()=>{
      setMap( null );
      console.log(`Unmounting [GoogleMap]`);
  })
  }, [ ]);

  return(
    <div ref={ ref } style={ sx }>
        {children}
    </div>
  );
}

export default GoogleMap;