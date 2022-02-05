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
  // 2006-03-24T22:30:00.000Z
  parseDate(date) {
    let res = date.substr(0,4)+"/"+date.substr(5,2)+"/"+date.substr(8,2);
    return res; 
  }

  render() {
    const satellites_info = (
      <ul>
        {this.state.satellites.map(satellite =>
            <li>
              Satellite name: {satellite.name} 
              <span className="toright">
                Date of launch: {this.parseDate(satellite.date_utc)}
              </span> 
            </li>
        )}
      </ul>
    );

    return (
      <div className="satellite-list-conteiner">
            {satellites_info}
      </div>

    );
  }
}


export default SatelliteList;

