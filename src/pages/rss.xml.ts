import { render } from "astro:content";
import rss from "@astrojs/rss";
import { getSortedPosts } from "@utils/content-utils";
import { url } from "@utils/url-utils";
import type { APIContext } from "astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import sanitizeHtml from "sanitize-html";
import { siteConfig } from "@/config";

function stripInvalidXmlChars(str: string): string {
	return str.replace(
		// biome-ignore lint/suspicious/noControlCharactersInRegex: https://www.w3.org/TR/xml/#charsets
		/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]/g,
		"",
	);
}

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
	"img",
	"iframe",
	"video",
	"source",
]);
const allowedAttributes = {
	...sanitizeHtml.defaults.allowedAttributes,
	img: ["src", "alt", "width", "height"],
	iframe: ["src", "allowfullscreen", "loading"],
	video: ["src", "poster", "controls"],
	source: ["src", "type"],
};

interface RssItem {
	title: string;
	pubDate: Date;
	description: string;
	link: string;
	content: string;
}

export async function GET(context: APIContext): Promise<Response> {
	const blog = await getSortedPosts();
	const container = await AstroContainer.create();

	const items: RssItem[] = [];
	for (const post of blog) {
		// Render the compiled MDX/Markdown content (with all Astro remark/rehype
		// plugins applied) instead of running markdown-it over the raw source,
		// which leaks MDX imports and directive syntax into the feed.
		const { Content } = await render(post);
		const renderedHtml = await container.renderToString(Content);
		const content = sanitizeHtml(stripInvalidXmlChars(renderedHtml), {
			allowedTags,
			allowedAttributes,
		});
		items.push({
			title: post.data.title,
			pubDate: post.data.published,
			description: post.data.description || "",
			link: url(`/posts/${post.id}/`),
			content,
		});
	}

	return rss({
		title: siteConfig.title,
		description: siteConfig.subtitle || "No description",
		site: context.site ?? "https://fuwari.vercel.app",
		items,
		customData: `<language>${siteConfig.lang.replace("_", "-")}</language>`,
	});
}
