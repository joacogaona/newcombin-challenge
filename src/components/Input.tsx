function formatSSN(value: string) {
    const numbersOnly = value.replace(/[^\d]/g, '');

    const part1 = numbersOnly.slice(0, 3);
    const part2 = numbersOnly.slice(3, 5);
    const part3 = numbersOnly.slice(5, 9);

    let formattedSSN = part1;
    if (part1.length === 3) {
        formattedSSN += '-';
        if (part2.length > 0) {
            formattedSSN += part2;
            if (part2.length === 2) {
                formattedSSN += '-';
                if (part3.length > 0) {
                    formattedSSN += part3;
                }
            }
        }
    }

    return formattedSSN;
}

const Input = ({ field, placeholder }: { field: any, placeholder: string }) => {
    return <div className="flex flex-col">
        <input
            name={field.name}
            placeholder={placeholder}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => { placeholder === 'SSN' ? field.handleChange(formatSSN(e.target.value)) : field.handleChange(e.target.value) }}
        />
        {field.state.meta.errors ? <em role="alert" className="text-red-400">{field.state.meta.errors.join(', ')}</em> : null}
    </div>
}

export default Input