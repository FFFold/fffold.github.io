/**
 * Escapes numeric ratios before `remark-directive` parses Markdown.
 *
 * `remark-directive` treats `:4` in text such as `3:4` as a text directive,
 * including inside image alt text. Markdown renders an escaped colon normally,
 * so this preserves the author's source text while preventing that ambiguity.
 */
function findNextSpecial(line, start) {
	for (let i = start; i < line.length; i++) {
		if (line[i] === "`" || line[i] === "<") {
			return i;
		}
	}
	return -1;
}

function escapeLine(line) {
	let result = "";
	let index = 0;

	while (index < line.length) {
		const char = line[index];

		// Skip inline code spans, including multi-backtick fences.
		if (char === "`") {
			const fence = line.slice(index).match(/^`+/)?.[0] ?? "`";
			const fenceLength = fence.length;
			const close = line.indexOf("`".repeat(fenceLength), index + fenceLength);
			if (close !== -1) {
				result += line.slice(index, close + fenceLength);
				index = close + fenceLength;
				continue;
			}
		}

		// Skip angle-bracket constructs: HTML tags, autolinks, emails, etc.
		if (char === "<") {
			const close = line.indexOf(">", index + 1);
			if (close !== -1) {
				result += line.slice(index, close + 1);
				index = close + 1;
				continue;
			}
		}

		const nextSpecial = findNextSpecial(line, index + 1);
		const end = nextSpecial === -1 ? line.length : nextSpecial;
		const segment = line.slice(index, end);

		result += segment.replace(/(?<=\d):(?=\d)/g, "\\:");
		index = end;
	}

	return result;
}

export function escapeNumericColons(source) {
	const lines = String(source).split("\n");
	let fenceMarker = null;

	const escaped = lines.map((line) => {
		const trimmed = line.trim();
		const fenceMatch = trimmed.match(/^(`{3,}|~{3,})/);

		// Inside a fenced code block: copy verbatim until the closing fence.
		if (fenceMarker) {
			if (
				fenceMatch &&
				fenceMatch[1][0] === fenceMarker[0] &&
				fenceMatch[1].length >= fenceMarker.length
			) {
				fenceMarker = null;
			}
			return line;
		}

		if (fenceMatch) {
			fenceMarker = fenceMatch[1];
			return line;
		}

		// Indented code blocks: copy lines indented with 4+ spaces or a tab.
		if (/^(?: {4}|\t)/.test(line)) {
			return line;
		}

		return escapeLine(line);
	});

	return escaped.join("\n");
}

/** @this {import('unified').Processor} */
export function remarkEscapeNumericColons() {
	const parser = this.parser;

	if (typeof parser !== "function") {
		throw new TypeError(
			"remarkEscapeNumericColons must run after Markdown parsing is configured.",
		);
	}

	this.parser = function parseWithEscapedNumericColons(source) {
		return parser(escapeNumericColons(String(source)));
	};
}
