import {DeleteResult, getCustomRepository} from "../deps.ts";
import {HeroRepository} from "../repository/HeroRepository.ts";
import {Page, Pageable} from "../helper/pages.ts";
import {Hero} from "../entity/hero.ts";

async function getHeroById(id: number): Promise<Hero> {
    return await getCustomRepository(HeroRepository).findOneOrFail(id);
}

async function getHeroesByPage(pageable: Pageable): Promise<Page<Hero>> {
    return await getCustomRepository(HeroRepository).findAll(pageable);
}

async function findHeroesByName(name: string): Promise<Hero[]> {
    return await getCustomRepository(HeroRepository).findByName(name);
}

async function saveHero(hero: Hero): Promise<Hero> {
    return await getCustomRepository(HeroRepository).save(hero);
}

async function deleteHeroById(id: number): Promise<DeleteResult> {
    return await getCustomRepository(HeroRepository).delete(id);
}

export {getHeroById, getHeroesByPage, findHeroesByName, saveHero, deleteHeroById};