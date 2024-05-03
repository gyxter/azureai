import React, { useState } from 'react'
import { PageComponents } from './PageComponent';
import { moods, sizes } from '../utils/data';
import "../App.css";

interface FormProps {
    showLoading: boolean,
    handleSubmit: (assembledPrompt: string, getSize: string) => Promise<void>
}
export function Form({ showLoading, handleSubmit}: FormProps) {

    const [selectedSize, setSelectedOption] = useState<string>(sizes[0].name);
    const [selectedMood, setSelectedOption1] = useState<string>(moods[0].name);
    const [checkBoxValues, setCheckBoxValues] = useState<{ [key: string]: boolean }>({});
    const [textAreaValue, setTextAreaValue] = useState<any | null>('');
    const [radioOption, setRadioOption] = useState<string>('');

    const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleMoodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption1(event.target.value);
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioOption(event.target.value);
    };

    const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckBoxValues({
            ...checkBoxValues,
            [event.target.name]: event.target.checked,
        });
    };

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(event.target.value);
    };

    function handleFormSubmit() {
        let assembledPrompt =/*  `Generate a responsive ${selectedSize} with the following requirements:` +
        `1. Webpage should have ${selectedMood} colored. ` +
        `2. Webpage should be using bootstrap css. ` +
        `3. Should have a header with placeholder image for the logo and 4 navigation links ` +
        `4. It should have a footer with links ` +
        `5. Also include the following components in the main content section: ` +       
        `  ${Object.keys(checkBoxValues).length > 0 
            ? 'a. ' + Object.keys(checkBoxValues).filter((key) => checkBoxValues[key]).join(', ') 
            : ''
        } ` + */
        `${textAreaValue.length !== 0 ? ' ' + textAreaValue : ''} `/*  +
        `${radioOption.length !== 0 ? ' c. ' + radioOption : '.' } ` */; 

        handleSubmit(assembledPrompt, selectedSize);
    }

    return (
        <div>
            <div className="col-md-4">
                <div className="mb-3">
                    <label className="form-label" htmlFor="size">
                        Size:{" "}
                    </label>
                    <br />
                    <select id="size" name="size" className="form-select" onChange={handleSizeChange}>
                        {sizes.map((size) => (
                            <option key={size.name} value={size.name}>{size.text}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3 d-none">
                    <label className="form-label" htmlFor="mood">
                        Mood:{" "}
                    </label>
                    <br />
                    <select id="mood" name="mood" className="form-select" onChange={handleMoodChange}>
                        {moods.map((mood) => (
                            <option key={mood.name} value={mood.name}>{mood.text}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3 d-none">
                    <label className="form-label" htmlFor="components">
                        Components:{" "}
                    </label>
                    <br />

                    <PageComponents handleCheckBoxChange={handleCheckBoxChange} />

                </div>
                <div className="mb-3 d-none">
                    <label className="form-label" htmlFor="plImages">
                        Placeholder images:{" "}
                    </label>
                    <br />
                    <label htmlFor="plImagesY" className="me-3">
                        <input
                            type="radio"
                            name="placeholderImages"
                            value="with placeholder images"
                            onChange={handleRadioChange}
                            className="me-1"
                            checked
                            id="plImagesY"
                        />
                        Yes
                    </label>

                    <label htmlFor="plImagesN">
                        <input
                            type="radio"
                            name="placeholderImages"
                            value=""
                            onChange={handleRadioChange}
                            className="me-1"
                            id="plImagesN"
                        />
                        No
                    </label>
                </div>
            </div>
            <div className="col-md-6">
                <div className="mb-3">
                    <label className="form-label" htmlFor="tailored">
                        Your Prompt:{" "}
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
