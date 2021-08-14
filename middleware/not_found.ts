import {Context, Status} from "oak";

function notFound(context: Context) {
  context.response.status = Status.NotFound;
  context.response.body = {error: "NotFound", message: `Path ${context.request.url} not found`};
}

export {notFound};