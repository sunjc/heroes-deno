import {Jose, makeJwt, Payload, setExpiration, validateJwt} from "../deps.ts";
import {config} from "../config/config.ts";

const {
    JWT_SECRET,
    JWT_ACCESS_TOKEN_EXP,
    JWT_REFRESH_TOKEN_EXP,
    JWT_ISSUER,
} = config;

const header: Jose = {
    alg: "HS256",
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
        exp: setExpiration(parseInt(JWT_ACCESS_TOKEN_EXP)),
    };

    return await makeJwt({key: JWT_SECRET, header, payload});
}

async function makeRefreshToken(user: any): Promise<string> {
    const payload: Payload = {
        iss: JWT_ISSUER,
        sub: user.username,
        exp: setExpiration(parseInt(JWT_REFRESH_TOKEN_EXP)),
    };

    return makeJwt({key: JWT_SECRET, header, payload});
}

async function getPayload(jwt: string): Promise<Payload | null> {
    const jwtValidation = await validateJwt(
        {jwt, key: JWT_SECRET, algorithm: "HS256"}
    );
    return jwtValidation.isValid ? jwtValidation.payload : null;
}

export {makeAccessToken, makeRefreshToken, getPayload};