const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../../../utils");

export default {
	Mutation: {
		signin: async (_, { username, password }, { prisma }) => {
			const user = await prisma.user({ username });

			if (!user) {
				throw new Error("No such user found");
			}

			const valid = await bcrypt.compare(password, user.password);
			if (!valid) {
				throw new Error("Invalid password");
			}

			const token = jwt.sign({ userId: user.id }, APP_SECRET);

			return { token, user };
		}
	}
};
