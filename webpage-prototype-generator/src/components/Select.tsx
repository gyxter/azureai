import { ChangeEvent } from 'react'
interface SelectProps {
    id: string;
    heading: string;
    optionList: {
        name: string,
        text: string,
    }[];
    handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}
const Select = ({ id, heading, optionList, handleChange }: SelectProps) => {
    return (
        <>
            <label className="form-label" htmlFor={id}>
                {heading}:
            </label>
            <select id={id} name={id} className="form-select" onChange={handleChange}>
                {optionList.map((option) => (
                    <option key={option.name} value={option.name}>{option.text}</option>
                ))}
            </select>
        </>
    )
}

export default Select