 import axios from "axios";

      export async function fetchTripAdvisorData(placeName: string) {
        try {
          const response = await axios.get(`http://localhost:3001/tripadvisor`, {
            params: { query: placeName },
          });

          const { details, photos } = response.data;

          // geos/city/town/village details
          const destination = {
            name: details.name || placeName,
            description: details.description || "No description available for this location",
            web_url: details.web_url,
            image: photos[0]?.imageUrl || "No photo available for this location",
          };

          return destination;
        } catch (error) {
          console.error("Error fetching data from TripAdvisor:", error);
          return null;
        }
      }