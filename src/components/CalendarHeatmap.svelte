<script lang="ts">
import type { ECharts } from "echarts";
import { onDestroy, onMount } from "svelte";

export let commitData: Record<string, number>;
export let totalCommits: number;
export let activeDays: number;
export let currentStreak: number;

interface TooltipParams {
	value: [string, number];
}

let calendarEl: HTMLDivElement;
let chart: ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;
let themeObserver: MutationObserver | null = null;
let isDark = false;
let destroyed = false;

onMount(async () => {
	if (!calendarEl || Object.keys(commitData).length === 0) return;

	const echarts = await import("echarts");
	if (destroyed) return;
	chart = echarts.init(calendarEl, null, { renderer: "canvas" });

	isDark = document.documentElement.classList.contains("dark");
	const textColor = isDark ? "#9ca3af" : "#3C4858";

	const now = new Date();
	const fmt = (d: Date) =>
		`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
	const liveCalendarEnd = fmt(now);
	const liveCalendarStart = (() => {
		const d = new Date(now);
		d.setFullYear(d.getFullYear() - 1);
		return fmt(d);
	})();

	const seriesData = Object.entries(commitData).map(([date, count]) => [
		date,
		count,
	]);

	const values = Object.values(commitData).sort((a, b) => a - b);
	const p90 = values.length > 0 ? values[Math.floor(values.length * 0.9)] : 0;
	const maxCommitCount = Math.max(5, p90);

	const option = {
		tooltip: {
			padding: 10,
			backgroundColor: isDark ? "#374151" : "#555",
			borderColor: isDark ? "#4b5563" : "#777",
			borderWidth: 1,
			textStyle: { color: isDark ? "#e5e7eb" : "#fff" },
			formatter: (params: TooltipParams) => {
				const [date, count] = params.value;
				return `<div style="font-size: 14px;">${date}：${count} 次提交</div>`;
			},
		},
		visualMap: {
			show: false,
			min: 0,
			max: maxCommitCount,
			calculable: false,
			inRange: {
				symbol: "rect",
				color: isDark
					? ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]
					: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
			},
			itemWidth: 12,
			itemHeight: 12,
			orient: "horizontal",
			left: "center",
			top: 0,
		},
		calendar: [
			{
				top: 30,
				left: "center",
				range: [liveCalendarStart, liveCalendarEnd],
				cellSize: [13, 13],
				splitLine: { show: false },
				itemStyle: {
					color: isDark ? "#161b22" : "#ebedf0",
					borderColor: isDark ? "#161b22" : "#fff",
					borderWidth: 2,
				},
				yearLabel: { show: false },
				monthLabel: {
					nameMap: "cn",
					fontSize: 11,
					color: textColor,
				},
				dayLabel: {
					nameMap: "cn",
					fontSize: 11,
					color: textColor,
				},
			},
		],
		series: [
			{
				type: "heatmap",
				coordinateSystem: "calendar",
				calendarIndex: 0,
				data: seriesData,
			},
		],
	};

	chart.setOption(option);

	// 监听主题变化
	themeObserver = new MutationObserver(() => {
		isDark = document.documentElement.classList.contains("dark");
		const newTextColor = isDark ? "#9ca3af" : "#3C4858";
		chart?.setOption({
			tooltip: {
				backgroundColor: isDark ? "#374151" : "#555",
				borderColor: isDark ? "#4b5563" : "#777",
				textStyle: { color: isDark ? "#e5e7eb" : "#fff" },
			},
			visualMap: {
				inRange: {
					color: isDark
						? ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]
						: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
				},
			},
			calendar: [
				{
					itemStyle: {
						color: isDark ? "#161b22" : "#ebedf0",
						borderColor: isDark ? "#161b22" : "#fff",
					},
					monthLabel: { color: newTextColor },
					dayLabel: { color: newTextColor },
				},
			],
		});
	});
	themeObserver.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["class"],
	});

	resizeObserver = new ResizeObserver(() => {
		chart?.resize();
	});
	resizeObserver.observe(calendarEl);
});

onDestroy(() => {
	destroyed = true;
	resizeObserver?.disconnect();
	themeObserver?.disconnect();
	chart?.dispose();
});

// 颜色图例
const legendColors = {
	light: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
	dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};
</script>

<div class="calendar-card">
	<div class="calendar-inner">
		<div class="calendar-header">
			<div class="calendar-stats">
				<div class="stat-item">
					<span class="stat-value">{totalCommits}</span>
					<span class="stat-label">次提交</span>
				</div>
				<div class="stat-item">
					<span class="stat-value">{activeDays}</span>
					<span class="stat-label">天活跃</span>
				</div>
				<div class="stat-item">
					<span class="stat-value">{currentStreak}</span>
					<span class="stat-label">天连续</span>
				</div>
			</div>
		</div>
		
		<div bind:this={calendarEl} class="calendar-chart"></div>
		
		<div class="calendar-footer">
			<div class="legend">
				<span class="legend-label">少</span>
				{#each (isDark ? legendColors.dark : legendColors.light) as color}
					<div class="legend-item" style="background-color: {color}"></div>
				{/each}
				<span class="legend-label">多</span>
			</div>
		</div>
	</div>
</div>

<style>
	.calendar-card {
		display: flex;
		width: 100%;
		border-radius: var(--radius-large, 1rem);
		overflow: hidden;
		position: relative;
		min-height: 8rem;
		margin-top: 1rem;
	}
	
	.calendar-card > .calendar-inner {
		background: var(--card-bg, #fff);
		z-index: 10;
		padding: 1.5rem 2rem;
		position: relative;
		width: 100%;
		border-radius: var(--radius-large, 1rem);
	}
	
	:root.dark .calendar-card > .calendar-inner {
		background: var(--card-bg, #1a1a1a);
	}
	
	.calendar-header {
		margin-bottom: 16px;
	}
	
	.calendar-stats {
		display: flex;
		gap: 24px;
	}
	
	.stat-item {
		display: flex;
		align-items: baseline;
		gap: 4px;
	}
	
	.stat-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary, oklch(0.70 0.14 var(--hue)));
	}
	
	.stat-label {
		font-size: 0.875rem;
		color: #6b7280;
	}
	
	:root.dark .stat-label {
		color: #9ca3af;
	}
	
	.calendar-chart {
		width: 100%;
		min-height: 185px;
		overflow-x: auto;
		overflow-y: hidden;
	}
	
	.calendar-footer {
		margin-top: 4px;
		display: flex;
		justify-content: flex-end;
	}
	
	.legend {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 0.75rem;
		color: #6b7280;
	}
	
	:root.dark .legend {
		color: #9ca3af;
	}
	
	.legend-label {
		margin: 0 2px;
	}
	
	.legend-item {
		width: 12px;
		height: 12px;
		border-radius: 2px;
	}
</style>
