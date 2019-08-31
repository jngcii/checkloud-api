import { getUserId } from "../../../utils";

export default {
	Query: {
		plans: async (_, __, context) => {
			const userId = getUserId(context);

			return context.prisma.plans({
				where: {
					user: {
						id: userId
					}
				},
				orderBy: "startAt_DESC"
			});
		}
	}
};
