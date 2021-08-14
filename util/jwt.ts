import type {Header, Payload} from "djwt";
import {create, getNumericDate, verify} from "djwt";
import {config} from "../config/config.ts";

const {
  JWT_SECRET,
  JWT_ACCESS_TOKEN_EXP,
  JWT_REFRESH_TOKEN_EXP,
  JWT_ISSUER,
} = config;

const header: Header = {
  alg: "HS512",
  typ: "JWT",
};

async function makeAccessToken(user: any): Promise<string> {
  const payload: Payload = {
    iss: JWT_ISSUER,
    sub: user.username,
    email: user.email,
    authorities: user.authorities.map((auth: { name: string }) => {
      return auth.name;
    }),
    exp: getNumericDate(parseInt(JWT_ACCESS_TOKEN_EXP)),
  };

  return await create(header, payload, JWT_SECRET);
}

async function makeRefreshToken(user: any): Promise<string> {
  const payload: Payload = {
    iss: JWT_ISSUER,
    sub: user.username,
    exp: getNumericDate(parseInt(JWT_REFRESH_TOKEN_EXP)),
  };

  return await create(header, payload, JWT_SECRET);
}

async function getPayload(jwt: string): Promise<Payload | null> {
  return await verify(jwt, JWT_SECRET, "HS512");
}

export {makeAccessToken, makeRefreshToken, getPayload};