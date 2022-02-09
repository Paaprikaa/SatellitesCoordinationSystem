import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import "./Accordion.css";

function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px` 
    );
  }

  /* Ends the sentence correctly */
  function addFinalDot(str) {
    if (str.slice(-1)!==".") {
      return str + ".";
    } else {
      return str;
    }
  }

  return (
   <div className="accordion__section">
     <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
       <div className="accordion__title">
          <span className="accordion__left-title">
            Satellite name: <b>{props.satName}</b>
            <p>
              Date of launch: {props.satDate}
            </p>   
          </span>
          <span className="accordion__right-title">
            {props.satSuccess===null
                  ? ("Unknown")
                  : (props.satSuccess
                      ? (<FontAwesomeIcon icon={faCheck} />)
                      : (<FontAwesomeIcon icon={faTimes} />)
                    )
              }
          </span>
       </div>
     </button>
     <div 
      className="accordion__content" 
      ref={content}
      style={{ maxHeight : `${setHeight}`}} >
      <div className="accordion__text">
       <b>Details: </b>
       {props.satDetails===null
          ? ("none.")
          : (addFinalDot(props.satDetails))
       } <br />
       <b>See the launch here: </b>
       {props.satYT===null
          ? ("none.")
          : (<a href={props.satYT}>{props.satYT}</a>)
       } <br />
       <b>Wikipedia: </b>
       {props.satWiki===null
          ? ("none.")
          : (<a href={props.satWiki}>{props.satWiki}</a>)
       } <br />
       <b>Article: </b>
       {(props.satArticle===null || props.satArticle===props.satWiki)
          ? ("none.")
          : (<a href={props.satArticle}>{props.satArticle}</a>)
       } 
      </div>
     </div>
   </div>
 );
}

export default Accordion;

/*
<span className="left">
                Satellite name: <b>{satellite.name} </b> 
              <p>
                Date of launch: {this.parseDateUTC(satellite.date_utc)}
              </p>
              </span>
              <span className="right">        
               {satellite.success===null
                  ? ("Unknown")
                  : (satellite.success
                      ? (<FontAwesomeIcon icon={faCheck} />)
                      : (<FontAwesomeIcon icon={faTimes} />)
                    )
              }
              </span>

*/

/*
<div
         className="accordion__text"
         dangerouslySetInnerHTML={{ __html: props.content }}
       />
*/