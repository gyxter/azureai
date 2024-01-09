const express = require('express');
const bodyParser = require('body-parser');
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
//auth keys are stored as envi vars
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] ;
const azureApiKey = process.env["AZURE_OPENAI_KEY"] ;

const app = express();
const port = 3000;

// Use middleware to parse the body of POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const userInput = req.body.inputText;
  // You can perform any processing on the user input here
  let processedOutput = "";
  async function main() {
    console.log("== Get completions Sample ==");
    const completionOpts = {
      maxTokens: 2000
    }
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    const deploymentId = "sampler";
    const result = await client.getCompletions(deploymentId, userInput, completionOpts);
  
    for (const choice of result.choices) {
      console.log(choice.text);
      console.log(result);
      processedOutput = choice.text;
      res.send(processedOutput);
    }
    /* const size = "256x256";
    const n = 3;
    
    const results = await client.getImages(userInput, { n, size });

    for (const image of results.data) {
      console.log(`Image generation result URL: ${image.url}`);
      processedOutput=`Image generation result URL: ${image.url}`;
      res.send(processedOutput);
    } */
  }
  
  main().catch((err) => {
    console.error("The sample encountered an error:", err);
  });
  
  // Display the processed output in the response
  module.exports = { main };
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});