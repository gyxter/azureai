import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { useState } from "react";
/* import Loading from "./components/Loading"; */
import HtmlRender from "./components/HtmlRender";
import { Form } from "./components/Form";

import CONFIG_OPENAI from "./config/openai";
/* import { OpenAIClient, AzureKeyCredential } from "@azure/openai"; */
import { AzureOpenAI } from "openai"
/* import { GoogleGenerativeAI } from "@google/generative-ai"; */

export default function App() {
  const [processedOutput,setProcessedOutput] = useState<unknown>();
  const [showLoading, setShowLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [assembledPrompt, setAssembledPrompt] = useState("");
  
  /* const genAI = new GoogleGenerativeAI(
    CONFIG_OPENAI.API_KEY
  ); */
  /* const fetchData = async (assembledPrompt: any) => {
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
  async function handleSubmitGoogle(_assembledPrompt: any) {
    // show loading before api call
    setAssembledPrompt(_assembledPrompt);
    fetchData(_assembledPrompt);
  }; */

  async function handleSubmitGpt4(_assembledPrompt: string) {
    setAssembledPrompt(_assembledPrompt);
    const endpoint = CONFIG_OPENAI.ENDPOINT;
    const apiKey = CONFIG_OPENAI.API_KEY;
    const apiVersion = CONFIG_OPENAI.API_VERSION;
    const deployment = CONFIG_OPENAI.DEPLOYMENT_NAME; //This must match your deployment name.
    const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment, dangerouslyAllowBrowser: true});
    // show loading before api call
    setShowLoading(true);

    setDataLoaded(false)
    //reset value before submit
    setProcessedOutput("");

    //api call
    try {
      await client.chat.completions.create({
        model: "gpt-4o",
        max_tokens: 4096,
        messages: [
            {
              role: "system",
              content: "You are an expert SEO Data Analyst and Front end developer",
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: _assembledPrompt+" ---From previous post, generate 5 values of Meta title, Meta description, Meta keywords and URL Structure and then add them as table rows inside the <tbody> here:"+
                  "'<table><thead><tr><th>Meta title</th><th>Meta description</th><th>URL Structure</th><th>Meta keywords</th></tr></thead><tbody></tbody></table>'. Only respond with HTML code.---",
                },
              ]
            },
          ]
        })
        .then((result) => {
          setShowLoading(false);
          setDataLoaded(true);
          for (const choice of result.choices) {
            setProcessedOutput(choice.message.content);
          }
        });
    } catch (error) {
      setShowLoading(false);
      console.log(error);
    }
  }
  /* async function handleSubmit(_assembledPrompt: any) {
    setAssembledPrompt(_assembledPrompt);

    const client = new OpenAIClient(
      CONFIG_OPENAI.ENDPOINT,
      new AzureKeyCredential(CONFIG_OPENAI.API_KEY)
    );
    // show loading before api call
    setShowLoading(true);

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
  } */

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="my-3">SEO MetaData Generator:</h1>
          </div>
          <Form showLoading={showLoading} handleSubmit={(assembledPrompt)=>handleSubmitGpt4(assembledPrompt)}/>
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
