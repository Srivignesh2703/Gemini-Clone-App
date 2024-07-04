import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

  let [userInput, setUserInput] = useState("");
  let [recentPrompt, setRecentPrompt] = useState("");
  let [prevPrompts, setPrevPrompts] = useState([]);
  let [showResult, setShowResult] = useState(false);
  let [loading, setLoading] = useState(false);
  let [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev+nextWord);
    }, 50*index);
  }

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  }
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    // setRecentPrompt(userInput);
    // setPrevPrompts(prev=>[...prev, userInput]);
    let response;
    if(prompt !== undefined){
      response = await run(prompt);
      setRecentPrompt(prompt);
    }else{
      setPrevPrompts(prev => [...prev, userInput]);
      setRecentPrompt(userInput);
      response = await run(userInput);
    }
    // const response = await run(userInput);
    let updatedResponse = response.split("**");
    let newResponse = "";
    for(let i=0; i<updatedResponse.length; i++){
      if(i % 2 == 0){
        newResponse += updatedResponse[i];
      }else{
        newResponse += "<b>"+ updatedResponse[i] +"</b>"
      }
    }
    let newResponse2 = newResponse.split("*").join("<br/>")
    let responseArray = newResponse2.split(" ");
    for(let j=0; j<responseArray.length; j++){
      const newWord = responseArray[j];
      delayPara(j, newWord + " ");
    }
    setLoading(false);
    setUserInput("");
  }
  const contextValue = {
    onSent,
    prevPrompts,
    setPrevPrompts,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    userInput,
    setUserInput,
    newChat
  }
  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
} 
export default ContextProvider;