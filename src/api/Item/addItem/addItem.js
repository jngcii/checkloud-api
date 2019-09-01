import { getUserId } from "../../../utils";

export default {
	Mutation: {
		addItem: async (_, { keyword, color, parentId, order }, context) => {
			const userId = getUserId(context);

			return context.prisma.createItem({
				keyword,
				color,
				user: { connect: { id: userId } },
				parentItem: parentId ? { connect: { id: parentId } } : null,
				order
			});
		}
	}
};
