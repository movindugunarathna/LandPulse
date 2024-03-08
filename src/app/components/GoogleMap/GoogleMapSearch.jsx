"use client";
import React, { useState } from "react";
import {
    useLoadScript,
    GoogleMap,
    Marker as AdvancedMarkerElement,
} from "@react-google-maps/api";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setLocationGeo } from "@/lib/redux/adSlice";

const libraries = ["places"];

const GoogleMapComp = ({ className }) => {
    const dispatch = useAppDispatch();
    const ad = useAppSelector((state) => state.ad);
    const [map, setMap] = useState(null);
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
        dispatch(
            setLocationGeo({
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            })
        );
    };

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
                                        const lat = parseFloat(
                                            placeDetails.geometry.location.lat
                                        );
                                        const lng = parseFloat(
                                            placeDetails.geometry.location.lng
                                        );

                                        if (!isNaN(lat) && !isNaN(lng)) {
                                            dispatch(
                                                setLocationGeo({
                                                    lat: lat,
                                                    lng: lng,
                                                })
                                            );
                                        } else {
                                            console.error(
                                                "Invalid latitude or longitude values:",
                                                lat,
                                                lng
                                            );
                                        }
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
                    center={ad.geomatry}
                    onLoad={handleMapLoad}
                    onClick={handleClick}
                >
                    {ad.geomatry && (
                        <AdvancedMarkerElement position={ad.geomatry} />
                    )}
                </GoogleMap>
            </div>
        </div>
    );
};

export default GoogleMapComp;
