import {Router} from "./deps.ts";
import {addHero, deleteHero, getHero, getHeroes, searchHeroes, updateHero} from "./controller/hero_controller.ts";
import {login} from "./controller/auth_controller.ts";
import {authorityGuard} from "./middleware/authority_guard.ts";

const router = new Router({prefix: "/api"});

router.post("/auth", login);

router.get("/heroes/", (context, next) => authorityGuard(context, next, ["USER"]), searchHeroes)
    .get("/heroes", (context, next) => authorityGuard(context, next, ["USER"]), getHeroes)
    .get("/heroes/:id", (context, next) => authorityGuard(context, next, ["USER"]), getHero)
    .post("/heroes", (context, next) => authorityGuard(context, next, ["ADMIN"]), addHero)
    .put("/heroes", (context, next) => authorityGuard(context, next, ["ADMIN"]), updateHero)
    .delete("/heroes/:id", (context, next) => authorityGuard(context, next, ["ADMIN"]), deleteHero);

export default router;
