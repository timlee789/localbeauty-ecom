import { GoogleMap, useLoadScript, useJsApiLoader, Marker} from '@react-google-maps/api';
import { useMemo, useState, useCallback } from 'react';


export default function Map() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    if(!isLoaded) return <div>Loading...</div>

    

    

    return <Gmap />
}

function Gmap() {
    const center2 = useMemo(() => ({ lat: -3.745,
        lng: -38.523}), []);
    const containerStyle = {
        width: '400px',
        height: '400px'
      };

    //   const [map, setMap] = useState(null)
    //   const onLoad = useCallback(function callback(map) {
    //     // This is just an example of getting and using the map instance!!! don't just blindly copy!
    //     const bounds = new window.google.maps.LatLngBounds(center2);
    //     map.fitBounds(bounds);
    
    //     setMap(map)
    //   }, [])
    
    //   const onUnmount = useCallback(function callback(map) {
    //     setMap(null)
    //   }, [])
    return (
        <div>
    <GoogleMap zoom={10} 
    center={{ lat: -3.745,
        lng: -38.523}} 
    mapContainerClassName={containerStyle}  
    // onLoad={onLoad}
    // onUnmount={onUnmount}
    >

        <Marker position={center2} />
    </GoogleMap>
    Map
    </div>
    )
}
