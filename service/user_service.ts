import {getCustomRepository} from "typeorm";
import {httpErrors} from "oak";
import {compare} from "bcrypt";
import {LoginCredential} from "../interfaces/LoginCredential.ts";
import {makeAccessToken, makeRefreshToken} from "../util/jwt.ts";
import {UserRepository} from "../repository/UserRepository.ts";

export async function authenticate(credential: LoginCredential) {
  const {username, password} = credential;
  const user = await getCustomRepository(UserRepository).findByUsername(username);

  if (user) {
    const passHash = user.password;
    const isValidPass = await compare(password, passHash);
    if (isValidPass) {
      return {
        "token": await makeAccessToken(user),
        "refresh_token": await makeRefreshToken(user)
      };
    }
  }

  throw new httpErrors.Unauthorized("Wrong credential");
}
