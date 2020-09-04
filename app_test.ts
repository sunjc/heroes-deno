import {superoak} from "./deps.ts";
import {app} from "./app.ts";
import {makeAccessToken} from "./util/jwt.ts";
import {User} from "./entity/user.ts";
import {Authority, AuthorityName} from "./entity/authority.ts";

async function generateAdminToken() {
    const user = new User();
    user.username = "admin";
    user.email = "admin@itrunner.org";

    const roleAdmin = new Authority();
    roleAdmin.name = AuthorityName.ADMIN;
    const roleUser = new Authority();

    user.authorities = [roleAdmin, roleUser];

    return await makeAccessToken(user);
}

async function generateUserToken() {
    const user = new User();
    user.username = "user";
    user.email = "user@itrunner.org";

    const roleUser = new Authority();

    user.authorities = [roleUser];

    return await makeAccessToken(user);
}

const adminToken = await generateAdminToken();
const userToken = await generateUserToken();

Deno.test("Unauthorized Error", async () => {
    const request = await superoak(app);
    await request.get("/api/heroes").expect(401);
});

Deno.test("Forbidden Error", async () => {
    const request = await superoak(app);
    await request.post("/api/heroes").auth(userToken, {type: "bearer"}).send({name: "Jack"})
        .expect(403);
});

Deno.test("should get token successfully", async () => {
    const request = await superoak(app);
    await request.post("/api/auth").send({username: "admin", password: "admin"})
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(/{"token":.*,"refresh_token":.*}/i);
});

Deno.test("should provide correct credential", async () => {
    const request = await superoak(app);
    await request.post("/api/auth").send({username: "admin", password: "111111"})
        .expect(401);
});

Deno.test("crud should be executed successfully", async () => {
    // add hero
    let request = await superoak(app);
    await request.post("/api/heroes").auth(adminToken, {type: "bearer"}).send({name: "Jack"})
        .expect(200).expect(/{"name":"Jack","id":11,.*}/);

    // update hero
    request = await superoak(app);
    await request.post("/api/heroes").auth(adminToken, {type: "bearer"}).send({name: "Jacky", id: 11})
        .expect(200).expect(/{"name":"Jacky","id":11,.*}/);

    // find heroes by name
    request = await superoak(app);
    await request.get("/api/heroes/?name=m").auth(adminToken, {type: "bearer"})
        .expect(200);

    // find heroes by page
    request = await superoak(app);
    await request.get("/api/heroes").auth(adminToken, {type: "bearer"}).send({page: 0, size: 10})
        .expect(200).expect(/{.*"totalElements":11.*}/);

    // get hero by id
    request = await superoak(app);
    await request.get("/api/heroes/11").auth(adminToken, {type: "bearer"})
        .expect(200).expect(/{"id":11,"name":"Jacky",.*}/);

    // delete hero
    request = await superoak(app);
    await request.delete("/api/heroes/11").auth(adminToken, {type: "bearer"}).expect(200);
});

Deno.test("validation failed", async () => {
    // add hero
    const request = await superoak(app);
    await request.post("/api/heroes").auth(adminToken, {type: "bearer"}).send({name: "J"})
        .expect(400).expect(/.*,"message":"name characters length must be between 3-30; ",.*/i);
});

Deno.test("Path not found", async () => {
    const request = await superoak(app);
    await request.get("/api/test").auth(adminToken, {type: "bearer"}).expect(404);
});

Deno.test("Entity not found", async () => {
    const request = await superoak(app);
    await request.get("/api/test/9999").auth(adminToken, {type: "bearer"}).expect(404);
});
