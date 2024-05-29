import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
// import { POSTGRES_URL } from '$env/static/private';
import { dev } from "$app/environment";

export const db = drizzle(sql);
// export const url = POSTGRES_URL;
