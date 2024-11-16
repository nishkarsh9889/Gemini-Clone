import { React, useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Sidebar.css";
import { Context } from "../../context/Context";

function Sidebar() {
  const [extended, setExtended] = useState(true);
  const { onSent, prevPrompts, setRecentPrompts, newChat, setInput } =
    useContext(Context);

  // FOR EXTEND/COLLAPSE THE SIDEBAR
  const extendSidebar = () => {
    setExtended((prev) => !prev);
  };

  // FOR LOADING PREVIOUS PROMPTS
  const loadPrompt = async (prompt) => {
    setInput(prompt);
    setRecentPrompts(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={extendSidebar}
          className="menu"
          src={assets.menu_icon}
        ></img>
        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon}></img>
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className="recent-entry"
                >
                  <img src={assets.history_icon}></img>
                  <p>{item.slice(0, 18)}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon}></img>
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon}></img>
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon}></img>
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
