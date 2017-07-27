// === Color handling ===


// solar9 interpolated to 255 points with
// http://gka.github.io/palettes/
// Beyond 256, fine colour differences become
// indistinguishable on most screens, and
// even then only when sorted as a gradient.
// So this is already slight overkill.
export const solar256 = [
	'#ffffff',
	'#ffffcc', '#fffeca', '#fffdc8', '#fffcc6', '#fffcc4', '#fffac1', '#fffabf', '#fff8bc', '#fff7ba', '#fff7b7', '#fff5b5', '#fff4b2', '#fff4b0', '#fff2ae', '#fff1ab', '#fff1a9', '#fff0a6', '#ffefa4', '#ffeda1', '#ffec9f', '#ffeb9d', '#ffea9b', '#ffea99', '#ffe897', '#ffe895', '#ffe793', '#ffe590', '#ffe48e', '#ffe48c', '#ffe28a', '#ffe188', '#ffe085', '#ffdf82', '#fede80', '#fede80', '#fedd7e', '#fedc7b', '#feda79', '#fed976', '#fed774', '#fed673', '#fed572', '#fed571', '#fed370', '#fed36f', '#fed26e', '#fed06d', '#ffcf6b', '#ffce6a', '#ffcd69', '#ffcc67', '#ffca66', '#ffc965', '#ffc763', '#ffc762', '#ffc561', '#ffc460', '#ffc35f', '#ffc25e', '#ffc15c', '#ffc05b', '#ffbf5a', '#ffbd58', '#febd57', '#febc56', '#febb55', '#feba54', '#feb953', '#feb751', '#feb550', '#feb54f', '#feb34e', '#feb34d', '#feb14c', '#feb04b', '#feae4a', '#feae4a', '#feac49', '#feab49', '#fea948', '#fea848', '#fea747', '#fea747', '#fea446', '#fea445', '#fea345', '#fea145', '#fe9f44', '#fe9e43', '#fe9e43', '#fe9b42', '#fe9b42', '#fe9941', '#fe9841', '#fe9740', '#fd9640', '#fd953f', '#fd943f', '#fd923e', '#fd913d', '#fd8f3d', '#fd8e3d', '#fd8c3c', '#fd8b3b', '#fd8a3b', '#fd883a', '#fd883a', '#fd8539', '#fd8439', '#fd8339', '#fd8138', '#fd8138', '#fd7e37', '#fd7e37', '#fd7b36', '#fd7a36', '#fd7935', '#fd7835', '#fd7534', '#fd7434', '#fd7233', '#fd7133', '#fd6f32', '#fd6e32', '#fd6d32', '#fd6a31', '#fd6931', '#fd6730', '#fd6530', '#fd652f', '#fd632f', '#fd602e', '#fd5e2e', '#fd5d2d', '#fd5b2d', '#fd5a2d', '#fc582c', '#fc572c', '#fc542b', '#fc522b', '#fc512b', '#fc4e2a', '#fc4d2a', '#fa4c29', '#fa4b29', '#f94928', '#f94828', '#f84727', '#f74627', '#f64527', '#f54326', '#f54226', '#f44126', '#f33f25', '#f23e25', '#f23c24', '#f13c24', '#f03a23', '#f03823', '#ef3723', '#ef3622', '#ee3422', '#ed3321', '#ec3121', '#eb3021', '#ea2e20', '#ea2c20', '#e92b1f', '#e8291f', '#e8281f', '#e7261e', '#e7241e', '#e6221d', '#e51f1d', '#e41f1d', '#e31c1c', '#e21a1c', '#e1191d', '#e0191d', '#df171d', '#de171e', '#dc161e', '#db161f', '#da151f', '#d9141f', '#d81320', '#d61320', '#d51120', '#d41121', '#d31021', '#d20f21', '#d00f22', '#cf0d22', '#ce0d22', '#cd0c23', '#cb0b23', '#ca0a23', '#c90923', '#c80824', '#c60724', '#c60624', '#c40525', '#c30425', '#c20325', '#c10225', '#bf0226', '#be0026', '#bc0026', '#bb0026', '#ba0026', '#b90026', '#b80026', '#b60026', '#b50026', '#b40026', '#b20026', '#b10026', '#b00026', '#ae0026', '#ac0026', '#ab0026', '#ab0026', '#a80026', '#a70026', '#a60026', '#a50026', '#a40026', '#a20026', '#a20026', '#a00026', '#9e0026', '#9d0026', '#9c0026', '#9a0026', '#990026', '#980026', '#970026', '#960026', '#940026', '#930026', '#920026', '#910026', '#900026', '#8d0026', '#8d0026', '#8c0026', '#8a0026', '#880026', '#870026', '#870026', '#850026', '#830026', '#820026', '#820026', '#800026'
];

// Category colors from D3 (https://github.com/mbostock/d3/wiki/Ordinal-Scales)
export const category20 = [
	'#ffffff',	// White for zeros
	'#1f77b4',
	'#ff7f0e',
	'#2ca02c',
	'#d62728',
	'#9467bd',
	'#8c564b',
	'#e377c2',
	'#7f7f7f',
	'#bcbd22',
	'#17becf',
	'#9edae5',
	'#aec7e8',
	'#ffbb78',
	'#98df8a',
	'#ff9896',
	'#c5b0d5',
	'#c49c94',
	'#f7b6d2',
	'#c7c7c7',
	'#dbdb8d'
];

export const YlGnBu256 = [
	'#ffffff',
	'#ffffd9', '#fefed8', '#fbfdd6', '#f9fdd5', '#f8fcd5', '#f6fcd3', '#f4fbd2', '#f3fad1', '#f1fad0', '#eff9ce', '#edf8cd', '#ebf7cc', '#eaf6cb', '#e7f5c9', '#e6f5c8', '#e4f4c8', '#e2f3c6', '#e0f2c5', '#def2c4', '#ddf1c3', '#dbf1c1', '#d9f0c0', '#d8efbf', '#d6efbe', '#d4eebd', '#d2edbb', '#d0ecbb', '#cfebb9', '#ccebb8', '#cbeab7', '#cae9b6', '#c7e9b5', '#c5e7b4', '#c4e7b4', '#c1e6b5', '#c0e5b5', '#bee5b5', '#bbe3b5', '#b9e3b6', '#b8e2b6', '#b6e2b6', '#b4e0b6', '#b1dfb7', '#afdfb7', '#aedeb7', '#acdeb7', '#a9ddb7', '#a7dbb8', '#a4dbb8', '#a4dab8', '#a2d9b8', '#9fd8b8', '#9cd8b9', '#9ad7b9', '#98d6b9', '#97d6b9', '#94d4ba', '#91d4ba', '#8ed3ba', '#8ed2ba', '#8bd1ba', '#88d0bb', '#85cfbb', '#83cfbb', '#81cebb', '#80cdbc', '#7fccbc', '#7dccbc', '#7ccbbc', '#7ac9bd', '#78c8bd', '#76c7bd', '#74c6be', '#72c5be', '#6fc5be', '#6dc3bf', '#6bc3bf', '#6ac2bf', '#69c1bf', '#67c0c0', '#64c0c0', '#62bec0', '#60bdc1', '#5dbcc1', '#5bbcc1', '#58bbc1', '#55b9c2', '#53b9c2', '#52b8c2', '#50b8c2', '#4db7c3', '#4ab5c3', '#47b5c3', '#43b4c4', '#40b3c4', '#3eb2c4', '#3db1c4', '#3cb0c4', '#3cafc4', '#3baec4', '#3aacc3', '#39abc3', '#39aac3', '#38a9c3', '#37a8c3', '#36a7c3', '#36a6c3', '#35a6c3', '#34a4c3', '#33a3c2', '#32a2c2', '#31a1c2', '#2fa0c2', '#2e9ec2', '#2d9dc2', '#2d9dc2', '#2b9bc1', '#2a9ac1', '#2999c1', '#2899c1', '#2798c1', '#2697c1', '#2595c1', '#2395c1', '#2294c0', '#2192c0', '#1f91c0', '#1e91c0', '#1d90c0', '#1e8ebf', '#1e8dbf', '#1e8cbe', '#1f8bbe', '#1f8abd', '#1f89bd', '#2089bc', '#2087bc', '#2086bb', '#2185bb', '#2183ba', '#2182ba', '#2181b9', '#2181b9', '#227fb8', '#227eb8', '#227db7', '#227cb7', '#227cb6', '#227bb6', '#227ab5', '#2379b5', '#2377b4', '#2376b4', '#2375b3', '#2374b3', '#2374b2', '#2372b2', '#2371b1', '#2371b1', '#2370b0', '#236eb0', '#246daf', '#246cae', '#246bae', '#2469ae', '#2468ad', '#2568ad', '#2567ac', '#2566ac', '#2565ab', '#2564ab', '#2562aa', '#2562aa', '#2561a9', '#2560a9', '#255ea9', '#265ea8', '#265da8', '#265ba7', '#265aa7', '#265aa6', '#2658a6', '#2657a5', '#2656a5', '#2555a4', '#2553a4', '#2552a3', '#2551a3', '#2550a2', '#254fa2', '#254fa1', '#254ea1', '#254da0', '#254c9f', '#254a9e', '#254a9d', '#25489d', '#24489c', '#24469b', '#24469a', '#24459a', '#244498', '#244298', '#244297', '#244197', '#234096', '#234095', '#233e94', '#233d93', '#233c93', '#233c92', '#233a91', '#223a90', '#223890', '#22388f', '#22378e', '#22358d', '#21358c', '#21348c', '#21328b', '#21318a', '#203189', '#203088', '#1f2e87', '#1f2e86', '#1e2e84', '#1d2d82', '#1d2d81', '#1c2b7f', '#1c2b7f', '#1a2a7c', '#1a2a7b', '#192979', '#182977', '#182876', '#172874', '#162773', '#152671', '#142670', '#14266f', '#13256d', '#12256c', '#112469', '#112368', '#102267', '#0f2265', '#0e2164', '#0e2162', '#0d2161', '#0c205f', '#0b1f5f', '#0a1e5c', '#0a1e5b', '#091d59', '#081d58',
];

export function getPalette(colorMode) {
	switch (colorMode) {
		case 'Heatmap':
		case 'Flame':
			return solar256;
		case 'Categorical':
		case 'Stacked':
			return category20;
		default:
			return [];
	}
}

function blackColor() {
	return 'black';
}

const log2 = Math.log2;

export const logProject = (x) => x >= 0 ? log2(1 + x) : -log2(1 - x);

export const clipData = (attr, settings) => {
	let { min, max } = attr;
	let { lowerBound, upperBound } = settings;
	if (lowerBound === undefined) {
		lowerBound = 0;
	}
	if (upperBound === undefined) {
		upperBound = 100;
	}

	if (settings.log2Color) {
		min = logProject(min);
		max = logProject(max);
	}

	// boundaries for clipping, only applies to heatmap-like situations
	// anything under lowerBound is "zero",
	// anything above upperBound is "maxColor"
	let clipMin = min;
	let clipMax = max;
	if (settings.clip) {
		const delta = max - min;
		clipMin = min + lowerBound * delta / 100;
		clipMax = min + upperBound * delta / 100;
	}
	return { min, max, clipMin, clipMax };
};

export function attrToColorFactory(colorAttr, colorMode, settings) {
	settings = settings || { log2Color: true };
	const palette = getPalette(colorMode);
	switch (colorMode) {
		case 'Categorical':
		case 'Stacked':
			let { mostFreq } = colorAttr.colorIndices;
			return (
				(val) => {
					const cIdx = mostFreq[val] | 0;
					return palette[cIdx];
				}
			);
		case 'Heatmap':
		case 'Flame':
			let { min, max, clipMin, clipMax } = clipData(colorAttr, settings);
			const isZero = min === 0;

			if (min === max) {
				if (isZero) {
					const c = palette[0];
					return () => c;
				}
				const c = palette[1];
				return () => c;
			}

			const clipDelta = (clipMax - clipMin) || 1;
			const maxColor = palette[palette.length - 1];
			if (isZero) { // zero-value is coloured differently
				const minColor = palette[0];
				const colorIdxScale = (palette.length - 1) / clipDelta;
				return settings.log2Color ? (
					(val) => {
						val = logProject(val);
						if (val >= clipMax) {
							return maxColor;
						}
						else if (val <= clipMin) {
							return minColor;
						}
						const cIdx = ((val - clipMin) * colorIdxScale) | 0;
						return palette[cIdx];

					}
				) : (
						(val) => {
							if (val >= clipMax) {
								return maxColor;
							}
							else if (val <= clipMin) {
								return minColor;
							}
							const cIdx = ((val - clipMin) * colorIdxScale) | 0;
							return palette[cIdx];

						}
					);
			}
			// skip using special color for the zero-value for
			// dataranges that have negative values and/or
			// no zero value
			const minColor = palette[1];
			const colorIdxScale = (palette.length - 2) / clipDelta;
			return settings.log2Color ? (
				(val) => {
					val = logProject(val);
					if (val >= clipMax) {
						return maxColor;
					}
					else if (val <= clipMin) {
						return minColor;
					}
					const cIdx = 1 + ((val - clipMin) * colorIdxScale) | 0;
					return palette[cIdx];

				}
			) : (
					(val) => {
						if (val >= clipMax) {
							return maxColor;
						}
						else if (val < clipMin) {
							return minColor;
						}
						const cIdx = 1 + ((val - clipMin) * colorIdxScale) | 0;
						return palette[cIdx];

					}
				);

		default:
			return blackColor;
	}
}

// Again, the returned function is called inside an inner loop, which
// is why we have so much code duplication.
export function attrToColorIndexFactory(colorAttr, colorMode, settings) {
	switch (colorMode) {
		case 'Categorical':
		case 'Stacked':
			let { mostFreq } = colorAttr.colorIndices;
			return (
				(val) => mostFreq[val] | 0
			);
		case 'Heatmap':
		case 'Flame':
			let { min, max, clipMin, clipMax } = clipData(colorAttr, settings);
			const isZero = min === 0;
			if (min === max) {
				if (isZero) {
					return () => 0;
				}
				return () => 1;

			}

			const clipDelta = (clipMax - clipMin) || 1;
			const paletteEnd = getPalette(colorMode).length - 1;
			if (isZero) { // zero-value is coloured differently
				const colorIdxScale = paletteEnd / clipDelta;
				return settings.log2Color ? (
					(val) => {
						val = logProject(val);
						if (val >= clipMax) {
							return paletteEnd;
						}
						else if (val <= clipMin) {
							return 0;
						}
						return ((val - clipMin) * colorIdxScale) | 0;

					}
				) : (
						(val) => {
							if (val >= clipMax) {
								return paletteEnd;
							}
							else if (val <= clipMin) {
								return 0;
							}
							return ((val - clipMin) * colorIdxScale) | 0;

						}
					);
			}
			// skip using special color for the zero-value for
			// dataranges that have negative values and/or
			// no zero value
			const colorIdxScale = (paletteEnd - 1) / clipDelta;
			return settings.log2Color ? (
				(val) => {
					val = logProject(val);
					if (val >= clipMax) {
						return paletteEnd;
					}
					else if (val <= clipMin) {
						return 1;
					}
					return 1 + ((val - clipMin) * colorIdxScale) | 0;

				}
			) : (
					(val) => {
						if (val >= clipMax) {
							return paletteEnd;
						}
						else if (val <= clipMin) {
							return 1;
						}
						return 1 + ((val - clipMin) * colorIdxScale) | 0;

					}
				);

		default:
			return blackColor;
	}
}

// === Maths helper functions ===

export function findMostCommon(array = [], start = 0, end = 0) {
	end = end < array.length ? end : array.length;
	let i = 0, j = 0, sorted = array.slice(start, end).sort(),
		val = sorted[i], mv = val, mc = 1;
	// linearly run through the array, count unique values
	while (val !== null && val !== undefined) {

		// keep going until a different value is found
		while (sorted[j + 1024] === val) { j += 1024; }
		while (sorted[j + 256] === val) { j += 256; }
		while (sorted[j + 64] === val) { j += 64; }
		while (sorted[j + 8] === val) { j += 8; }
		while (sorted[j] === val) { j++; }

		if (j - i > mc) {
			mv = val;
			mc = j - i;
		}
		i = j;
		val = sorted[j];
	}
	return mv;
}


export function countUniques(array = [], start = 0, end) {
	end = end < array.length ? end : array.length;
	let
		sorted = array.slice(start, end);
	sorted.sort();
	let
		i = 0,
		j = 0,
		val = sorted[i],
		min = val,
		max = val,
		mv = val,
		mc = 1,
		uniques = [];
	// linearly run through the array, count unique values
	while (val !== null && val !== undefined) {
		min = min < val ? min : val;
		max = max > val ? max : val;

		// keep going until a different value is found
		while (sorted[j + 1024] === val) { j += 1024; }
		while (sorted[j + 256] === val) { j += 256; }
		while (sorted[j + 64] === val) { j += 64; }
		while (sorted[j + 8] === val) { j += 8; }
		while (sorted[j] === val) { j++; }

		uniques.push({ val, count: j - i });
		if (j - i > mc) {
			mv = val;
			mc = j - i;
		}
		i = j;
		val = sorted[j];
	}
	return { uniques, min, max, mv };
}

export function arrayConstr(arrayType) {
	switch (arrayType) {
		case 'float32':
			return Float32Array;
		case 'number':
		case 'float64':
			return Float64Array;
		case 'integer':
		case 'int32':
			return Int32Array;
		case 'int16':
			return Int16Array;
		case 'int8':
			return Int8Array;
		case 'uint32':
			return Uint32Array;
		case 'uint16':
			return Uint16Array;
		case 'uint8':
			return Uint8Array;
		default:
	}
	return Array;
}

export function makeAttr(name = 'unlabeled data', arrayType = 'number', data = []) {
	data = arrayConstr(arrayType).from(data);
	const { uniques, min, max } = countUniques(data);
	const _uniques = uniques
		.slice(0)
		.sort((a, b) => (
			a.count < b.count ? -1 : a.count > b.count ? 1 : 0
		));
	let mostFreq = {};
	for (let i = 0; i < _uniques.length; i++) {
		mostFreq[i] = _uniques[i].val;
	}
	const colorIndices = { mostFreq };
	return {
		name,
		arrayType,
		uniques,
		data,
		colorIndices,
		min,
		max,
	};
}