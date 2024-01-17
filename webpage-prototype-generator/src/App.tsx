import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { useState } from "react";
import OPENAI from "./config/openai";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

//https://www.npmjs.com/package/js-file-download
import fileDownload from "js-file-download";

import Loading from "./components/Loading";
import CodeRender from "./components/CodeRender";
import HtmlRender from "./components/HtmlRender";

export default function App() {
  let [userInput, setUserInput] = useState<any | null>(null);
  const [processedOutput, setProcessedOutput] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);

  async function callOpenAIAPI() {
    const client = new OpenAIClient(
      OPENAI.ENDPOINT,
      new AzureKeyCredential(OPENAI.API_KEY)
    );
    // show loading before api call
    setShowLoading(true);

    //reset value before submit
    setProcessedOutput("");
    setShowCode(false);

    //api call
    try {
      await client
        .getCompletions("deployment-openai-dev-j", userInput, {
          maxTokens: 2000,
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

  function handleToggleShowCode() {
    showCode ? setShowCode(false) : setShowCode(true);
  }

  function handleDownload() {
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

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="my-3">Webpage prototype Generator:</h1>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label" htmlFor="page">
                Page:{" "}
              </label>
              <br />
              <select id="mood" name="mood" className="form-select">
                <option value="HomePage">Home page</option>
                <option value="About">About</option>
                <option value="Services">Services</option>
                <option value="Contact">Contact</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="mood">
                Mood:{" "}
              </label>
              <br />
              <select id="mood" name="mood" className="form-select">
                <option value="Professional">Professional</option>
                <option value="Fancy">Fancy</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="thcolor">
                Theme:{" "}
              </label>
              <br />
              <select id="thcolor" name="thcolor" className="form-select">
                <option value="Dark">Dark</option>
                <option value="Light">Light</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="tailored">
                Tailor your webpage:{" "}
              </label>
              <textarea
                className="form-control form-textarea"
                id="inputText"
                name="inputText"
                placeholder="e.g. a portfolio website html with design styling and placeholder images"
                onChange={(e) => {
                  setUserInput(e.target.value);
                }}
              ></textarea>
            </div>
            <button
              type="submit"
              id="submitBtn"
              className="btn btn-primary"
              disabled={showLoading ? true : false}
              onClick={callOpenAIAPI}
            >
              Generate
            </button>
          </div>
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
                <strong>{userInput}</strong>
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
