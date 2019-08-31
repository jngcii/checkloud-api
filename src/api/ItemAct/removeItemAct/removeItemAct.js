import { getUserId } from "../../../utils";

export default {
	Mutation: {
		removeItemAct: async (_, { id }, context) => {
			try {
				getUserId(context);
			} catch {
				return false;
			}

			const res = await context.prisma.deleteItemAct({ id });

			if (res) return true;
		}
	}
};
