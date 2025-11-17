import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "请勿折叠",
	subtitle: "Blog",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},

	// 壁纸模式配置
	wallpaperMode: {
		defaultMode: "banner", // 默认壁纸模式：banner=顶部横幅，fullscreen=全屏壁纸，none=无壁纸
		showModeSwitchOnMobile: "desktop", // 整体布局方案切换按钮显示设置（默认：desktop）
	},

	banner: {
		enable: true,
		// 支持多种格式：字符串、数组、或对象分别设置桌面端和移动端
		src: {
			desktop: "assets/images/banner.jpg",
			mobile: "assets/images/banner-mobile.jpg",
		},
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		carousel: {
			enable: false, // 是否启用轮播
			interval: 5, // 轮播间隔时间（秒）
		},
		waves: {
			enable: false, // 是否启用水波纹效果
			performanceMode: false, // 性能模式：减少动画复杂度
			mobileDisable: true, // 移动端禁用
		},
		imageApi: {
			enable: false, // 是否启用图片API
			url: "", // API地址，返回每行一个图片链接的文本
		},
		homeText: {
			enable: false, // 是否在首页显示自定义文字
			title: "", // 主标题
			subtitle: "", // 副标题，支持单个字符串或字符串数组
			typewriter: {
				enable: false, // 是否启用打字机效果
				speed: 100, // 打字速度（毫秒）
				deleteSpeed: 50, // 删除速度（毫秒）
				pauseTime: 2000, // 完整显示后的暂停时间（毫秒）
			},
		},
		credit: {
			enable: true, // Display the credit text of the banner image
			text: "じゃが / 恋文と１３歳の女優", // Credit text to be displayed
			url: "https://jagaricoot.fanbox.cc/", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		{
			src: "/favicon/icon.png", // Path of the favicon, relative to the /public directory
			//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
			//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		},
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		LinkPreset.Friends,
		{
			name: "Bilibili",
			url: "https://space.bilibili.com/441865165", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "折叠",
	bio: "世界正年轻",
	links: [
		{
			name: "Bilibili",
			icon: "fa6-brands:bilibili", // Visit https://icones.js.org/ for icon codes
			// You will need to install the corresponding icon set if it's not already included
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://space.bilibili.com/441865165",
		},
		{
			name: "email",
			icon: "fa6-solid:envelope",
			url: "mailto:yu_daa@163.com?subject=From_Blog:%20",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/FFFold",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
