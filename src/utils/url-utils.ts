import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";

export function pathsEqual(path1: string, path2: string): boolean {
	const normalize = (p: string): string => {
		try {
			// Handles both relative ("/about/") and absolute
			// ("https://x.example/about/") inputs by comparing pathnames.
			return new URL(p, "https://placeholder.invalid").pathname
				.replace(/\/+$/, "")
				.toLowerCase();
		} catch {
			return p.replace(/^\/|\/$/g, "").toLowerCase();
		}
	};
	return normalize(path1) === normalize(path2);
}

function joinUrl(...parts: string[]): string {
	const joined = parts.join("/");
	return joined.replace(/\/+/g, "/");
}

export function getPostUrlById(id: string): string {
	return url(`/posts/${id}/`);
}

export function getTagUrl(tag: string): string {
	if (!tag) return url("/archive/");
	return url(`/archive/?tag=${encodeURIComponent(tag.trim())}`);
}

export function getCategoryUrl(category: string | null): string {
	if (
		!category ||
		category.trim() === "" ||
		category.trim().toLowerCase() === i18n(I18nKey.uncategorized).toLowerCase()
	)
		return url("/archive/?uncategorized=true");
	return url(`/archive/?category=${encodeURIComponent(category.trim())}`);
}

export function url(path: string): string {
	return joinUrl("", import.meta.env.BASE_URL, path);
}

/**
 * 判断规范化后的路径是否位于文章路由下。
 * 同时兼容根路径部署和配置了 base path 的部署。
 * 可传入完整 URL、绝对路径或 Astro.url.pathname。
 */
export function isPostsPath(path: string): boolean {
	let pathname = path;
	try {
		pathname = new URL(path, "https://placeholder.invalid").pathname;
	} catch {
		// 如果传入的不是可解析的 URL/路径，保留原字符串继续判断。
	}

	const basePath = import.meta.env.BASE_URL || "/";
	const normalizedBase = basePath !== "/" ? basePath.replace(/\/$/, "") : "";
	let relative = pathname;
	if (normalizedBase && pathname.startsWith(normalizedBase)) {
		relative = pathname.slice(normalizedBase.length);
	}

	return /^\/posts(?:\/|$)/i.test(relative);
}
