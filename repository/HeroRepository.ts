import { Hero } from "../entity/hero.ts";
import { EntityRepository, Repository } from "../deps.ts";
import { Page, Pageable } from "../helper/pages.ts";

@EntityRepository(Hero)
export class HeroRepository extends Repository<Hero> {
  async findAll(pageable: Pageable): Promise<Page<Hero>> {
    const queryBuilder = this.createQueryBuilder("hero");

    if (pageable.sort) {
      queryBuilder.orderBy(`hero.${pageable.sort.property}`, pageable.sort.order);
    }

    return queryBuilder.skip(pageable.page * pageable.size).take(pageable.size)
      .getManyAndCount().then((entitiesWithCount) => {
        return {
          content: entitiesWithCount[0],
          totalElements: entitiesWithCount[1],
        };
      });
  }

  async findByName(name: string): Promise<Hero[]> {
    return this.createQueryBuilder("hero")
      .where("hero.name like :name", { name: `%${name}%` })
      .getMany();
  }
}
