import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import bannerMobile from "../assets/images/banner-mobile-natsu.jpg";
import bannerDesktop from "../assets/images/banner-natsu.jpg";
import { siteConfig } from "../config";

/**
 * 配置路径 -> 实际打包产物。
 * 修改 src/config.ts 的 banner.src 时必须同步这里。
 */
const bannerAssetRegistry: Record<string, ImageMetadata> = {
	"assets/images/banner-natsu.jpg": bannerDesktop,
	"assets/images/banner-mobile-natsu.jpg": bannerMobile,
};

function pickFirst(src: string | string[] | undefined): string {
	if (!src) return "";
	return Array.isArray(src) ? (src[0] ?? "") : src;
}

/** 返回配置中第一张 banner 图片的源路径。 */
export function firstBannerSource(): string {
	const src = siteConfig.banner.src;
	if (typeof src === "string") return src;
	if (Array.isArray(src)) return src[0] ?? "";
	return pickFirst(src.desktop) || pickFirst(src.mobile);
}

/**
 * 把配置路径解析为构建后的图片 URL（如 /_astro/banner-xxx.webp）。
 * 绝对 URL / 以 / 开头的 public 路径原样返回；
 * 未知路径返回 ""。
 */
export async function resolveShareImageUrl(
	src: string | undefined,
): Promise<string> {
	if (!src) return "";
	if (src.startsWith("/") || /^https?:\/\//.test(src)) return src;
	const asset = bannerAssetRegistry[src];
	if (!asset) return "";
	const optimized = await getImage({ src: asset, format: "webp", width: 1200 });
	return optimized.src;
}
