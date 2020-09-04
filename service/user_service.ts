import {LoginCredential} from "../interfaces/LoginCredential.ts";
import {bcrypt, getCustomRepository, httpErrors} from "../deps.ts";
import {makeAccessToken, makeRefreshToken} from "../helper/jwt.ts";
import {UserRepository} from "../repository/UserRepository.ts";

export async function authenticate(credential: LoginCredential) {
    const {username, password} = credential;
    const user = await getCustomRepository(UserRepository).findByUsername(username);

    if (user) {
        const passHash = user.password;
        const isValidPass = await bcrypt.compare(password, passHash);
        if (isValidPass) {
            return {
                "token": await makeAccessToken(user),
                "refresh_token": await makeRefreshToken(user)
            };
        }
    }

    throw new httpErrors.Unauthorized("Wrong credential");
}
