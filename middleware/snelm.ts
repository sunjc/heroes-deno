import {Context} from "oak";
import {Snelm} from "snelm";

// referrerPolicy config
const referrerPolicyConfig = {
  policy: 'same-origin'
};

// hidePoweredBy config
const hidePoweredByConfig = {
  setTo: 'iTRunner'
};

const snelm = new Snelm("oak", {
  referrerPolicy: referrerPolicyConfig,
  hidePoweredBy: hidePoweredByConfig
});

export async function oakSnelm(ctx: Context, next: () => Promise<unknown>) {
  ctx.response = snelm.snelm(ctx.request, ctx.response);
  await next();
}