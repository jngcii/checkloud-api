require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import { prisma } from "../generated/prisma-client";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
	schema,
	context: request => {
		return {
			...request,
			prisma
		};
	}
});

server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
	console.log(`Server running on http://localhost:${PORT}/`)
);
