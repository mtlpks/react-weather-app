import React, { useRef, useEffect, useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Weather from "./components/weather";
import "./App.css";

function App() {
  const latRef = useRef(null);
  const longRef = useRef(null);
  const [locationData, setlocationData] = useState(null);
  const [locationQuery, setlocationQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const positionPromise = new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const position = await positionPromise;
        latRef.current = position.coords.latitude;
        longRef.current = position.coords.longitude;

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/weather/?lat=${latRef.current}&lon=${
            longRef.current
          }&units=metric&APPID=${import.meta.env.VITE_API_KEY}`
        );
        const result = await response.json();
        setlocationData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const fetchlocationData = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/weather/?q=${locationQuery}&units=metric&APPID=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const locationData = await fetchlocationData();
    setlocationData(locationData);
  };

  const refreshLocation = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input className="input input-bordered input-accent"
          id="text-input"
            type="text"
            placeholder="Enter a city or country"
            value={locationQuery}
            onChange={(e) => setlocationQuery(e.target.value)}
          />
          <button className="btn btn-outline btn-accent bg-info-content" id="search-button" type="submit">
            Search
          </button>
          <button className="refresh btn btn-outline btn-accent bg-info-content" onClick={refreshLocation}>
          Your location
        </button>
        </form>
        
        {locationData ? (
          <Weather weatherData={locationData} />
        ) : (
          <div>
            <Dimmer active>
              <Loader>Loading...</Loader>
            </Dimmer>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
