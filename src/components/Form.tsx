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
    const lengthError = textAreaValue.length < 1600 ? "error" : "d-none";
    function handleFormSubmit() {
        let promptGpt35Instruct = `From this Post, ` +
            `Generate HTML table code with 5 rows. ` +
            `Each row MUST have the values of the table columns: ` +
            `Meta title, Meta description, URL Structure and Meta keywords.`

        let promptGpt35 = `From this Post, generate 5 values of Meta title, Meta description, URL Structure and Meta keywords and add them as table rows inside <tbody> below:` +
            `<table><thead><tr><th>Meta title</th><th>Meta description</th><th>URL Structure</th><th>Meta keywords</th></tr></thead><tbody></tbody></table>` +
            `Add this before the table: "<h3>Here are some Suggestions</h3>"`

        let assembledPrompt =
            `---Post: """${textAreaValue.length !== 0 ? ' ' + textAreaValue : ''}"""---` +
            `---` + promptGpt35 + `---`
        /*  `From this article: Come up with SEO Metadata and list 5 samples in an HTML table format with 5 columns containing:`+
         `1. Title`+
         `2. Descrption`+
         `3. URL structure`+
         `4. Page ranking`+
         `5. A list of keywords.`; */
        if(textAreaValue.length > 1600) {
            handleSubmit(assembledPrompt);
        } else {
            return lengthError;
        }

    }

    return (
        <div>
            <div className="col-12">
                <div className="mb-3">
                    <label className="form-label" htmlFor="tailored">
                        <strong>Paste your article here:</strong>
                    </label>
                    <textarea
                        className="form-control form-textarea "
                        id="inputText"
                        name="inputText"
                        placeholder=""
                        onChange={handleTextAreaChange}
                    >
                    </textarea>
                    <p className={"my-2 "+lengthError}>Note: Article must contain 1600 or more characters.</p>
                </div>
                <button
                    type="button"
                    id="submitBtn"
                    className="btn btn-primary "
                    disabled={showLoading || textAreaValue.length < 1600 ? true : false}
                    onClick={handleFormSubmit}
                >
                    <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" className="sparkle">
                        <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                    </svg>

                    <span className="text">Generate</span>
                </button>
            </div>
        </div>
    );
}
