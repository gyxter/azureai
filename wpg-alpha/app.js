const express = require('express');
const bodyParser = require('body-parser');
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
//auth keys are stored as envi vars
const endpoint = "https://ai-sampler.openai.azure.com/";//process.env["AZURE_OPENAI_ENDPOINT"] ;
const azureApiKey = "e27045c6c5f4408db31d464f9d98e843";//process.env["AZURE_OPENAI_KEY"] ;

const app = express();
const port = 3000;

// Use middleware to parse the body of POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Serve the static HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
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