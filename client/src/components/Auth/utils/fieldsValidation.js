const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const fieldsValidation = (value, type, conditions) => {
    let valid = false;
    switch (type) {
        case 'email':
            valid = emailPattern.test(value)
            break;
        case 'minLength':
            valid = value.length >= conditions.minLength
            break;
        case 'maxLength':
            valid = value <= conditions.maxLength
            break;
        default:
            break;
    }
    return valid
}
