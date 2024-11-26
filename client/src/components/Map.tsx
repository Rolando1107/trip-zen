import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import throttle from "lodash/throttle";
import * as mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import "../styles/Map.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { fetchTripAdvisorData } from "../api/tripadvAPI";
import axios from "axios";
import useSavedLocations from "../../context/UseSavedLocations";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { addLocation } = useSavedLocations();
  interface Location {
    coordinates: [number, number];
    placeName: string;
  }

  const [, setSelectedLocation] = useState<Location | null>(null);
  
  (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken =
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/iamthesaint/cm1b4ht2q00mu01qk2npuh13w",
      projection: "globe",
      zoom: 1.5,
      center: [-90, 40],
    });

    const geocoder = new MapboxGeocoder({
      accessToken: (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken,
      mapboxgl: mapboxgl,
      zoom: 10,
      placeholder: "Search for any location on Earth!",
    });

    // Add controls to the map
    map.addControl(new mapboxgl.NavigationControl(), "top-left");
    map.addControl(geocoder, "top-left");

    // Disable map rotation
    map.dragRotate.disable();

    // Handle results from geocoder
    geocoder.on("result", async (e) => {
      const { result } = e;
      const coordinates = result.geometry.coordinates;
      const placeName = result.text;
      const location: Location = { coordinates, placeName };
      setSelectedLocation(location);

      // Create popup and marker
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setLngLat(coordinates)
        .setHTML(`<p>Loading...</p>`)
        .addTo(map);

      new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);

      // Fetch data from TripAdvisor API
      try {
        const tripAdvisorData = await fetchTripAdvisorData(placeName); // Use location ID for fetching data
        if (tripAdvisorData) {
          const infoHtml = `
            <div style="text-align: center;">
              <h3>${tripAdvisorData.name}</h3>
              <p>${tripAdvisorData.description || "No description available."}</p>
              <img src="${tripAdvisorData.image}" alt="${tripAdvisorData.name}" style="width:100%; height:auto;"/>
              <a href="${tripAdvisorData.web_url}" target="_blank">Learn more</a>
              <button id="save-destination" class="btn btn-primary">Add to Your Saved Destinations</button>
            </div>
          `;
          popup.setHTML(infoHtml);

          // Add event listener for saving destination
          document.getElementById("save-destination")?.addEventListener("click", async () => {
            const newLocation = {
              name: tripAdvisorData.name,
              description: tripAdvisorData.description || "No description available.",
              image: tripAdvisorData.image,
              web_url: tripAdvisorData.web_url,
            };

            try {
              await axios.post('/api/saved', newLocation); 
              const completeLocation = {
                ...newLocation,
                id: Date.now(), // or any unique identifier
                removeLocation: () => {} // or any appropriate function
              };
              addLocation(completeLocation);
              alert("Destination saved!");
            } catch (error) {
              console.error("Error saving location:", error);
              alert("Failed to save destination");
            }
          });

        }
      } catch (error) {
        console.error("Error fetching TripAdvisor data:", error);
        popup.setHTML(`<p>Failed to load data for ${placeName}</p>`);
      }

      // Move map to the marker
      map.flyTo({
        center: coordinates,
        zoom: 10,
        essential: true,
      });
    });

    // Add spin functionality
    let userInteracting = false;
    const spinGlobe = throttle(() => {
      const zoom = map.getZoom();
      if (!userInteracting && zoom < 4) {
        const distancePerSecond = 340 / 130;
        const center = map.getCenter();
        center.lng -= distancePerSecond;
        map.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }, 100);

    // Event listeners for user interaction
    map.on("mousedown", () => { userInteracting = true; });
    map.on("mouseup", () => { userInteracting = false; spinGlobe(); });
    map.on("dragend", () => { userInteracting = false; spinGlobe(); });
    map.on("pitchend", () => { userInteracting = false; spinGlobe(); });
    map.on("rotateend", () => { userInteracting = false; spinGlobe(); });
    map.on("moveend", spinGlobe);

    return () => {
      map.remove();
    };
  }, [addLocation]);

  return (
    <div
      className="map-container"
      ref={mapContainerRef}
      style={{ width: "100%", height: "100vh" }}
    />
  );
}
