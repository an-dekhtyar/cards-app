export const emailValidator = (value: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(value).toLowerCase());
    if (!isValid) {
        return 'not valid email'
    }
}

export const lengthValidator = (length: number, valueName: string = 'Value') => (value: string) => {
    if (value.length <= length) {
        return `${valueName} must be more than ${length} characters`;
    }
}

export const definedValidator = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue.trim()) {
        return 'required'
    }
}

export const combineValidators = (...args: Array<(value: string) => string | undefined>) => (value: string) => {
    return args.reduce((acc: string | undefined, cur) => {
        return acc ? acc : cur(value)
    }, undefined)
}