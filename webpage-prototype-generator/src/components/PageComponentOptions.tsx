import { ChangeEvent } from "react";
import { components } from "../utils/data";

interface PageComponentOptionsProps {
    heading: string;
    handleCheckBoxChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function PageComponentOptions({ heading, handleCheckBoxChange }: PageComponentOptionsProps) {

    const listItems = components.map(compnent =>
        <label htmlFor={compnent.name} key={compnent.name} className="me-3">
            <input
                type="checkbox"
                id={compnent.name}
                name={compnent.name}
                value={compnent.name}
                onChange={handleCheckBoxChange}
                className="me-1"
            />
            {compnent.text}
        </label>
    );

    return (<>
        <label className="form-label">
            {heading}:
        </label>
        {listItems}
    </>);
}