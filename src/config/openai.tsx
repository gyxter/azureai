const requiredEnvVars = {
  ENDPOINT: process.env.REACT_APP_AZURE_OPENAI_ENDPOINT,
  API_KEY: process.env.REACT_APP_AZURE_OPENAI_API_KEY,
  DEPLOYMENT_NAME: process.env.REACT_APP_AZURE_OPENAI_DEPLOYMENT,
  API_VERSION: process.env.REACT_APP_AZURE_OPENAI_API_VERSION,
} as const;

const missingVars = Object.entries(requiredEnvVars)
  .filter(([, v]) => !v)
  .map(([k]) => k);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(", ")}. ` +
      "Check your .env.local file.",
  );
}

const CONFIG_OPENAI = requiredEnvVars as Record<keyof typeof requiredEnvVars, string>;

export default CONFIG_OPENAI;
