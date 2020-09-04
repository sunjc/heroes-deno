import {Request, required, Response} from "../deps.ts";
import {LoginCredential} from "../interfaces/LoginCredential.ts";
import * as authService from "../service/user_service.ts";
import {validateRequest} from "../helper/validator.ts";

async function login({request, response}: { request: Request; response: Response }) {
    const credential = (await request.body().value) as LoginCredential;
    await validateCredential(credential);
    response.body = await authService.authenticate(credential);
}

async function validateCredential(credential: LoginCredential): Promise<void> {
    const credentialSchema = {username: [required], password: [required]};
    await validateRequest(credential, credentialSchema);
}

export {login};
