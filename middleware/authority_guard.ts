import {httpErrors, RouterContext, Status} from "../deps.ts";

/**
 * Authority Guard Middleware
 */
async function authorityGuard(context: RouterContext, next: () => Promise<void>, roles: string[]) {
    context.assert(roles, Status.BadRequest);
    context.assert(context.state.user, Status.Unauthorized);

    if (hasAnyRole(context.state.user.authorities, roles)) {
        await next();
    } else {
        throw new httpErrors.Forbidden();
    }
}

function hasAnyRole(authorities: string[], roles: string[]) {
    let hasRole = false;

    // @ts-ignore
    for (const role of roles) {
        if (authorities.indexOf(`ROLE_${role}`) >= 0) {
            hasRole = true;
            break;
        }
    }

    return hasRole;
}

export {authorityGuard};