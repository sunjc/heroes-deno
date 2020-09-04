import {lengthBetween, match, oakHelpers, required, RouterContext, Status} from "../deps.ts";
import {deleteHeroById, findHeroesByName, getHeroById, getHeroesByPage, saveHero} from "../service/hero_service.ts";
import {Hero} from "../entity/hero.ts";
import {parsePageQuery} from "../util/pages.ts";
import {validateRequest} from "../util/validator.ts";

// get heroes
async function getHeroes(context: RouterContext) {
    const query = oakHelpers.getQuery(context);
    context.response.body = await getHeroesByPage(parsePageQuery(query));
}

// get hero by id
async function getHero(context: RouterContext) {
    const {id} = context.params;
    await validateId(id);

    if (id) {
        context.response.body = await getHeroById(parseInt(id));
    }
}

// search heroes by name
async function searchHeroes(context: RouterContext) {
    const {name} = oakHelpers.getQuery(context);
    await validateName(name);
    context.response.body = await findHeroesByName(name);
}

// add a new hero
async function addHero(context: RouterContext) {
    const hero: Hero = await context.request.body().value;
    await validateHero(hero);
    context.response.body = await saveHero(hero);
}

// update a hero information
async function updateHero(context: RouterContext) {
    const hero: Hero = await context.request.body().value;
    await validateHero(hero);
    context.response.body = await saveHero(hero);
}

// Delete a hero by id
async function deleteHero(context: RouterContext) {
    const {id} = context.params;
    await validateId(id);

    if (id) {
        await deleteHeroById(parseInt(id));
        context.response.status = Status.OK;
    }
}

async function validateHero(hero: Hero): Promise<void> {
    const heroSchema = {name: [required, lengthBetween(3, 30)]};
    await validateRequest(hero, heroSchema);
}

async function validateId(id: string | undefined): Promise<void> {
    await validateRequest(
        {id},
        {id: [match(/^\d*$/)]},
        {messages: {"id": "id must be a number"}}
    );
}

async function validateName(name: string | undefined): Promise<void> {
    await validateRequest(
        {name},
        {name: [required]},
        {messages: {"name.required": "Required parameter 'name' is not present"}}
    );
}

export {
    addHero,
    deleteHero,
    getHero,
    getHeroes,
    searchHeroes,
    updateHero,
};
