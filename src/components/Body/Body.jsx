import React, { useContext } from "react";
import "./Body.css";
import "../../assets/assets"
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context"

const Body = () => {

  const {onSent, recentPrompt, showResult, loading, resultData, setUserInput, userInput} = useContext(Context); 

  let changeInput = (e) => {
    setUserInput(e.target.value);
  }
  return(
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div> 

      <div className="main-container">
        {!showResult ?
        <>
         <div className="greet">
          <p><span>Hello, Dev.</span></p>
          <p>How can I help you today?</p>
        </div>

        <div className="suggestion-cards">
          <div className="card">
            <p>Suggest beautiful places on an upcoming road trip.</p>
            <img src={assets.compass_icon} alt="" />
          </div>

          <div className="card">
            <p>Briefly Summarize this concept: Deep Learning</p>
            <img src={assets.bulb_icon} alt="" />
          </div>

          <div className="card">
            <p>Brainstorm team bonding activities for our work retreat</p>
            <img src={assets.message_icon} alt="" />
          </div>

          <div className="card">
            <p>Improve the readablity of the following code: </p>
            <img src={assets.code_icon} alt="" />
          </div>
      </div>
      </> :
      <div className="result">
        <div className="result-title">
          <img src={assets.user_icon} alt="" />
          <p>{recentPrompt}</p>
        </div>
        <div className="result-data">
          <img src={assets.gemini_icon} alt="" />

          {loading? <div className="loader">
            <hr />
            <hr />
            <hr />
          </div> 
          : <p dangerouslySetInnerHTML={{__html: resultData}}></p>}
        </div>
      </div>
      }

      <div className="main-bottom">
        <div className="search-box">
          <input type="text" name="user-input" id=""  placeholder="Ask anything..." onChange={(e) => changeInput(e)}/>
          <div>
            <img src={assets.gallery_icon} alt="" />
            <img src={assets.mic_icon} alt="" />
            <img src={assets.send_icon} alt="" onClick={() => onSent()}/>
          </div>
        </div>
        <p className="bottom-info">Sometimes the info provided may be inaccurate, including information about people, so double-check its response. </p>
      </div>
      </div>
    </div>
  )
}

export default Body;
