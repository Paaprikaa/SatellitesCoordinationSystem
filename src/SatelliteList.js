import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
/*import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
<FontAwesomeIcon icon={faSearch} className="search-icon"/>*/

class SatelliteList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      satellites: [],
      showme: ""
    };
  }
  /* Collects the data */
  componentDidMount() {
    axios.get(`https://api.spacexdata.com/v5/launches/`)
      .then(res => {
        const info = res.data;
        this.setState({ satellites: info });
      })
  }

  /* Search bar component */
  /*SearchName() {
    const [list, setList] = useState("");
  }*/
  
  /* Parses the UTC-date to a more user friendly format */
  parseDate(date) {
    let res = date.substr(0,4)+"/"+date.substr(5,2)+"/"+date.substr(8,2);
    return res; 
  }

  render() {
    const satellitesInfo = (
      <ul>
        {this.state.satellites.filter((satellite) => {
          if (this.state.showme === "") {
            return satellite;
          } 
          else if (satellite.name.toLowerCase().includes(this.state.showme.toLowerCase())) {
            return satellite;
          }
        }).map(satellite =>  
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
      <div>
        <div className="search-bar-container">
          <input type="text" className="search-bar" placeholder="Search satellite name..." maxlength = "40"
            onChange={event => {this.setState({ showme: event.target.value })}}/>
        </div>
        <div className="satellite-list-container">
          {satellitesInfo}
        </div>
      </div>

    );
  }
}


export default SatelliteList;

