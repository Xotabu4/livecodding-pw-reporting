import { users as devUsers } from "./users.dev";
import { users as preprodUsers } from "./users.dev";

const env = process.env.ENV ?? "dev";

let usersToExport = null;

if (env === "preprod") {
  usersToExport = preprodUsers;
} else {
  usersToExport = devUsers;
}

export const users = usersToExport;
