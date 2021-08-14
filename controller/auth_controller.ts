import {Request, Response} from "oak";
import {required} from "validasaur";
import {LoginCredential} from "../interfaces/LoginCredential.ts";
import * as authService from "../service/user_service.ts";
import {validateRequest} from "../util/validator.ts";

async function login({request, response}: { request: Request; response: Response }): Promise<void> {
  const credential = (await request.body().value) as LoginCredential;
  await validateCredential(credential);
  response.body = await authService.authenticate(credential);
}

async function validateCredential(credential: LoginCredential): Promise<void> {
  const credentialSchema = {username: [required], password: [required]};
  await validateRequest(credential, credentialSchema);
}

export {login};
