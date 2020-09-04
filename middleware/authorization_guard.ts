import {Context, httpErrors, Request} from "../deps.ts";
import {getPayload} from "../util/jwt.ts";
import {config} from "../config/config.ts";

const ignorePaths = config.IGNORE_PATHS.split(",");

/**
 * Authorization Guard Middleware
 */
async function authorizationGuard(context: Context, next: () => Promise<void>) {
    if (!isIgnore(context.request)) {
        await parseBearerToken(context);

        if (!context.state.user) {
            throw new httpErrors.Unauthorized();
        }
    }

    await next();
}

function isIgnore(request: Request) {
    return request.method === "OPTIONS" || ignorePaths.indexOf(request.url.pathname) >= 0;
}

async function parseBearerToken(context: Context): Promise<void> {
    const authHeader = context.request.headers.get("Authorization");
    if (authHeader) {
        const token = authHeader.replace(/^bearer/i, "").trim();
        const user = await getPayload(token);

        if (user) {
            context.state.user = user;
        }
    }
}

export {authorizationGuard};