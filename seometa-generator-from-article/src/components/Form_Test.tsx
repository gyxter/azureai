import React, { useState } from 'react'
import { PageComponents } from './PageComponent';
import { moods, pages } from '../utils/data';

interface FormProps {
    onSubmit: (data: UserData) => void,
    showLoading: boolean
}
export interface UserData {
    page: string,
    mood: string,
    components: string[],
    placeholderImages: string
}

export function Form({ onSubmit, showLoading }: FormProps) {

    const [formData, setFormData] = useState<UserData>({ page: pages[0].name, mood: moods[0].name, components: [], placeholderImages: '' });
    const [checkedValues, setCheckedValues] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            // setFormData({...formData, 
            //     components: 
            // })
            setCheckedValues(prevValues => [...prevValues, value]);
        } else {
            setCheckedValues(prevValues => prevValues.filter(item => item !== value));
        }
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        onSubmit(formData);
    };





    return (

        <form onSubmit={handleSubmit}>
            {checkedValues}
            <div className="col-md-4">
                <div className="mb-3">
                    <label className="form-label" htmlFor="page">
                        Page:{" "}
                    </label>
                    <br />
                    <select id="page" name="page" className="form-select" value={formData.page} onChange={handleSelectChange}>
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
                    <select id="mood" name="mood" className="form-select" value={formData.mood} onChange={handleSelectChange}>
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

                    {/* <PageComponents handleCheckboxChange={handleCheckboxChange} /> */}

                    
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
                            onChange={handleInputChange}
                            className="me-1"
                        />
                        Yes
                    </label>

                    <label htmlFor="plImagesN">
                        <input
                            type="radio"
                            name="placeholderImages"
                            value=""
                            onChange={handleInputChange}
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
                    type="submit"
                    id="submitBtn"
                    className="btn btn-primary"
                    disabled={showLoading ? true : false}
                >
                    Generate
                </button>
            </div>
        </form>
    );
}
