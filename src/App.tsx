import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
/* import Loading from "./components/Loading"; */
import HtmlRender from "./components/HtmlRender";
import { Form } from "./components/Form";

import CONFIG_OPENAI from "./config/openai";
import { AzureOpenAI } from "openai"
/* import { GoogleGenerativeAI } from "@google/generative-ai"; */

export default function App() {
  const [processedOutput,setProcessedOutput] = useState<string>("");
  const [showLoading, setShowLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const urlRegex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/;
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
  const endpoint = CONFIG_OPENAI.ENDPOINT;
  const apiKey = CONFIG_OPENAI.API_KEY;
  const apiVersion = CONFIG_OPENAI.API_VERSION;
  const deployment = CONFIG_OPENAI.DEPLOYMENT_NAME; //This must match your deployment name.
  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment, dangerouslyAllowBrowser: true});
  const getContentFromUrl = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url, { mode: "no-cors" })
      const html = await response.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      
      const mainH1 = doc.querySelector<HTMLElement>("main h1")?.innerText || ""
      const mainH2 = doc.querySelector<HTMLElement>("main h2")?.innerText || ""
      const mainP = doc.querySelectorAll<HTMLElement>("main p")
      const pars = Array.from(mainP).map(elem => elem.innerText).join(' ')
      
      return `${mainH1} ${mainH2} ${pars}`.trim()
    } catch (error) {
      console.warn('Error fetching content:', error)
      return ""
    }
  }


  async function handleSubmitGpt4(_assembledPrompt: any) {
    //setAssembledPrompt(_assembledPrompt);
    // show loading before api call
    setShowLoading(true);

    setDataLoaded(false)
    //reset value before submit
    setProcessedOutput("");
   //console.log('out of gpt', _assembledPrompt);
    const queryURL = _assembledPrompt ?? "";
    if(queryURL.match(urlRegex)){
      _assembledPrompt = await getContentFromUrl(_assembledPrompt) || _assembledPrompt
      
    }
    //api call
    try {      
     //console.log('for gpt', _assembledPrompt);
      await client.chat.completions.create({
        model: "gpt-4o",
        max_tokens: 4096,
        messages: [
            {
              role: "system",
              content: "You are an expert SEO data analyst and front end developer. Given the following Post or URL of the page article, generate 5 values of Meta title, description, keywords and URL Structure and then add it in an HTML table format. "+
              "Only respond with HTML code without the ```html.",
            },
            {
              role: "user",
              content: _assembledPrompt,
              
            },
          ]
        })
        .then((result) => {
          setShowLoading(false);
          setDataLoaded(true);
          
          for (const choice of result.choices) {
            if (choice.message.content !== null) {
              setProcessedOutput(choice.message.content);
            }
          }
          console.log(queryURL)
          if(queryURL.match(urlRegex)){
            fetch(queryURL,{
              mode: "no-cors"
            })
              .then(response => response.text())
              .then(html => {
                  const parser = new DOMParser();
                  const doc = parser.parseFromString(html, 'text/html');
                  const htmlRender = document.getElementById('htmlRender')
                  console.log(html)
                  const ogTitleMeta = doc.querySelector<HTMLMetaElement>("meta[property='og:title']");
                  const ogTitle = ogTitleMeta ? ogTitleMeta.content : "";
                  const descriptionMeta = doc.querySelector<HTMLMetaElement>("meta[name='description']");
                  const description = descriptionMeta ? descriptionMeta.content : "";
                  const keywordsMeta = doc.querySelector<HTMLMetaElement>("meta[name='keywords']");
                  const keywords = keywordsMeta ? keywordsMeta.content : "";
                  const ogUrlMeta = doc.querySelector<HTMLMetaElement>("meta[property='og:url']");
                  const ogUrl = ogUrlMeta ? ogUrlMeta.content : "";
                  const metaTags = [ogTitle, description, keywords, ogUrl];
                  if (htmlRender) {
                    htmlRender.innerHTML = `
                      <table>
                        <thead>
                          <tr>
                            <th>Original meta title</th>
                            <th>Original Meta description</th>
                            <th>Original Meta keywords</th>
                            <th>Original URL Structure</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>${metaTags[0]}</td>
                            <td>${metaTags[1]}</td>
                            <td>${metaTags[2]}</td>
                            <td>${metaTags[3]}</td>
                          </tr>
                        </tbody>
                      </table>
                    `+htmlRender.innerHTML;
                  }
                  
                }
              ).catch(function (err) {
                // There was an error
                console.warn('Something went wrong.', err);
              });
          }
          
        });
        
    } catch (error:any) {
      setShowLoading(false);
      alert(error.message);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="my-3">SEO MetaData Generator:</h1>
          </div>
          <Form showLoading={showLoading} handleSubmit={(assembledPrompt)=>handleSubmitGpt4(assembledPrompt)}/>
        </div>
        <div className="row result-cont">
          <div className="col-12">
           {/*  {showLoading && <Loading />} */}

            {/* render output */}
            <HtmlRender {...{dataLoaded, processedOutput}} />
          </div>
        </div>
      </div>
    </div>
  );
}