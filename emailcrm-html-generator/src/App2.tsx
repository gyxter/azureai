import React, { useState } from 'react'
import axios from 'axios'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

const AzureOpenAIGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('')
  const [generatedHtml, setGeneratedHtml] = useState('')

  const generateHtml = async () => {
    setGeneratedHtml(' ')
    try {
      const response = await axios.post(
        'https://ai-sampler.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-05-01-preview',
        {
          messages: [
            { role: "system", content: "You are an expert front-end developer that generates HTML email newsletters." },
            { role: "user", content: `Create a cross-client compatible HTML email newsletter template with inline styling. Respond with html only. Content: ${prompt}` }
          ],
          max_tokens: 3000,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': 'e27045c6c5f4408db31d464f9d98e843',
          },
        }
      )

      setGeneratedHtml(response.data.choices[0].message.content)
    } catch (error) {
      console.error('Error generating HTML:', error)
    }
  }

  return (
    <div>
      <h2>Azure OpenAI HTML Email Newsletter Generator</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your newsletter content prompt"
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={generateHtml}>Generate HTML</button>
      <br />
      <Tabs>
        <TabList>
        <Tab>Preview</Tab>
          <Tab>Generated HTML</Tab>
        </TabList>
        <TabPanel>
          <div dangerouslySetInnerHTML={{ __html: generatedHtml }} />
        </TabPanel>
        <TabPanel>
          <pre>{generatedHtml}</pre>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default AzureOpenAIGenerator