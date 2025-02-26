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


export default function App() {
  /* let [userInput, setUserInput] = useState<any | null>(null); */
  const [processedOutput, setProcessedOutput] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [assembledPrompt, setAssembledPrompt] = useState("");

  const handleToggleShowCode = ()=> {
    showCode ? setShowCode(false) : setShowCode(true);
  }

  const handleDownload = ()=> {
    //fileDownload(processedOutput, processedOutput);
    window.open(processedOutput, "_blank");
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

  async function handleSubmit(_assembledPrompt: any, getSize: string) {
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
    const n = 1;
    const size = getSize;
    try {
      await client
        .getImages(CONFIG_OPENAI.DEPLOYMENT_NAME, _assembledPrompt, { n, size })
        .then((results) => {
          setShowLoading(false);
          for (const image  of results.data) {
            setProcessedOutput(`${image.url}`);
          }
        });
    } catch (error: any) {
      setShowLoading(false);
      alert(error.message);
    }
  }



  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="my-3">Dall-e 3 test:</h1>
          </div>

          <Form showLoading={showLoading} handleSubmit={(assembledPrompt,getSize)=>handleSubmit(assembledPrompt,getSize)}/>

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
              {/* <div id="prompt">
                <strong>{assembledPrompt}</strong>
              </div> */}
            </div>

            {showLoading && <Loading />}

          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* render output */}
            {renderOutput}
          </div>
        </div>
      </div>
    </div>
  );
}
