import {bold, yellow} from "fmt/colors.ts";
import {Application} from "oak";
import {oakCors} from "cors";
import {
  ConnectionOptions,
  ConnectionOptionsReader,
  createConnection,
} from "typeorm";
import {config} from "./config/config.ts";
import router from "./routes.ts";
import {authorizationGuard, errorHandler, logger, notFound, oakSnelm, timing} from "./middleware/mod.ts";

/**
 * Reads connection options stored in ormconfig configuration file.
 */
async function getConnectionOptions(connectionName: string = "default"): Promise<ConnectionOptions> {
  return new ConnectionOptionsReader({root: "."}).get(connectionName);
}

const {APP_HOST, APP_PORT, CORS_ORIGIN, CORS_METHODS, CORS_ALLOWED_HEADERS} = config;

const connectionOptions: ConnectionOptions = await getConnectionOptions();

await createConnection(connectionOptions);

const cors = oakCors({
  origin: CORS_ORIGIN,
  methods: CORS_METHODS,
  allowedHeaders: CORS_ALLOWED_HEADERS
});

const app = new Application();

app.use(oakSnelm);
app.use(cors);
app.use(logger);
app.use(timing);
app.use(errorHandler);
app.use(authorizationGuard);

app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFound);

app.addEventListener("listen", ({hostname, port}) => {
  console.log(bold("Start listening on ") + yellow(`${hostname}:${port}`));
});

if (import.meta.main) {
  await app.listen(`${APP_HOST}:${APP_PORT}`);
}

export {app};