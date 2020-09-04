import {
    firstMessages,
    httpErrors,
    InputData,
    validate,
    ValidationErrors,
    ValidationOptions,
    ValidationRules
} from "../deps.ts";

function getMessages(errors: ValidationErrors): string {
    const firstErrors = firstMessages(errors);

    let messages = "";
    for (let field in firstErrors) {
        messages += firstErrors[field] + "; ";
    }

    return messages;
}

async function validateRequest(input: InputData, rules: ValidationRules, options?: ValidationOptions) {
    // @ts-ignore
    const [isValid, errors] = await validate(input, rules, options);

    if (!isValid) {
        const message = getMessages(errors);
        throw new httpErrors.BadRequest(message);
    }
}

export {validateRequest};