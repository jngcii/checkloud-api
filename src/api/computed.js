import { prisma } from "../../generated/prisma-client";
import { getUserId } from "../utils";

export default {
	User: {
		planCount: ({ id }) => {
			const planCount = prisma
				.plansConnection({
					where: { user: { id } }
				})
				.aggregate()
				.count();

			return planCount;
		},

		activePlanCount: ({ id }) => {
			const activePlanCount = prisma
				.plansConnection({
					where: { isActive: true, user: { id } }
				})
				.aggregate()
				.count();

			return activePlanCount;
		},

		itemCount: ({ id }) => {
			const itemCount = prisma
				.itemCount({
					where: { user: { id } }
				})
				.aggregate()
				.count();

			return itemCount;
		}
	},

	Plan: {
		user: ({ id }) => {
			const user = prisma.plan({ id }).user();
			return user;
		},

		itemActs: ({ id }) => {
			const itemActs = prisma.plan({ id }).itemActs();
			return itemActs;
		}
	},

	ItemAct: {
		plan: ({ id }) => {
			const plan = prisma.itemAct({ id }).plan();
			return plan;
		}
	},

	Item: {
		parentItem: ({ id }) => {
			const parentItem = prisma.item({ id }).parentItem();
			return parentItem;
		},

		childItems: ({ id }) => {
			const childItems = prisma.item({ id }).childItems();
			return childItems;
		}
	}
};
