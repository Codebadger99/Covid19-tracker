import React, { useState, useEffect } from "react";
import "./App.css";
import { MdCoronavirus } from "react-icons/md";
import Spinner from "../component/spinner/spinner";

function App() {
  useEffect(() => {
    GetCountries();
  }, []);

  const [Countries, setCountries] = useState([]);
  const [CovidData, setCovidData] = useState([]);
  const [Country, setCountry] = useState("");
  const [CountryImg, setImg] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const onChange = (e) => {
    setCountry(e.target.value);
  };

  const GetCountries = () => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });

    let items = [];
    Countries.forEach((country) => {
      items.push(
        <option key={country._id} value={country.iso2}>
          {country.country}
        </option>
      );
    });
    return items;
  };

  const GetData = () => {
    try {
      setLoading(true);
      fetch("https://disease.sh/v3/covid-19/countries/" + Country)
        .then((res) => res.json())
        .then((data) => {
          setCovidData(data);
          setImg(data.countryInfo);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <div className="Header">
        <h1 className="name">
          <MdCoronavirus />
          Covid Tracker
        </h1>
      </div>
      <div>
        <div className="select">
          <select name="Countries" id="Countries" onChange={onChange}>
            {GetCountries()}
          </select>
        </div>
      </div>
      <div className="data">
        <button className="btn" onClick={GetData}>
          Take Data
        </button>
      </div>

      <div>
        {CovidData.length === 0 && CountryImg.length === 0 ? (
          ""
        ) : (
          <div>
            {isLoading ? (
              <Spinner />
            ) : (
              <div>
                <div className="info">
                  <h1>{Country}</h1>
                </div>
                <div className="img">
                  <img src={CountryImg.flag} alt="" />
                </div>
                <div className="container">
                  <div className="row">
                    <div className="column">
                      <div className="card">
                        <h1>Cases: {CovidData.cases}</h1>
                      </div>
                    </div>

                    <div className="column">
                      <div className="card">
                        <h1>Death: {CovidData.deaths}</h1>
                      </div>
                    </div>

                    <div className="column">
                      <div className="card">
                        <h1>Recovered: {CovidData.recovered}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
