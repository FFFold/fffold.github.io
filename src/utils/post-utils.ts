import fs from "node:fs";
import path from "node:path";

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
