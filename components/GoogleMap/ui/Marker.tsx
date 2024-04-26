import { Icon, useTheme } from '@mui/material';
import { useCallback, useEffect } from 'react';

import withGoogleMapMarker, { withGoogleMapMarkerProps } from '../common/withGoogleMapMarker';

import { Circle, LocationOn } from '@mui/icons-material';
import styles from "./GoogleMapMarker.module.css";

export interface MarkerProps {
  icon?: string;
  color?: string;
};

const Marker = ({ icon, color } : MarkerProps) => {

  return (    
    // <div className='flex flex-col items-center -translate-x-1/2 -translate-y-14 card animate-fadeIn'
    // onMouseEnter={ handleMouseEnter } onMouseLeave={ handleMouseLeave }>        
      <div className={ styles.marker__container }>
        {/* <div className='w-8 absolute left-1/2 -translate-x-1/2 h-full'/> */}
        <LocationOn sx={{ fontSize: 52, color: color }}/>
        <Circle className={ styles.marker__background } sx={{ fontSize: 28, color: "white", }}/>
        <Icon className={ styles.marker__icon } sx={{ fontSize: 20}}>{icon}</Icon>
        {/* <Paper><h6>{label}</h6></Paper> */}
      </div>
    // </div>
  )
};

// const MarkerWithActiveOnFocus = withActiveOnFocus( withGoogleMarker( Marker ) );

// export default withGoogleMarker( Marker );
export default Marker;