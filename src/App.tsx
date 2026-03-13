import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import HtmlRender from "./components/HtmlRender";
import { Form } from "./components/Form";
import CONFIG_OPENAI from "./config/openai";
import { AzureOpenAI } from "openai";
import { URL_REGEX } from "./utils/regex";
import { OriginalMeta } from "./types";

// Instantiated once outside the component to avoid recreating on every render
const client = new AzureOpenAI({
  endpoint: CONFIG_OPENAI.ENDPOINT,
  apiKey: CONFIG_OPENAI.API_KEY,
  deployment: CONFIG_OPENAI.DEPLOYMENT_NAME,
  apiVersion: CONFIG_OPENAI.API_VERSION,
  dangerouslyAllowBrowser: true,
});

const CORS_PROXY = "https://api.allorigins.win/get?url=";

const fetchHtmlViaProxy = async (url: string): Promise<string> => {
  const response = await fetch(CORS_PROXY + encodeURIComponent(url));
  if (!response.ok) throw new Error(`Proxy fetch failed: ${response.status}`);
  const data = await response.json();
  return data.contents as string;
};

const extractMetaFromDoc = (doc: Document): OriginalMeta => ({
  title:
    doc.querySelector<HTMLMetaElement>("meta[property='og:title']")?.content ??
    "",
  description:
    doc.querySelector<HTMLMetaElement>("meta[name='description']")?.content ??
    "",
  keywords:
    doc.querySelector<HTMLMetaElement>("meta[name='keywords']")?.content ?? "",
  url:
    doc.querySelector<HTMLMetaElement>("meta[property='og:url']")?.content ??
    "",
});

const extractTextFromDoc = (doc: Document): string => {
  const h1 = doc.querySelector<HTMLElement>("main h1")?.textContent ?? "";
  const h2 = doc.querySelector<HTMLElement>("main h2")?.textContent ?? "";
  const pars = Array.from(doc.querySelectorAll<HTMLElement>("main p"))
    .map((el) => el.textContent)
    .join(" ");
  return `${h1} ${h2} ${pars}`.trim();
};

export default function App() {
  const [processedOutput, setProcessedOutput] = useState<string>("");
  const [showLoading, setShowLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState<string>("");
  const [originalMeta, setOriginalMeta] = useState<OriginalMeta | null>(null);

  async function handleSubmit(input: string) {
    setShowLoading(true);
    setDataLoaded(false);
    setProcessedOutput("");
    setError("");
    setOriginalMeta(null);

    let prompt = input;

    // Fetch and parse HTML once — reuse for both prompt content and meta tags
    if (URL_REGEX.test(input)) {
      try {
        const html = await fetchHtmlViaProxy(input);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const textContent = extractTextFromDoc(doc) || input;
        prompt = `---Post: ${textContent}---`;
        setOriginalMeta(extractMetaFromDoc(doc));
      } catch (err) {
        console.warn(
          "Failed to fetch URL content, using raw URL as prompt:",
          err,
        );
      }
    }

    try {
      const result = await client.chat.completions.create({
        model: CONFIG_OPENAI.DEPLOYMENT_NAME,
        max_completion_tokens: 4096,
        messages: [
          {
            role: "system",
            content:
              "You are an expert SEO data analyst and front end developer. Given the following Post or URL of the page article, generate 5 values of Meta title, description, keywords and URL Structure and then add it in an HTML table format. " +
              "Only respond with HTML code without the ```html.",
          },
          { role: "user", content: prompt },
        ],
      });

      const content = result.choices[0]?.message.content ?? "";
      setProcessedOutput(content);
      setDataLoaded(true);
    } catch (err: any) {
      setError(err.message ?? "An unexpected error occurred.");
    } finally {
      setShowLoading(false);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="my-3">SEO MetaData Generator:</h1>
          </div>
          <Form showLoading={showLoading} handleSubmit={handleSubmit} />
        </div>
        {error && (
          <div className="row">
            <div className="col-12">
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            </div>
          </div>
        )}
        <div className="row result-cont">
          <div className="col-12">
            <HtmlRender
              dataLoaded={dataLoaded}
              processedOutput={processedOutput}
              originalMeta={originalMeta}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
