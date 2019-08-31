import { getUserId } from "../../../utils";

const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
	Mutation: {
		editPlan: async (
			_,
			{ id, title, isActive, isMain, action },
			context
		) => {
			const userId = getUserId(context);

			const plan = await context.prisma.$exists.plan({
				id,
				user: { id: userId }
			});

			if (plan) {
				if (action === EDIT) {
					context.prisma.updatePlan({
						data: { title, isActive, isMain },
						where: { id }
					});
				} else if (action === DELETE) {
					context.prisma.deletePlan({ id });
				}
			} else {
				throw Error("You can't do that");
			}
		}
	}
};
