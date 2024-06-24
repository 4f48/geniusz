import { defineConfig } from "drizzle-kit";

import * as dotenv from "dotenv";
dotenv.config();

const { POSTGRES_URL } = process.env;
if (!POSTGRES_URL) {
	throw new Error("No POSTGRES_URL was provided.");
}

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/lib/schema.ts",
	out: "./drizzle",
	dbCredentials: {
		url: process.env.POSTGRES_URL!
	}
});

