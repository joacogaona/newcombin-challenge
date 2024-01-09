export function invalidNameOrAddressErrors(value: string, inputName: string): string {
    if (value.length < 2) {
        return `${inputName} must be at least 2 characters`
    } else if (value[0] === ' ' || value[value.length - 1] === ' ') {
        return `${inputName} must not have whitespaces to the sides`
    }
    return ''

}