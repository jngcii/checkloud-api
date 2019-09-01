import { getUserId } from "../../../utils";

export default {
	Query: {
		items: async (_, __, context) => {
			const userId = getUserId(context);

			return context.prisma.items({
				where: {
					user: { id: userId }
				}
			});
		}
	}
};
