import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import { languages, ui } from "./ui.ts";
import { getLangFromUrl, getStaticPaths, useTranslations } from "./utils.ts";

describe("getStaticPaths", () => {
	it("should return an array of params for all supported languages", () => {
		const paths = getStaticPaths();
		const expectedLangs = Object.keys(languages);

		assert.equal(paths.length, expectedLangs.length);
		for (const lang of expectedLangs) {
			assert.ok(
				paths.find((p) => p.params.lang === lang),
				`Missing path for language: ${lang}`,
			);
		}
	});
});

describe("getLangFromUrl", () => {
	it("should extract a valid language from the root path", () => {
		const url = new URL("http://localhost/es/");
		assert.equal(getLangFromUrl(url), "es");
	});

	it("should extract a valid language from a nested path", () => {
		const url = new URL("http://localhost/ro/about");
		assert.equal(getLangFromUrl(url), "ro");
	});

	it("should fall back to the default language if the path starts with an invalid language", () => {
		const url = new URL("http://localhost/fr/");
		assert.equal(getLangFromUrl(url), "en");
	});

	it("should fall back to the default language if there is no language prefix", () => {
		const url = new URL("http://localhost/");
		assert.equal(getLangFromUrl(url), "en");
	});

	it("should handle paths with query parameters correctly", () => {
		const url = new URL("http://localhost/ro/about?q=hello");
		assert.equal(getLangFromUrl(url), "ro");
	});

	it("should handle paths with hashes correctly", () => {
		const url = new URL("http://localhost/es/#team");
		assert.equal(getLangFromUrl(url), "es");
	});

	it("should fall back to the default language for invalid language and extra paths", () => {
		const url = new URL("http://localhost/fr/contact");
		assert.equal(getLangFromUrl(url), "en");
	});
});

describe("useTranslations fallback logic", () => {
	let addedRo = false;
	before(() => {
		// Inject test properties into the real `ui` object
		// This ensures deterministic tests regardless of actual UI strings
		(ui as any).en["_test_missing"] = "Fallback EN";

		// Ensure language 'ro' exists for testing
		if (!(ui as any).ro) {
			(ui as any).ro = {};
			addedRo = true;
		}
	});

	after(() => {
		// Clean up injected test properties
		delete (ui as any).en["_test_missing"];
		if (addedRo) delete (ui as any).ro;
	});

	it("should fall back to default language for a missing flat key", () => {
		const t = useTranslations("ro");
		assert.equal(t("_test_missing" as any), "Fallback EN");
	});

	it("should return the original key if it is missing in both current and default languages", () => {
		const t = useTranslations("ro");
		assert.equal(t("does.not.exist" as any), "does.not.exist");
	});
});

describe("useTranslations", () => {
	it("should return a function that translates top-level keys correctly", () => {
		const tEn = useTranslations("en");
		assert.equal(tEn("nav.home"), "Home");
		assert.equal(tEn("home.explore"), "Explore Services");
	});

	it("should return translation for a non-default language", () => {
		const tRo = useTranslations("ro");
		assert.equal(tRo("nav.home"), "Acasă");
		assert.equal(tRo("home.explore"), "Explorează Serviciile");
	});

	it("should return the key itself if the key does not exist in any language", () => {
		const tEn = useTranslations("en");
		assert.equal(tEn("missing.key" as any), "missing.key");
		assert.equal(tEn("does_not_exist" as any), "does_not_exist");
	});
});
