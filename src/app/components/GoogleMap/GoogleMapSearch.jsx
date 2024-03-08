"use client";
import React, { useState, useEffect } from "react";
import {
    useLoadScript,
    GoogleMap,
    Marker as AdvancedMarkerElement,
} from "@react-google-maps/api";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

const libraries = ["places"]; // Include places library for search functionality

const GoogleMapComp = ({ className }) => {
    const [map, setMap] = useState(null);
    const [location, setLocation] = useState({
        lat: 6.925187004369271,
        lng: 79.86128293151192,
    });
    const [placeDetails, setPlaceDetails] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

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

    const {
        placesService,
        placePredictions,
        getPlacePredictions,
        isPlacePredictionsLoading,
    } = usePlacesService({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
        if (placePredictions.length > 0) {
            setPlaceDetails(placePredictions);
        }
    }, [placePredictions]);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";

    return (
        <div className={`relative ${className}`}>
            <div className="absolute top-0 left-0 p-4 w-full h-fit z-10 flex justify-center items-center gap-2 flex-col">
                <input
                    className="px-6 py-2 rounded-md w-52"
                    placeholder="Search Location ..."
                    onChange={(evt) => {
                        getPlacePredictions({ input: evt.target.value });
                        setSelectedLocation(null);

                        if (evt.target.value.replace(" ", "") === "") {
                            setPlaceDetails([]);
                        }
                    }}
                    loading={isPlacePredictionsLoading}
                    value={selectedLocation?.name}
                />
                <div className="flex flex-col justify-center gap-2">
                    {placeDetails.map((item) => (
                        <div
                            key={item.place_id}
                            className="bg-white bg-opacity-80 px-2 py-1 rounded-md"
                            onClick={() => {
                                setPlaceDetails([]);
                                placesService?.getDetails(
                                    {
                                        placeId: item.place_id,
                                    },
                                    (placeDetails) => {
                                        setSelectedLocation(placeDetails);
                                        setLocation(
                                            placeDetails.geometry.location
                                        );
                                    }
                                );
                            }}
                        >
                            {item.description}
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full h-full z-0">
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    zoom={13}
                    center={location}
                    onLoad={handleMapLoad}
                    onClick={handleClick}
                >
                    {location && <AdvancedMarkerElement position={location} />}
                </GoogleMap>
            </div>
        </div>
    );
};

export default GoogleMapComp;
