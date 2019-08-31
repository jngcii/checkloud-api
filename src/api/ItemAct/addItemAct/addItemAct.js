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
						color: itemActs[i].color,
						isChecked: false,
						parentItem: itemActs[i].parentItem || null,
						childItems: itemActs[i].childItems || null,
						memo: "",
						order: itemActs[i].order
					});

					console.log(itemAct);

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
		}
	}
};
