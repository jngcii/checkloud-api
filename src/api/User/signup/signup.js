const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../../../utils");

export default {
	Mutation: {
		signup: async (_, { username, name, password: pw }, context) => {
			const password = await bcrypt.hash(pw, 10);

			const user = await context.prisma.createUser({
				username,
				name,
				password
			});

			const token = jwt.sign({ userId: user.id }, APP_SECRET);

			return { user, token };
		}
	}
};
