"use client";
import React, { useState } from "react";
import {
    useLoadScript,
    GoogleMap,
    Marker as AdvancedMarkerElement,
} from "@react-google-maps/api";

const libraries = ["places"]; // Include places library for optional search functionality

const GoogleMapComp = ({ className }) => {
    const [map, setMap] = useState(null);
    const [location, setLocation] = useState({
        lat: 6.925187004369271,
        lng: 79.86128293151192,
    });

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
        loading: "async",
    });

    const handleMapLoad = (mapInstance) => {
        setMap(mapInstance);
    };

    const handleClick = (event) => {
        setLocation({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
    };

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";

    return (
        <div className={className}>
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                zoom={13}
                center={{ lat: 6.925187004369271, lng: 79.86128293151192 }}
                onLoad={handleMapLoad}
                onClick={handleClick}
            >
                {location && <AdvancedMarkerElement position={location} />}
            </GoogleMap>
        </div>
    );
};

export default GoogleMapComp;
