import fs from "node:fs";
import path from "node:path";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";

export function pathsEqual(path1: string, path2: string) {
	const normalizedPath1 = path1.replace(/^\/|\/$/g, "").toLowerCase();
	const normalizedPath2 = path2.replace(/^\/|\/$/g, "").toLowerCase();
	return normalizedPath1 === normalizedPath2;
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

/**
 * Get the relative directory of a post's source file within `content/posts/`.
 *
 * Content Layer API strips extensions from entry IDs, so we can't distinguish
 * root-level files (`draft.mdx` → id `"draft"`) from directory-index posts
 * (`guide/index.md` → id `"guide"`) by the ID string alone.
 * This function checks the filesystem to determine the correct directory.
 *
 * Examples:
 *   "draft"            → ""          (root-level file)
 *   "guide"            → "guide/"    (directory post via index.md)
 *   "250828/PostTitle" → "250828/"   (file in subdirectory, has slash)
 */
export function getPostRelativeDir(entryId: string): string {
	const lastSlash = entryId.lastIndexOf("/");
	if (lastSlash >= 0) {
		return entryId.substring(0, lastSlash + 1);
	}
	const fullPath = path.join(process.cwd(), "src/content/posts", entryId);
	try {
		if (fs.statSync(fullPath).isDirectory()) {
			return `${entryId}/`;
		}
	} catch {
		// Not a directory or doesn't exist — root-level file
	}
	return "";
}

export function url(path: string) {
	return joinUrl("", import.meta.env.BASE_URL, path);
}
