import { getUserId } from "../../../utils";

export default {
	Mutation: {
		editInfo: (_, { name }, context) => {
			const userId = getUserId(context);
			return context.prisma.updateUser({
				where: { id: userId },
				data: { name }
			});
		}
	},

	Query: {
		userInfo: (_, { id }, context) => context.prisma.user({ id })
	}
};
