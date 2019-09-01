import { getUserId } from "../../../utils";

export default {
	Mutation: {
		editItemActs: async (_, { itemActs }, context) => {
			try {
				getUserId(context);
			} catch {
				return false;
			}

			itemActs.forEach(async item => {
				const res = await context.prisma.updateItemAct({
					data: {
						order: item.order
					},
					where: { id: item.id }
				});

				console.log(res);
			});
		},

		editItemAct: async (_, { id, keyword, memo }, context) => {
			try {
				getUserId(context);
			} catch {
				return false;
			}

			const itemAct = await context.prisma.itemAct({
				id
			});
			try {
				context.prisma.updateItemAct({
					data: {
						keyword: keyword || itemAct.keyword,
						memo: memo || itemAct.memo
					},
					where: { id }
				});
			} catch {
				return false;
			}
		},

		checkItem: async (_, { id }, context) => {
			try {
				getUserId(context);
			} catch {
				return false;
			}

			const itemAct = await context.prisma.itemAct({ id });

			try {
				context.prisma.updateItemAct({
					data: {
						isChecked: !itemAct.isChecked
					},
					where: { id }
				});
			} catch {
				return false;
			}
		}
	}
};
