import React from 'react';
import axios from 'axios';
import './App.css';
import Accordion from "./components/Accordion.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class SatelliteList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      satellites: [],
      filtername: "",
      filtersuccess: false,
      filterdate: (new Date("03/24/2006")),
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
  
  /* Parses the UTC-date to a more user friendly format (mm-dd-yy) */
  parseDateUTC(date) {
    let res = date.substr(5,2)+"/"+date.substr(8,2)+"/"+date.substr(0,4);
    return res; 
  }

  /* Parses the input data from the date filter */
  parseDateCalendar(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("/");
}

  render() {
    /* SpaceX satellite list */
    const satellitesInfo = (
      <div className="satellite-list-container">
        {this.state.satellites.filter((satellite) => {
          if (this.state.filtername === "") {
            return satellite;
          } 
          else if (satellite.name.toLowerCase()
            .includes(this.state.filtername.toLowerCase())) {
            return satellite;
          }
        }).filter((satellite) => {
          if(!this.state.filtersuccess) {
            return satellite;
          } else if (satellite.success === true) {
            return satellite;
          }
        }).filter(satellite => {
          var inputdate = 
            new Date(this.parseDateCalendar(this.state.filterdate));
          var satdate = 
            new Date(this.parseDateUTC(satellite.date_utc));
          if(satdate.getTime() >= inputdate.getTime()){
            return satellite;
          }
        }).map(satellite =>  {
          if (satellite.failures.length == 0) {
            var fail = "none.";
          } else {
            var fail = satellite.failures[0].reason;
          }
          return (
          <Accordion
            satName={satellite.name}
            satDate={this.parseDateUTC(satellite.date_utc)}
            satSuccess={satellite.success}
            satDetails={satellite.details}
            satYT={satellite.links.webcast}
            satWiki={satellite.links.wikipedia} 
            satArticle={satellite.links.article}
            satFailure={fail}
         />);
        })}
      </div>
    );

    return (
      <div>
        <div className="search-bar-container">
          <input type="text" placeholder="Search satellite name..." 
            maxlength = "40"
            onChange={event => {
              this.setState({ filtername: event.target.value, change:false })
            }}/>
        </div>
        <div className="row2-container">
          <div className="checkbox-container">
            <label>
              <input type="checkbox" id="show-filtersuccess" 
                  defaultChecked={this.state.filtersuccess}
                  onChange={event => {
                this.setState({ filtersuccess: !this.state.filtersuccess })
              }}/>

               <FontAwesomeIcon icon={faStar} className={`checkbox ${this.state.filtersuccess ? "checkbox--active": ""}`}
                  aria-hidden="true"  />
                <span style={{marginLeft: '2%'}}>Only successful launches</span>
              </label>
            </div>
            <div className="date-filter-container">
            <style>
              { `.date-picker input {
                display: inline-flex;
                padding: 1%;
                border: 0;           
                width: 100%;
                background-color: #3b393e;
                color: #eeeee9;
              }`}
              { `.date-picker {
                width: 30%;
              }`}
            </style>
            <span className="date-title">Search since:</span>
            <DatePicker wrapperClassName="date-picker" 
              selected={this.state.filterdate} 
              onChange={(date) => this.setState({filterdate: date})} 
              closeOnScroll={true} showYearDropdown 
              yearDropdownItemNumber={15} scrollableYearDropdown
              placeholderText="Select..." />
          </div>
        </div>
        {satellitesInfo}
      </div>

    );
  }
}


export default SatelliteList;

