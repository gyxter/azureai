import React, { useState } from 'react'
import "../App.css";

interface FormProps {
    showLoading: boolean,
    handleSubmit: (assembledPrompt: string) => Promise<void>,
}
export function Form({ showLoading, handleSubmit }: FormProps) {
    const [textAreaValue, setTextAreaValue] = useState<any | null>('');

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(event.target.value);
    };
    function handleFormSubmit() {
       let promptGpt35Instruct = `From this Post, ` +
       `Generate HTML table code with 5 rows. `+
       `Each row MUST have the values of the table columns: `+
       `Meta title, Meta description, URL Structure and Meta keywords.`
       
       let promptGpt35 = `From this Post, generate 5 values of Meta title, Meta description, URL Structure and Meta keywords and add them as table rows inside <tbody> below:`+
       `<table><thead><tr><th>Meta title</th><th>Meta description</th><th>URL Structure</th><th>Meta keywords</th></tr></thead><tbody></tbody></table>`+
       `Add this before the table: "<h3>Here are some Suggestions</h3>"`

       let assembledPrompt = 
        `---Post: """${textAreaValue.length !== 0 ? ' ' + textAreaValue : ''}"""---` +
        `---`+promptGpt35+`---`
       /*  `From this article: Come up with SEO Metadata and list 5 samples in an HTML table format with 5 columns containing:`+
        `1. Title`+
        `2. Descrption`+
        `3. URL structure`+
        `4. Page ranking`+
        `5. A list of keywords.`; */

        handleSubmit(assembledPrompt);
    }

    return (
        <div>
            <div className="col-12">
                <div className="mb-3">
                    <label className="form-label" htmlFor="tailored">
                        <strong>Paste your article here:</strong>
                    </label>
                    <textarea
                        className="form-control form-textarea"
                        id="inputText"
                        name="inputText"
                        placeholder=""
                        onChange={handleTextAreaChange}
                    >
                    </textarea>
                </div>
                <button
                    type="button"
                    id="submitBtn"
                    className="btn btn-primary"
                    disabled={showLoading || textAreaValue.length === 0 ? true : false}
                    onClick={handleFormSubmit}
                >
                    Generate
                </button>
            </div>
        </div>
    );
}
