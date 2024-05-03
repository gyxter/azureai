import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { useState } from "react";

/* import Loading from "./components/Loading"; */
import HtmlRender from "./components/HtmlRender";
import { Form } from "./components/Form";

import CONFIG_OPENAI from "./config/openai";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

import { GoogleGenerativeAI } from "@google/generative-ai";

export default function App() {
  const [processedOutput, setProcessedOutput] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [assembledPrompt, setAssembledPrompt] = useState("");
  
  const genAI = new GoogleGenerativeAI(
    CONFIG_OPENAI.API_KEY
  );
  const fetchData = async (assembledPrompt: any) => {
    //reset value before submit
    setProcessedOutput("");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = assembledPrompt;
    setShowLoading(true);
    setDataLoaded(false)
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setDataLoaded(true)
    setProcessedOutput(text);
    setShowLoading(false);
  };
  async function handleSubmit1(_assembledPrompt: any) {
    // show loading before api call
    setAssembledPrompt(_assembledPrompt);
    fetchData(_assembledPrompt);
  };

  async function handleSubmit(_assembledPrompt: any) {
    setAssembledPrompt(_assembledPrompt);

    const client = new OpenAIClient(
      CONFIG_OPENAI.ENDPOINT,
      new AzureKeyCredential(CONFIG_OPENAI.API_KEY)
    );
    // show loading before api call
    setShowLoading(true);

    setDataLoaded(false)
    //reset value before submit
    setProcessedOutput("");

    //api call
    try {
      await client
        .getCompletions(CONFIG_OPENAI.DEPLOYMENT_NAME, _assembledPrompt, {
          maxTokens: 4000,
        })
        .then((result) => {
          setShowLoading(false);
          setDataLoaded(true);
          for (const choice of result.choices) {
            setProcessedOutput(choice.text);
          }
        });
    } catch (error) {
      setShowLoading(false);
      console.log(error);
    }
  }


  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="my-3">SEO MetaData Generator:</h1>
          </div>

          <Form showLoading={showLoading} handleSubmit={(assembledPrompt)=>handleSubmit(assembledPrompt)}/>

        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">

           {/*  {showLoading && <Loading />} */}

            {/* render output */}
            <HtmlRender dataLoaded={dataLoaded} processedOutput={processedOutput} />
          </div>
        </div>
      </div>
    </div>
  );
}
