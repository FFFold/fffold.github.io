import type { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants";

export type SiteConfig = {
	title: string;
	subtitle: string;

	lang:
		| "en"
		| "zh_CN"
		| "zh_TW"
		| "ja"
		| "ko"
		| "es"
		| "th"
		| "vi"
		| "tr"
		| "id";

	themeColor: {
		hue: number;
		fixed: boolean;
	};

	// 壁纸模式配置
	wallpaperMode: {
		defaultMode: "banner" | "fullscreen" | "none"; // 默认壁纸模式：banner=顶部横幅，fullscreen=全屏壁纸，none=无壁纸
		showModeSwitchOnMobile?: "off" | "mobile" | "desktop" | "both"; // 整体布局方案切换按钮显示设置：off=隐藏，mobile=仅移动端，desktop=仅桌面端，both=全部显示
	};

	banner: {
		enable: boolean;
		src:
			| string
			| string[]
			| {
					desktop?: string | string[];
					mobile?: string | string[];
			  }; // 支持单个图片、图片数组或分别设置桌面端和移动端图片
		position?: "top" | "center" | "bottom";
		carousel?: {
			enable: boolean; // 是否启用轮播
			interval: number; // 轮播间隔时间（秒）
		};
		waves?: {
			enable: boolean; // 是否启用水波纹效果
			performanceMode?: boolean; // 性能模式：减少动画复杂度
			mobileDisable?: boolean; // 移动端禁用
		};
		imageApi?: {
			enable: boolean; // 是否启用图片API
			url: string; // API地址，返回每行一个图片链接的文本
		};
		homeText?: {
			enable: boolean; // 是否在首页显示自定义文字
			title?: string; // 主标题
			subtitle?: string | string[]; // 副标题，支持单个字符串或字符串数组
			typewriter?: {
				enable: boolean; // 是否启用打字机效果
				speed: number; // 打字速度（毫秒）
				deleteSpeed: number; // 删除速度（毫秒）
				pauseTime: number; // 完整显示后的暂停时间（毫秒）
			};
		};
		credit: {
			enable: boolean;
			text: string;
			url?: string;
		};
		navbar?: {
			transparentMode?: "semi" | "full" | "semifull"; // 导航栏透明模式
		};
	};
	toc: {
		enable: boolean;
		depth: 1 | 2 | 3;
	};

	favicon: Favicon[];
};

export type Favicon = {
	src: string;
	theme?: "light" | "dark";
	sizes?: string;
};

export enum LinkPreset {
	Home = 0,
	Archive = 1,
	About = 2,
	Friends = 3,
}

export type NavBarLink = {
	name: string;
	url: string;
	external?: boolean;
};

export type NavBarConfig = {
	links: (NavBarLink | LinkPreset)[];
};

export type ProfileConfig = {
	avatar?: string;
	name: string;
	bio?: string;
	links: {
		name: string;
		url: string;
		icon: string;
	}[];
};

export type LicenseConfig = {
	enable: boolean;
	name: string;
	url: string;
};

export type LIGHT_DARK_MODE =
	| typeof LIGHT_MODE
	| typeof DARK_MODE
	| typeof AUTO_MODE;

export type BlogPostData = {
	body: string;
	title: string;
	published: Date;
	description: string;
	tags: string[];
	draft?: boolean;
	image?: string;
	category?: string;
	prevTitle?: string;
	prevSlug?: string;
	nextTitle?: string;
	nextSlug?: string;
};

export type ExpressiveCodeConfig = {
	theme: string;
};
