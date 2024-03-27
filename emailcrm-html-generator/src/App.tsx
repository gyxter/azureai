import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { useState } from "react";

//https://www.npmjs.com/package/js-file-download
import fileDownload from "js-file-download";

import Loading from "./components/Loading";
import CodeRender from "./components/CodeRender";
import HtmlRender from "./components/HtmlRender";
import { Form } from "./components/Form";

import CONFIG_OPENAI from "./config/openai";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
export default function App() {
  /* let [userInput, setUserInput] = useState<any | null>(null); */
  const [processedOutput, setProcessedOutput] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [assembledPrompt, setAssembledPrompt] = useState("");

  const genAI = new GoogleGenerativeAI(
    CONFIG_OPENAI.API_KEY
  );

  const handleToggleShowCode = ()=> {
    showCode ? setShowCode(false) : setShowCode(true);
  }

  const handleDownload = ()=> {
    fileDownload(processedOutput, "sample.html");
  }

  let renderOutput;
  if (processedOutput !== "") {
    if (showCode) {
      renderOutput = (
        <CodeRender processedOutput={processedOutput} />
      );
    } else {
      renderOutput = (
        <HtmlRender processedOutput={processedOutput} />
      );
    }
  }
  const fetchData = async (assembledPrompt: any) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = assembledPrompt;
    setShowLoading(true);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setProcessedOutput(text);
    setShowLoading(false);
  };
  async function handleSubmit(_assembledPrompt: any) {
    setAssembledPrompt(_assembledPrompt);
    fetchData(_assembledPrompt);
  };

  async function handleSubmit1(_assembledPrompt: any) {
    setAssembledPrompt(_assembledPrompt);

    const client = new OpenAIClient(
      CONFIG_OPENAI.ENDPOINT,
      new AzureKeyCredential(CONFIG_OPENAI.API_KEY)
    );
    // show loading before api call
    setShowLoading(true);

    //reset value before submit
    setProcessedOutput("");
    setShowCode(false);

    //api call
    try {
      await client
        .getCompletions(CONFIG_OPENAI.DEPLOYMENT_NAME, _assembledPrompt, {
          maxTokens: 5000,
        })
        .then((result) => {
          setShowLoading(false);
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
            <h1 className="my-3">Email CRM HTML Generator:</h1>
          </div>

          <Form showLoading={showLoading} handleSubmit={(assembledPrompt)=>handleSubmit(assembledPrompt)}/>

        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={processedOutput !== "" ? "d-block" : "d-none"}>
              <a href="#view" id="toggleBtn" onClick={handleToggleShowCode}>
                View {showCode ? "Render" : "Code"}
              </a>
              <button id="dlBtn" type="button" className="btn btn-info ml-2" onClick={handleDownload}>
                Download
              </button>
              <div id="prompt">
                <strong>{assembledPrompt}</strong>
              </div>
            </div>

            {showLoading && <Loading />}

            {/* render output */}
            {renderOutput}
          </div>
        </div>
      </div>
    </div>
  );
}
