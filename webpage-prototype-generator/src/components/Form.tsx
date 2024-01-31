import React, { useState } from 'react'
import { PageComponents } from './PageComponent';
import { moods, pages } from '../utils/data';

interface FormProps {
    showLoading: boolean,
    handleSubmit: (assembledPrompt: string) => Promise<void>,
}
export function Form({ showLoading, handleSubmit }: FormProps) {

    const [selectedOption, setSelectedOption] = useState<string>(pages[0].name);
    const [selectedOption1, setSelectedOption1] = useState<string>(moods[0].name);
    const [checkBoxValues, setCheckBoxValues] = useState<{ [key: string]: boolean }>({});
    const [textAreaValue, setTextAreaValue] = useState<any | null>('');
    const [radioOption, setRadioOption] = useState<string>('');

    const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
        console.log('form');
        let assembledPrompt = `Generate responsive html for a ${selectedOption} that has a header and footer section and also with the following attributes:
    ${selectedOption1} theme
    ${Object.keys(checkBoxValues).length > 0 ? ', has ' + Object.keys(checkBoxValues).filter((key) => checkBoxValues[key]).join(', ') : ''}
    ${textAreaValue.length !== 0 ? ', ' + textAreaValue : ''}
    , has in page css styling, 
    ${radioOption.length !== 0 ? radioOption : ''}
  `;
        handleSubmit(assembledPrompt);
    }




    // handleAssembledPrompt(assembledPrompt);



    return (
        <div>
            <div className="col-md-4">
                <div className="mb-3">
                    <label className="form-label" htmlFor="page">
                        Page:{" "}
                    </label>
                    <br />
                    <select id="page" name="page" className="form-select" value={pages[0].name} onChange={handlePageChange}>
                        {pages.map((page) => (
                            <option key={page.name} value={page.name}>{page.text}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="mood">
                        Mood:{" "}
                    </label>
                    <br />
                    <select id="mood" name="mood" className="form-select" value={moods[0].name} onChange={handleMoodChange}>
                        {moods.map((mood) => (
                            <option key={mood.name} value={mood.name}>{mood.text}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="components">
                        Components:{" "}
                    </label>
                    <br />

                    <PageComponents handleCheckBoxChange={handleCheckBoxChange} />

                </div>
                <div className="mb-3">
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
                        />
                        No
                    </label>
                </div>
            </div>
            <div className="col-md-6">
                <div className="mb-3">
                    <label className="form-label" htmlFor="tailored">
                        Tailor your webpage:{" "}
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
