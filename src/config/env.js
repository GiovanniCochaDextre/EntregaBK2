import { config } from "dotenv";
import program from "../utils/commander.js";
// config();
// const environment= ""
// config({path: environment === "PRODUCTION" ? "./.env.production":"./.env.development"})

const { mode } = program.opts();
config({ path: `./.env.${mode}` });
export default {
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
  firma_cookie: process.env.FIRMA_COOKIE,
  firma_JWT: process.env.JWT_SECRET,
  clave_session_cookie: process.env.CLAVE_SESSION_COOKIE,
};
