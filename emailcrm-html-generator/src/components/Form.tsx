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

        let assembledPrompt1 = "Generate HTML email template with the following requirements:"+
            "1. Must have responsive layout." +
            "2. Must have header with subject." +
            "3. Must have pre-header." +
            "4. Must have lorem ipsum content with placeholder images." +
            "5. Must have column CTA." +
            "6. Must have footer." +
            "7. HTML code must be compatible to outlook, gmail, yahoo, IOS mail clients." +
            `${textAreaValue.length !== 0 ? ' 8. ' + textAreaValue : ''} `

        handleSubmit(assembledPrompt1);
    }

    return (
        <div className="row">
            
            <div className="col-md-6">
                <div className="mb-3">
                    <p>Default specifications:</p>
                    <ol>
                        <li>Must be responsive layout.</li>
                        <li>Must have header with subject.</li>
                        <li>Must have pre-header.</li>
                        <li>Must have lorem ipsum content with placeholder images.</li>
                        <li>Must have column CTA.</li>
                        <li>Must have footer.</li>
                        <li>HTML code must be compatible to outlook, gmail, yahoo, IOS mail clients.</li>
                    </ol> 
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="tailored">
                        Add some more details?:{" "}
                    </label>
                    <textarea
                        className="form-control form-textarea"
                        id="inputText"
                        name="inputText"
                        placeholder="e.g. a portfolio website html with design styling and placeholder images"
                        onChange={handleTextAreaChange}
                    ></textarea>
                </div>
                <button
                    type="button"
                    id="submitBtn"
                    className="btn btn-primary"
                    disabled={showLoading ? true : false}
                    onClick={handleFormSubmit}
                >
                    Generate
                </button>
            </div>
        </div>
    );
}
