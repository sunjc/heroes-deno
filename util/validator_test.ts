import {assertThrowsAsync, HttpError, isEmail, lengthBetween, required} from "../deps.ts";
import {validateRequest} from "./validator.ts";

const userSchema = {
    username: [required, lengthBetween(3, 30)],
    password: [required, lengthBetween(10, 20)],
    email: [required, isEmail]
}

Deno.test("validate user information", async () => {
    assertThrowsAsync(async () => {
            return await validateRequest({}, userSchema);
        },
        HttpError,
        "username is required; password is required; email is required;");

    assertThrowsAsync(async () => {
            return await validateRequest({username: "A", password: "123456", email: "test"}, userSchema);
        },
        HttpError,
        "username characters length must be between 3-30; " +
        "password characters length must be between 10-20; " +
        "email is not a valid email address;");
});