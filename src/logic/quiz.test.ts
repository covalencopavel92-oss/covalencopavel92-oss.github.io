import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { calculateMaxCategory, quizData } from "./quiz.ts";

describe("calculateMaxCategory", () => {
	it("should return the category with the highest score", () => {
		const scores = { seo: 3, web: 1, consult: 0 };
		assert.equal(calculateMaxCategory(scores), "seo");
	});

	it("should handle ties by returning the first category with the max score encountered in iteration order", () => {
		// Object.entries order is generally insertion order for string keys
		const scores = { web: 2, seo: 2, consult: 0 };
		assert.equal(calculateMaxCategory(scores), "web");
	});

	it("should return default if all scores are 0", () => {
		const scores = { seo: 0, web: 0, consult: 0 };
		// Since seo is first and value is not > maxScore (-1), it becomes max.
		// Wait, if value (0) > maxScore (-1), it becomes max.
		// So first one in iteration order will be chosen.
		assert.equal(calculateMaxCategory(scores), "seo");
	});

	it("should work with partial scores", () => {
		const scores = { consult: 5 };
		assert.equal(calculateMaxCategory(scores), "consult");
	});
});

describe("quizData", () => {
	it("should have 3 questions", () => {
		assert.equal(quizData.length, 3);
	});

	it("should have at least 2 options for each question", () => {
		for (const question of quizData) {
			assert.ok(question.options.length >= 2);
		}
	});

	it("should have valid score categories for each option", () => {
		const validCategories = ["seo", "web", "consult"];
		for (const question of quizData) {
			for (const option of question.options) {
				assert.ok(
					validCategories.includes(option.score),
					`Invalid category: ${option.score}`,
				);
			}
		}
	});
});
