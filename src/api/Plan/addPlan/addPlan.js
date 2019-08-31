import { getUserId } from "../../../utils";

export default {
	Mutation: {
		addPlan: async (_, { title, itemActs }, context) => {
			const userId = getUserId(context);

			const plan = await context.prisma.createPlan({
				title,
				user: { connect: { id: userId } },
				isActive: true,
				isMain: true
			});

			itemActs.forEach(async itemAct => {
				const i = await context.prisma.createItemAct({
					plan: { connect: { id: plan.id } },
					keyword: itemAct.keyword,
					color: itemAct.color,
					isChecked: false,
					parentItem: itemAct.parentItem || null,
					childItems: itemAct.childItems || null,
					memo: ""
				});

				console.log(i);
			});

			if (plan.itemActs) return plan;
		}
	}
};
