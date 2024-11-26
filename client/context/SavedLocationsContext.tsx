import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
  web_url: string;
  removeLocation: (id: number) => void;
}

export interface SavedLocationsContextProps {
  savedLocations: Destination[];
  addLocation: (location: Destination) => void;
  removeLocation: (id: number) => void;
}

export const SavedLocationsContext = createContext<
  SavedLocationsContextProps | undefined
>(undefined);

export const SavedLocationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [savedLocations, setSavedLocations] = useState<Destination[]>([]);

  useEffect(() => {
    const fetchSavedLocations = async () => {
      try {
        const response = await axios.get("/api/saved");
        setSavedLocations(response.data);
      } catch (error) {
        console.error("Error fetching saved locations:", error);
      }
    };

    fetchSavedLocations();
  }, []);

  const addLocation = (location: Destination) => {
    setSavedLocations((prevLocations) => [...prevLocations, location]);
  };
  const removeLocation = async (id: number) => {
    try {
      await axios.delete(`/api/saved/${id}`);
      setSavedLocations((prevLocations) =>
        prevLocations.filter((location) => location.id !== id)
      );
    } catch (error) {
      console.error("Error removing location:", error);
    }
  };

  return (
    <SavedLocationsContext.Provider
      value={{ savedLocations, addLocation, removeLocation }}
    >
      {children}
    </SavedLocationsContext.Provider>
  );
};
