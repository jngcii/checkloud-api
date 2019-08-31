import { getUserId } from "../../../utils";

export default {
	Mutation: {
		addItemActs: async (_, { itemActs }, context) => {
			try {
				getUserId(context);
			} catch {
				return null;
			}

			const newItemActs = [];

			for (let i = 0; i < itemActs.length; i++) {
				if (newItemActs.length == i) {
					const itemAct = await context.prisma.createItemAct({
						keyword: itemActs[i].keyword,
						color: itemActs[i].color || "#333",
						isChecked: false,
						parentItem: itemActs[i].parentItem || null,
						childItems: itemActs[i].childItems || null,
						memo: "",
						order: itemActs[i].order
					});

					newItemActs.push(itemAct);
				}
			}

			if (newItemActs.length === itemActs.length) {
				return newItemActs;
			} else {
				setTimeout(() => {
					if (newItemActs.length == 0) return null;
					else return newItemActs;
				});
			}
		},

		addItemAct: async (_, { itemAct, planId }, context) => {
			try {
				getUserId(context);
			} catch {
				return false;
			}

			const res = await context.prisma.createItemAct({
				plan: { connect: { id: planId } },
				keyword: itemAct.keyword,
				color: itemAct.color || "#333",
				isChecked: false,
				parentItem: itemAct.parentItem || null,
				childItems: itemAct.childItems || null,
				memo: "",
				order: itemAct.order
			});

			if (res) return true;
		}
	}
};
