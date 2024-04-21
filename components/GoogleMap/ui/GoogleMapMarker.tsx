import { Icon } from '@mui/material';
import { useCallback, useEffect } from 'react';

import withGoogleMapMarker, { withGoogleMapMarkerProps } from '../common/withGoogleMapMarker';

import { Circle, LocationOn } from '@mui/icons-material';
import styles from "./GoogleMapMarker.module.css";

interface MapMarkerProps extends withGoogleMapMarkerProps {
  label: string; 
  icon?: string;
};

const MapMarker = ({ label, icon, marker } : MapMarkerProps) => {
  
  useEffect(()=>{
    console.log(`Rednering [MapMarker] ${marker.position?.lat}, ${marker.position?.lng}`)
  }, [])

  const handleMouseEnter = useCallback(() => {
    console.log('[MapMarker] handleMouseEnter'); marker.zIndex = 10; 
  }, [ marker ]);

  const handleMouseLeave = useCallback(() => {
    console.log('[MapMarker] handleMouseLeave'); marker.zIndex = 0;
  }, [ marker ]);

  return (    
    // <div className='flex flex-col items-center -translate-x-1/2 -translate-y-14 card animate-fadeIn'
    // onMouseEnter={ handleMouseEnter } onMouseLeave={ handleMouseLeave }>        
      <div className={ styles.marker__container }>
        {/* <div className='w-8 absolute left-1/2 -translate-x-1/2 h-full'/> */}
        <LocationOn sx={{ fontSize: 52, color: "gray", }}/>
        <Circle className={ styles.marker__background } sx={{ fontSize: 28, color: "white", }}/>
        <Icon className={ styles.marker__icon } sx={{ fontSize: 20}}>{icon}</Icon>
        {/* <Paper><h6>{label}</h6></Paper> */}
      </div>
    // </div>
  )
};

// const MapMarkerWithActiveOnFocus = withActiveOnFocus( withGoogleMapMarker( MapMarker ) );

export default withGoogleMapMarker( MapMarker );

// export { MapMarkerWithActiveOnFocus };