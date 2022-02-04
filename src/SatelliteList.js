import React from 'react';
import axios from 'axios';
import './App.css';


class SatelliteList extends React.Component {
  state = {
    satellites: []
  }

  componentDidMount() {
    axios.get(`https://api.spacexdata.com/v5/launches/`)
      .then(res => {
        const satellites = res.data;
        this.setState({ satellites });
      })
  }

  render() {
    const satellites_info = (
      <ul className="satellite-list">
        {this.state.satellites.map(satellite =>
            <li>
              Name: {satellite.name} - Date: {satellite.date_utc}. 
            </li>
        )}
      </ul>
    );

    return (
      <div className="container">
            {satellites_info}
      </div>

    );
  }
}

export default SatelliteList;

