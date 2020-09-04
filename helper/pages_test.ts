import {assertEquals} from "../deps.ts";
import {parsePageQuery} from "./pages.ts";

Deno.test("default pageable parameter", () => {
    assertEquals(parsePageQuery({}), {page: 0, size: 10});
    assertEquals(parsePageQuery({page: "page", size: "size"}), {page: 0, size: 10});
    assertEquals(parsePageQuery({sort: "field"}), {page: 0, size: 10, sort: {property: "field", order: "ASC"}});
});

Deno.test("normal pageable parameter", () => {
    assertEquals(parsePageQuery({page: "2", size: "10"}), {page: 2, size: 10});
    assertEquals(parsePageQuery({page: "2", size: "10", sort: "field,DESC"}), {
        page: 2,
        size: 10,
        sort: {property: "field", order: "DESC"}
    });
});