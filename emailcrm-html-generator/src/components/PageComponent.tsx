import { components } from "../utils/data";

interface PageComponentsProps {
    handleCheckBoxChange: React.ChangeEventHandler<HTMLInputElement>
}

export function PageComponents({handleCheckBoxChange}: PageComponentsProps) {

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

    return (<div>{listItems}</div>);
}