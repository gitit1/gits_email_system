
export const formValidation = (form) => {
    let isValid = true;
    for (var key in form) {
      if (!form[key].valid) {
        isValid = false;
        break;
      }
    }
    return isValid
}
