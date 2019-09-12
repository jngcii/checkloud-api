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

server.start({ port: PORT }, () => {
	process.send("ready");
	console.log(`Server running on http://localhost:${PORT}/`);
});

process.on(`SIGINT`, () => {
	isDisableKeepAlive = true;
	server.close(() => {
		console.log("server closed");
		process.exit(0);
	});
});
