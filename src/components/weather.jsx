import React from "react";
import "./styles.css";
import { Card, CardContent } from "semantic-ui-react";
import moment from "moment";

function CardExampleCard({ weatherData }) {
  return Object.getOwnPropertyNames(weatherData).length > 2 ? (
    <div className="weather-card card w-96 glass">
      <div className="card-body items-center text-center">
        <h2 className="font-semibold title">
          {weatherData.name + ", " + weatherData.sys.country}
        </h2>
        <div className="flex" id="temperature-icon">
          <p id="temperature">{weatherData.main.temp}&deg;C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt=""
            width={"100px"}
          />
        </div>
        <div className="flex gap-4" id="date-and-day">
          <p>{moment().format("dddd")}</p>
          <p>{moment().format("LL")}</p>
        </div>
        {/* <p>
          Sunrise:{" "}
          {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-IN")}
        </p>
        <p>
          Sunset:{" "}
          {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-IN")}
        </p> */}
        <p>
          {weatherData.weather[0].description[0].toUpperCase() +
            weatherData.weather[0].description.substring(1)}
        </p>
        <p>Humidity: {weatherData.main.humidity} %</p>
      </div>
    </div>
  ) : (
    <div className="card w-96 glass">
      <div className="card-body">
        <h3>No city or country match. Try again.</h3>
      </div>
    </div>
  );
}

export default React.memo(CardExampleCard);
