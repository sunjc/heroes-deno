import {Context} from "../deps.ts";

async function timing(ctx: Context, next: () => Promise<void>) {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
}

export {timing};
