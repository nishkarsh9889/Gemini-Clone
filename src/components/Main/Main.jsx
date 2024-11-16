import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";

function Main() {
  const {
    onSent,
    recentPrompts,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const [currentPrompt, setCurrentPrompt] = useState("");

  // CARD COMPONENT
  const handleCard = (prompt) => {
    setInput(prompt);
    setCurrentPrompt(prompt);
    onSent(prompt);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>
          Gemini <img className="icon" src={assets.gemini_icon}></img>
        </p>
        <img src={assets.user_icon}></img>
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hey, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCard(
                    "Suggest some beautiful places to see on a road trip in Ladakh"
                  )
                }
              >
                <p>
                  Suggest some beautiful places to see on a road trip in Ladakh
                </p>
                <img src={assets.compass_icon}></img>
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCard("Briefly summarize this concept: Global warming")
                }
              >
                <p>Briefly summarize this concept: Global warming</p>
                <img src={assets.bulb_icon}></img>
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCard("Greatest mystery movies of all time")
                }
              >
                <p>Greatest mystery movies of all time</p>
                <img src={assets.message_icon}></img>
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCard("How to improve the readability of any code?")
                }
              >
                <p>How to improve the readability of any code?</p>
                <img src={assets.code_icon}></img>
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon}></img>
              <p>{recentPrompts}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon}></img>
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim() !== "") {
                  onSent();
                }
              }}
              value={input}
              type="text"
              placeholder="Ask Gemini"
            ></input>
            <div>
              <img src={assets.gallery_icon} />
              <img src={assets.mic_icon} />
              {input ? (
                <img
                  onClick={() => {
                    if (input.trim() !== "") onSent();
                  }}
                  src={assets.send_icon}
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
