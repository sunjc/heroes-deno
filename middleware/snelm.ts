import {Context, Snelm} from "../deps.ts";

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

export async function oakSnelm(ctx: Context, next: () => Promise<void>) {
    ctx.response = snelm.snelm(ctx.request, ctx.response);
    await next();
}