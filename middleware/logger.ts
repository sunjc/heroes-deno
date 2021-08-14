import {Context} from "oak";
import {bold, cyan, green} from "fmt/colors.ts";

async function logger(ctx: Context, next: () => Promise<unknown>): Promise<void> {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
  console.log(`${green(ctx.request.method)} ${cyan(decodeURIComponent(ctx.request.url.pathname))} - ${bold(String(rt))}`);
}

export {logger};