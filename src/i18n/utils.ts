import { defaultLang, languages, type UIKeys, ui } from "./ui.ts";

export function getStaticPaths() {
	return Object.keys(languages).map((lang) => ({ params: { lang } }));
}

export function getLangFromUrl(url: URL) {
	// ⚡ Bolt Optimization: Replace slow split('/') with fast indexOf/substring
	// Avoids array allocation and multiple string copies for paths like /en/about
	const start = url.pathname.startsWith("/") ? 1 : 0;
	const end = url.pathname.indexOf("/", start);
	const lang =
		end === -1
			? url.pathname.substring(start)
			: url.pathname.substring(start, end);

	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: UIKeys) {
		if (key in ui[lang]) {
			return ui[lang][key];
		}
		return ui[defaultLang][key] || key;
	};
}
