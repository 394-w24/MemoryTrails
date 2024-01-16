// made a function to fetch coordinates from Nominatim,
//courtesy of Nominatim's API, https://nominatim.org/
export async function getCoordinatesForLocation(locationName) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { lat, lon };
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      throw error;
    }
  }
