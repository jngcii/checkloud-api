import { getUserId } from "../../../utils";

export default {
	Mutation: {
		editItem: async (_, { id, keyword, color, action }, context) => {
			const userId = getUserId(context);

			const item = await context.prisma.$exists.item({
				id,
				user: { id: userId }
			});

			if (!item) return false;

			if (action === EDIT) {
				context.prisma.updateItem({
					data: { keyword, color },
					where: { id }
				});
			} else if (action === DELETE) {
				context.prisma.deleteItem({ id });
			}
		}
	}
};
