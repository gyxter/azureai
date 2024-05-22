import React, { ChangeEvent } from 'react'
interface ImageComponentOptionsProps {
    radioObjects: {
        id: string;
        name: string;
        value: string;
        text: string;
    }[];
    handleRadioChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const ImageComponentOptions = ({ radioObjects, handleRadioChange }: ImageComponentOptionsProps) => {
    return (
        radioObjects.map(radioObject => {
            <label htmlFor={radioObject.id} className="me-3" key={radioObject.id}>
                <input
                    type="radio"
                    name={radioObject.name}
                    value={radioObject.value}
                    onChange={handleRadioChange}
                    className="me-1"
                    id={radioObject.id}
                />
                {radioObject.text}
            </label>
        })
    )
}

export default ImageComponentOptions