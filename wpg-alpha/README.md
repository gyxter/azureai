# azureai
1. create account in https://portal.azure.com
2. setup azure openai and generate developer keys
3. deploy model in https://oai.azure.com/portal/
4. use deployment name as deploymentId in app.js

# set api endpoint and keys via envi vars
1. setx AZURE_OPENAI_KEY "REPLACE_WITH_YOUR_KEY_VALUE_HERE"
2. setx AZURE_OPENAI_ENDPOINT "REPLACE_WITH_YOUR_ENDPOINT_HERE"

# install node modules
npm install

# run app
npm start
