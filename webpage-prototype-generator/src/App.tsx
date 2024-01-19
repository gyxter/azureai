import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { useState } from "react";
import CONFIG_OPENAI from "./config/openai";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

//https://www.npmjs.com/package/js-file-download
import fileDownload from "js-file-download";

import Loading from "./components/Loading";
import CodeRender from "./components/CodeRender";
import HtmlRender from "./components/HtmlRender";

export default function App() {
  /* let [userInput, setUserInput] = useState<any | null>(null); */
  const [processedOutput, setProcessedOutput] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const [selectedOption, setSelectedOption] = useState<string>('Home Page');
  const [selectedOption1, setSelectedOption1] = useState<string>('Professional');
  const [checkBoxValues, setCheckBoxValues] = useState<{ [key: string]: boolean }>({});
  const [textAreaValue, setTextAreaValue] = useState<any | null>('');
  const [radioOption, setRadioOption] = useState<string>('');

  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleMoodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption1(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioOption(event.target.value);
  };

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBoxValues({
      ...checkBoxValues,
      [event.target.name]: event.target.checked,
    });
  };

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value);
  };

  const assembledPrompt : any = `Generate responsive html for a ${selectedOption} that has a header and footer section and also with the following attributes:
    ${selectedOption1} theme
    ${Object.keys(checkBoxValues).length > 0 ? ', has '+ Object.keys(checkBoxValues).filter((key) => checkBoxValues[key]).join(', ') : ''}
    ${textAreaValue.length !== 0 ? ', '+textAreaValue : ''}
    , has in page css styling, 
    ${radioOption.length !== 0 ? radioOption : ''}
  `;
  async function callOpenAIAPI() {
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
        .getCompletions(CONFIG_OPENAI.DEPLOYMENT_NAME, assembledPrompt, {
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
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label" htmlFor="page">
                Page:{" "}
              </label>
              <br />
              <select id="page" name="page" className="form-select" value={selectedOption} onChange={handlePageChange}>
                <option value="Home Page">Home page</option>
                <option value="About Page">About</option>
                <option value="Services Page">Services</option>
                <option value="Contact Page">Contact</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="mood">
                Mood:{" "}
              </label>
              <br />
              <select id="mood" name="mood" className="form-select" value={selectedOption1} onChange={handleMoodChange}>
                <option value="Professional">Professional</option>
                <option value="Fancy">Fancy</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="components">
                Components:{" "}
              </label>
              <br />
              <label htmlFor="cta" className="me-3">
                <input
                  type="checkbox"
                  name="cta"
                  id="cta"
                  checked={checkBoxValues.cta || false}
                  onChange={handleCheckBoxChange}
                  className="me-1"
                />
                CTAs
              </label>

              <label htmlFor="hero" className="me-3">
                <input
                  type="checkbox"
                  name="hero"
                  id="hero"
                  checked={checkBoxValues.hero || false}
                  onChange={handleCheckBoxChange}
                  className="me-1"
                />
                Hero Banner
              </label>

              <label htmlFor="carousel">
                <input
                  type="checkbox"
                  name="carousel"
                  id="carousel"
                  checked={checkBoxValues.carousel || false}
                  onChange={handleCheckBoxChange}
                  className="me-1"
                />
                Carousel
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="plImages">
                Placeholder images:{" "}
              </label>
              <br />
              <label htmlFor="plImagesY" className="me-3">
                <input
                  type="radio"
                  name="plImages"
                  id="plImagesY"
                  value="with placeholder images"
                  checked={radioOption === 'with placeholder images'}
                  onChange={handleRadioChange}
                  className="me-1"
                />
                Yes
              </label>

              <label htmlFor="plImagesN">
                <input
                  type="radio"
                  name="plImages"
                  value=""
                  id="plImagesN"
                  checked={radioOption === ''}
                  onChange={handleRadioChange}
                  className="me-1"
                />
                No
              </label>
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
                value={textAreaValue} 
                onChange={handleTextAreaChange}
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
