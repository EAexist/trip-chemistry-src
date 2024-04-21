import { useEffect, useState } from 'react';

import { useGoogleMapContext } from '../common/GoogleMapContext';
import { POLYLINE_OPTIONS } from '../common/options';
// import withActiveOnFocus, { withActiveOnFocusProps } from '../../Focus/withActiveOnFoucs';

// interface GoogleMapPolylineProps extends withActiveOnFocusProps {
interface GoogleMapPolylineProps {
  start: google.maps.LatLngLiteral;
  end: google.maps.LatLngLiteral;
  map?: google.maps.Map
  index?: number; 
  isActive?: boolean;
};

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 2, bounce: 0 },
        opacity: { delay, duration: 0.01 }
      }
    };
  }
};  

// const Path = ({ index, id, start, end, text } : GoogleMapPolylineProps) => {

//   const path = `M ${start.x},${start.y} L ${end.x},${end.y}`

//   return(
//     <>
//       <defs>
//         <mask id={id} maskUnits="userSpaceOnUse">
//           <path
//             strokeDasharray='12 6'
//             d={path}
//             className='w-full h-full stroke-4 stroke-white'
//           />
//         </mask>
//       </defs>
//       {/* Aniamted Path */}
//       <motion.path
//         variants={draw}
//         className='w-full h-full stroke-4 stroke-red-500 fill-transparent'
//         d={path}
//         mask={`url(#${id})`}
//       />
//       {/* </motion.svg> */}
//     </>
//   );
// };

const GoogleMapPolyline = ({ start, end, isActive = true } : GoogleMapPolylineProps) => {

  const { map } = useGoogleMapContext();
  const [ polyline, setPolyline ] = useState<google.maps.Polyline>();

  useEffect(() => {
    console.log(`Mounting [GoogleMapPolyline] isActive=${isActive}`);

    async function importLibrary() {
      const { Polyline } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const line = new Polyline({
        path: [start, end],
        ...POLYLINE_OPTIONS.DASHED
      }); 
      setPolyline( line );
    }
    importLibrary();

    return(()=>{
        console.log(`Unmounting [GoogleMapPolyline]`);
    });
}, [])

  useEffect(()=>{
    if( isActive ){
      if(map){
        console.log(`GoogleMapPolyline: polyline.setMap(map)`);
        polyline && polyline.setMap(map);
      }
    }

    else{
      console.log(`GoogleMapPolyline: polyline.setMap(null)`);
      polyline && polyline.setMap(null);
    }
  },[ isActive, map, polyline ]);

  return(null);
}

// export default withGoogleAPI(GoogleMapPolyline)(API_KEY);

// const GoogleMapPolylineWithActiveOnFocus = withActiveOnFocus( GoogleMapPolyline )

export default GoogleMapPolyline;

// export { GoogleMapPolylineWithActiveOnFocus };