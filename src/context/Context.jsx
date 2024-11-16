import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompts, setRecentPrompts] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  //  FOR TYPING EFFECT
  const delayPara = (index, nextword) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextword);
    }, 30 * index);
  };

  // FOR NEW CHAT
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  // MAIN FUNCTION
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setInput("");

    // let response;
    // if (prompt) {
    //   setRecentPrompts(prompt);
    //   setPrevPrompts((prev) => [...prev, prompt]);
    //   response = await runChat(prompt);
    // } else {
    //   setPrevPrompts((prev) => [...prev, input]);
    //   setRecentPrompts(input);
    //   response = await runChat(input);
    // }

    // FOR SAVING ONLY UNIQUE PROMPTS IN RECENT
    const currentPrompt = prompt || input;
    if (!recentPrompts.includes(currentPrompt)) {
      setRecentPrompts(currentPrompt);
    }
    if (prompt) {
      if (!prevPrompts.includes(prompt)) {
        setPrevPrompts((prev) => [...prev, prompt]);
      }
    } else {
      if (!prevPrompts.includes(input)) {
        setPrevPrompts((prev) => [...prev, input]);
      }
    }
    const response = await run(currentPrompt);

    let responseArray = response.split("**");
    let newArray = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newArray += responseArray[i];
      } else {
        newArray += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newReponse = newArray.split("*").join("</br>");
    let newResponseArray = newReponse.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false);
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompts,
    recentPrompts,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
