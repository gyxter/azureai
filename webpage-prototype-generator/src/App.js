import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { useState } from "react";
import Loading from "./components/Loading";

import OPENAI_ENDPOINT from "./config/openai-endpoint";
import OPENAI_API_KEY from "./config/openai-api-key";

import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

function App() {
  const [userInput, setUserInput] = useState("");
  const [processedOutput, setProcessedOutput] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);

  async function callOpenAIAPI() {
    const client = new OpenAIClient(
      OPENAI_ENDPOINT,
      new AzureKeyCredential(OPENAI_API_KEY)
    );
          
    setShowLoading(true);

    try {
      await client
        .getCompletions("deployment-openai-dev-j", userInput, {
          maxTokens: 2000,
        })
        .then((result) => {
          setShowLoading(false);
          for (const choice of result.choices) {
            console.log(choice.text);
            console.log(result);
            setProcessedOutput(choice.text);
          }
        });
    } catch (error) {
      setShowLoading(false);
      console.log(error);
    }
  }

  function handleToggleShowCode(){
    showCode ? setShowCode(false) : setShowCode(true);
    
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
                type="text"
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

            { processedOutput != "" &&
              <div>
              <a href="#view" id="toggleBtn" onClick={handleToggleShowCode}>
                View {showCode? "Render" : "Code"}
              </a>
              <div id="prompt"><strong>{userInput}</strong></div>
              </div>
            }
            

            {(processedOutput != "" && showCode) &&
              <div id="codeRender" className="toggleView">
                <pre>{processedOutput}</pre>
              </div>
            }
            
                
            {showLoading && <Loading />}

            {(processedOutput != "" && !showCode) &&
              <div id="htmlRender" className="toggleView">
                <iframe
                  title="html render"
                  srcDoc={processedOutput}
                  className=""
                ></iframe>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
