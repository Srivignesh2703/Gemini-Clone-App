import React, { useContext, useState } from "react";
import "./SideBar.css";
import "../../assets/assets"
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";


const SideBar = () => {

  const [expand, setExpand] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  }

  let toggleExpand = () => {
    setExpand(!expand);
  }
  return (
    <div className="sideBar">
      <div className="top">
        <img className="menu" src={assets.menu_icon} alt="" onClick={() => toggleExpand()}/>
        <div className="newChat" onClick={() => newChat()}>
          <img src={assets.plus_icon} alt="" />
          {expand && <p>New Chat</p>}
        </div>

        {expand && <div className="recent">
          <p className="recent-title">Recent</p>
          {prevPrompts.map((item, index) => {
            return (
              <div onClick={() => loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)} ...</p>
              </div>
            )
          })}
        </div>}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {expand && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {expand && <p>History</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {expand && <p>Settings</p>}
        </div>

      </div>
    </div>
  )
}

export default SideBar;