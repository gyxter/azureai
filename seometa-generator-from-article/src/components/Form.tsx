import React, { useState } from 'react'
/* import { PageComponents } from './PageComponent';
import { moods, pages } from '../utils/data'; */
import "../App.css";

interface FormProps {
    showLoading: boolean,
    handleSubmit: (assembledPrompt: string) => Promise<void>,
}
export function Form({ showLoading, handleSubmit }: FormProps) {

   /*  const [selectedPage, setSelectedOption] = useState<string>(pages[0].name);
    const [selectedMood, setSelectedOption1] = useState<string>(moods[0].name);
    const [checkBoxValues, setCheckBoxValues] = useState<{ [key: string]: boolean }>({});
    const [radioOption, setRadioOption] = useState<string>(''); */

    /* const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
    }; */

    const [textAreaValue, setTextAreaValue] = useState<any | null>('');

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(event.target.value);
    };
/*Title: "Revolutionizing Healthcare: The Breakthrough Medicine Transforming Lives"
Introduction:
In the ever-evolving landscape of healthcare, groundbreaking advancements continue to reshape the way we approach and treat various medical conditions. One such marvel is the revolutionary medicine, XYZ-Health, which has emerged as a beacon of hope for patients worldwide. XYZ-Health is not just a medication; it represents a transformative leap in medical science, offering unprecedented benefits for individuals grappling with a range of ailments.
The Genesis of XYZ-Health:
Developed after years of rigorous research and clinical trials, XYZ-Health is the result of collaboration between leading pharmaceutical experts, biochemists, and medical researchers. The genesis of this medicine lies in a deep understanding of molecular biology, genetics, and the intricate mechanisms underlying various diseases.
Mechanism of Action:
XYZ-Health boasts a novel mechanism of action that sets it apart from traditional treatments. By targeting specific molecular pathways implicated in the progression of diseases, this medicine acts with precision, minimizing side effects and maximizing therapeutic efficacy. The unique mode of action makes XYZ-Health a versatile solution for a spectrum of medical conditions.
Clinical Efficacy:
Clinical trials have demonstrated the remarkable efficacy of XYZ-Health in treating conditions such as [specific medical conditions]. Patients who were once burdened by the limitations of existing treatments found relief and improvement in their quality of life after incorporating XYZ-Health into their healthcare regimens.
Personalized Medicine:
One of the most noteworthy aspects of XYZ-Health is its potential for personalized medicine. Tailored to individual genetic profiles and disease characteristics, this medicine heralds a new era where treatment plans are customized for each patient, optimizing outcomes and reducing adverse effects.
Safety Profile:
Safety is paramount in any medication, and XYZ-Health excels in this aspect. Extensive safety assessments have been conducted, and the medicine has shown a favorable safety profile with minimal adverse effects. This makes XYZ-Health a viable option for long-term use, ensuring sustained therapeutic benefits.
Global Impact:
As XYZ-Health gains regulatory approval and reaches global markets, its impact on public health is becoming increasingly evident. Countries around the world are integrating this innovative medicine into their healthcare systems, providing new hope for patients who had exhausted conventional treatment options.
Conclusion:
In conclusion, XYZ-Health stands as a testament to the relentless pursuit of excellence in the field of medicine. Its revolutionary approach, combined with unparalleled clinical efficacy and a commitment to personalized care, has positioned it as a game-changer in healthcare. As we witness the transformative power of XYZ-Health, the future of medicine looks brighter than ever, promising improved outcomes and a better quality of life for countless individuals worldwide.
*/
    function handleFormSubmit() {
       /*  let assembledPrompt = `Generate 3 samples SEO title, description and set of keywords from the article below. Format the samples in html list markup:` + */
        
       let assembledPrompt = 
        `${textAreaValue.length !== 0 ? ' ' + textAreaValue : ''} ` +
        `From the article above: Generate a stylized HTML table with 3 ordered list items. Each item should contain a labeled SEO title, a description, URL Structure, estimated page ranking out of 10 and an unordered list of keywords.`;
        //`Can you generate 5 sample of SEO metadata each having the title, description, Header, URL Structure also ranking them based on the SEO Scores and display in a html table format`
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
