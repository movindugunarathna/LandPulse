"use client";
import React from "react";
import {
    useLoadScript,
    GoogleMap,
    Marker as AdvancedMarkerElement,
} from "@react-google-maps/api";

const libraries = ["places"];

const LocationView = ({ geometry, className }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
        loading: "async",
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";

    return (
        <div className={className}>
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                zoom={17}
                center={geometry}
            >
                {geometry && <AdvancedMarkerElement position={geometry} />}
            </GoogleMap>
        </div>
    );
};

export default LocationView;
