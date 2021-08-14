import {Context, isHttpError, Status} from "oak";

export async function errorHandler(context: Context, next: () => Promise<unknown>) {
  try {
    await next();
  } catch (err) {
    console.log(err);

    if (isHttpError(err)) {
      context.response.status = err.status;
    } else {
      switch (err.name) {
        case "EntityNotFound":
          context.response.status = Status.NotFound;
          break;
        default:
          // handle other statuses
          context.response.status = Status.BadRequest;
      }
    }

    context.response.body = {error: err.name, message: err.message, timestamp: Date.now()};
    context.response.type = "json";
  }
}
