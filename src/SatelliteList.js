import React from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
/*import { faSearch } from '@fortawesome/free-solid-svg-icons'
<FontAwesomeIcon icon={faSearch} className="search-icon"/>*/

class SatelliteList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      satellites: [],
      showme: "",
      successful: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  /* Collects the data */
  componentDidMount() {
    axios.get(`https://api.spacexdata.com/v5/launches/`)
      .then(res => {
        const info = res.data;
        this.setState({ satellites: info });
      })
  }

  /* When the checkbox is clicked, modified the "succesful" state */
  handleChange(event) {
    this.setState({ successful: !this.state.successful });
    console.log("checkbox: "+ (this.state.successful));
  }
  
  /* Parses the UTC-date to a more user friendly format (mm-dd-yy) */
  parseDate(date) {
    let res = date.substr(5,2)+"/"+date.substr(8,2)+"/"+date.substr(0,4);
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
        }).filter((satellite) => {
          if(!this.state.successful) {
            return satellite;
          } else if (satellite.success === true) {
            return satellite;
          }
        }).map(satellite =>  
          <li>
              <span className="left">
                Satellite name: <b>{satellite.name} </b> 
              <p>
                Date of launch: {this.parseDate(satellite.date_utc)}
              </p>
              </span>
              <span className="right">        
              {satellite.success ? 
                  (<FontAwesomeIcon icon={faCheck} />) 
                : (<FontAwesomeIcon icon={faTimes} />)
              }
              </span>        
         </li>
        )}
      </ul>
    );

    return (
      <div>
        <div className="search-bar-container">
          <input type="text" placeholder="Search satellite name..." maxlength = "40"
            onChange={event => {this.setState({ showme: event.target.value })}}/>
        </div>
        <form className="checkbox-container">
          <input type="checkbox" id="show-successful" 
              defaultChecked={this.state.successful} onChange={this.handleChange}
            />
          <label for="show-successful"> Show me only successful launches!</label>
        </form>
        <div className="satellite-list-container">
          {satellitesInfo}
        </div>
      </div>

    );
  }
}


export default SatelliteList;

