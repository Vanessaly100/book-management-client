import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.819928,
  lng: -122.478255,
};

const Maps = () => {
  const googleMapsApiKey = import.meta.env.VITE_googleMapsApiKey; 

  return (
    <div>
      <div className="p-4 bg-darkMainBg text-white">
        <p className="mb-4 xl:text-3xl text-2xl">Find us at our location below:</p>
        <LoadScript googleMapsApiKey={googleMapsApiKey}> 
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Maps;
