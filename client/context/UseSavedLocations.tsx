// custom hook to use SavedLocationsContext

import { useContext } from "react";
import { SavedLocationsContext } from "./SavedLocationsContext";

const useSavedLocations = () => {
  const context = useContext(SavedLocationsContext);

  if (context === undefined) {
    throw new Error("useSavedLocations must be used within a SavedLocationsProvider");
  }

  return context;
};

export default useSavedLocations;