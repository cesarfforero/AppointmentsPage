export const registerFormValidates = (input) => {
    const errors = {};

    if (!input.name.trim()){
        errors.name = "name is required";
}
};
// same for email, birthday, Ndni, USERNAME, PASSWORD


export const loginFormValidates = (input) => {
    const errors = {};
     if (!input.name.trim()){
        errors.name = "name is required";
}
}