import { getUserId } from "../../../utils";

export default {
	Mutation: {
		addPlan: async (_, { title, itemActs }, context) => {
			const userId = getUserId(context);

			const plan = await context.prisma.createPlan({
				title,
				user: { connect: { id: userId } },
				itemActs: {
					connect: itemActs.map(itemAct => {
						return { id: itemAct.id };
					})
				},
				isActive: true,
				isMain: true
			});

			return plan;
		}
	}
};
