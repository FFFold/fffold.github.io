<script lang="ts">
import type { ECharts } from "echarts";
import { onDestroy, onMount } from "svelte";

export let commitData: Record<string, number>;

interface TooltipParams {
	value: [string, number];
}

let calendarEl: HTMLDivElement;
let chart: ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

onMount(async () => {
	if (!calendarEl || Object.keys(commitData).length === 0) return;

	const echarts = await import("echarts");
	chart = echarts.init(calendarEl);

	const end = new Date();
	const start = new Date();
	start.setFullYear(start.getFullYear() - 1);

	const seriesData = Object.entries(commitData).map(([date, count]) => [
		date,
		count,
	]);

	const option = {
		tooltip: {
			padding: 10,
			backgroundColor: "#555",
			borderColor: "#777",
			borderWidth: 1,
			formatter: (params: TooltipParams) => {
				const [date, count] = params.value;
				return `<div style="font-size: 14px;">${date}：${count} 次提交</div>`;
			},
		},
		visualMap: {
			show: false,
			min: 0,
			max: 5,
			calculable: false,
			inRange: {
				symbol: "rect",
				color: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
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
				range: [
					`${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}-${String(start.getDate()).padStart(2, "0")}`,
					`${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, "0")}-${String(end.getDate()).padStart(2, "0")}`,
				],
				cellSize: [13, 13],
				splitLine: { show: false },
				itemStyle: {
					borderColor: "#fff",
					borderWidth: 2,
				},
				yearLabel: { show: false },
				monthLabel: {
					nameMap: "cn",
					fontSize: 11,
					color: "#3C4858",
				},
				dayLabel: {
					nameMap: "cn",
					fontSize: 11,
					color: "#3C4858",
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

	resizeObserver = new ResizeObserver(() => {
		chart?.resize();
	});
	resizeObserver.observe(calendarEl);
});

onDestroy(() => {
	resizeObserver?.disconnect();
	chart?.dispose();
});
</script>

<div bind:this={calendarEl} class="w-full min-h-[185px]"></div>
