import {
	textSize,
	textStyle,
	drawText
} from './canvas';

import {
	attrToColorFactory,
	findMostCommon,
	logProject
} from './util';

function selectPlotter(mode) {
	switch (mode) {
		case 'Categorical':
			return categoriesPainter;
		case 'Stacked':
			return stackedCategoriesPainter;
		case 'Heatmap':
			return heatmapPainter;
		case 'Flame':
			return flamemapPainter;
		case 'Bars':
		default:
			return barPaint;
	}
}

export function sparkline(attr, mode, settings) {
	if (!attr) {
		return () => { };
	}
	settings = settings || {};
	const {
		sort,
		logScale
	} = settings;

	// =====================
	// Prep data for plotter
	// =====================
	let range = {
		left: 0,
		right: attr.data.length,
		total: attr.data.length,
		data: attr.arrayType === 'uint8' ? Uint8Array.from(attr.data) : Uint16Array.from(attr.data),
		min: attr.min,
		max: attr.max,
	};
	if (sort){
		range.data.sort((a, b) => ( a < b ? -sort : a > b ? sort : 0));
	}
	const paint = selectPlotter(mode);

	const dataToColor = attrToColorFactory(attr, mode, { log2Color: logScale });
	return (context) => {
		// draw sparkline + label
		sparklinePainter(context, paint, dataToColor, range, settings);
		labelPainter(context, attr.name);
	};
}

function sparklinePainter(context, paint, dataToColor, range, settings) {
	range.unrounded = range.right - range.left;
	// We need to find the effective rangeWidth spanned by all bars.
	// Mathematically speaking the following equation is true:
	//   rangeWidth/context.width = totalRange/unroundedRange
	// Therefore:
	range.width = (context.width * range.total / range.unrounded) | 0;

	// Note that the bars should have a width of:
	//   barWidth = range.width / range.total
	//            = context.width / range.unrounded;
	// Total pixels by which the first bar is outside the canvas:
	//   xOffset = range.leftFrac * barWidth
	// Which is equal to:
	range.leftFrac = Math.floor(range.left) - range.left;
	range.xOffset = (range.leftFrac * context.width / range.unrounded) | 0;
	range.ratio = context.pixelRatio;
	range.scale = context.pixelScale;
	paint(context, range, dataToColor, settings);
}

// Helper functions

function calcMeans(range) {
	const { data } = range;
	// Support high-density displays.
	// Downside: using browser-zoom scales up plots as well
	const ratio = range.ratio * range.scale;
	const width = range.width / ratio;
	// determine real start and end of range,
	// skipping undefined padding if present.
	let start = 0;
	let end = data.length;
	while (data[start] === undefined && start < end) { start++; }
	while (data[end] === undefined && end > start) { end--; }

	let barWidth = 0;
	// outlier = visually most relevant datapoint
	let means;
	if (data.length <= width) {
		// more pixels than data
		barWidth = range.width / data.length;
		means = data;
	}
	else {
		// more data than pixels
		barWidth = ratio;

		// calculate means
		means = [];
		for (let i = 0; i < width; i++) {
			let i0 = (i * data.length / width) | 0;
			let i1 = (((i + 1) * data.length / width) | 0);
			// skip the zero-padding on both sides
			if (i0 < start || i0 >= end) {
				means[i] = 0;
				continue;
			}
			i1 = i1 < end ? i1 : end;
			let sum = 0;
			for (let j = i0; j < i1; j++) {
				let val = data[j];
				sum += val;
			}
			const mean = (i1 - i0) !== 0 ? sum / (i1 - i0) : sum;
			means[i] = mean;
		}
	}
	return { means, barWidth };
}

// Plotting functions. The plotters assume a horizontal plot.
// To draw vertically we rotate/translate the context before
// passing it to the plotter.

// Depending on the dataset size, we either have:
//  - one or more pixels/lines available per data point
//  - multiple data points per available pixel/line
// In the former case, the painter functions will widen the bars
// or spread the strings across the space
// To accomodate for the latter case, we calculate the means of
// the data at that pixel.
// If we have strings for data, we concatenate them.


function categoriesPainter(context, range, dataToColor) {
	const { data, width, xOffset } = range;
	context.fillStyle = 'white';
	if (data.length <= width) {
		// more pixels than data
		const barWidth = width / data.length;
		let i = 0;
		while (i < data.length) {
			let val = data[i];
			let j = i, nextVal;
			// advance while value doesn't change
			do {
				j++;
				nextVal = data[j];
			} while (val === nextVal && j < data.length);
			context.fillStyle = dataToColor(val || 0);
			// force to pixel grid
			const x = (xOffset + i * barWidth) | 0;
			const roundedWidth = ((xOffset + j * barWidth) | 0) - x;
			context.fillRect(x, 0, roundedWidth, context.height);
			i = j;
		}
	}
	else {
		// more data than pixels
		let i = 0;
		while (i < width) {
			const i0 = (i * data.length / width) | 0;
			const i1 = ((i + 1) * data.length / width) | 0;
			const mostCommonValue = findMostCommon(data, i0, i1) || 0;
			let j = i, nextCommonValue;
			do {
				j++;
				const j0 = (j * data.length / width) | 0;
				const j1 = ((j + 1) * data.length / width) | 0;
				nextCommonValue = findMostCommon(data, j0, j1) || 0;
			} while (mostCommonValue === nextCommonValue && j < width);
			context.fillStyle = dataToColor(mostCommonValue);
			context.fillRect(xOffset + i, 0, (j - i), context.height);
			i = j;
		}
	}
}

function stackedCategoriesPainter(context, range, dataToColor) {
	const { data, xOffset } = range;
	// Support high-density displays.
	// Downside: using browser-zoom scales up plots as well
	let ratio = range.ratio * range.scale;
	ratio = ratio > 1 ? ratio : 1;
	// Important: we MUST round this number, or the plotter
	// crashes the browser for results that are not
	// powers of two.
	const width = (range.width / ratio) | 0;
	const { height } = context;
	context.fillStyle = 'white';
	if (data.length <= width) {
		// more pixels than data
		const barWidth = width / data.length;
		let i = 0;
		while (i < data.length) {
			let val = data[i];
			let j = i, nextVal;
			// advance while value doesn't change
			do {
				j++;
				nextVal = data[j];
			} while (val === nextVal && j < data.length);
			context.fillStyle = dataToColor(val || 0);
			// force to pixel grid
			const x = (xOffset + i * barWidth) | 0;
			const roundedWidth = ((xOffset + j * barWidth) | 0) - x;
			context.fillRect(x, 0, roundedWidth, context.height);
			i = j;
		}
	}
	else {
		// more data than pixels
		const barWidth = ratio;

		let barSlices = {}, i = width;
		while (i--) {
			const x = (xOffset + i * barWidth) | 0;
			const x1 = (xOffset + (i + 1) * barWidth) | 0;
			const roundedWidth = x1 - x;

			let i0 = i - 1 < 0 ? 0 : i - 1;
			let i1 = i + 2 > width ? width : i + 2;
			i0 = (i0 * data.length / width) | 0;
			i1 = (i1 * data.length / width) | 0;

			/**
			 * Old way. Don't do this! Creates too many throwaway arrays,
			 * leads to high GC churn, and sometimes allocation errors
			 * can crash the tab! Only kept as a reminder why we should
			 *  not "simplify" this code later
			 */
			// let barSlice = data.slice(i0, i1);
			// barSlice.sort();

			const l = i1 - i0;
			let barSlice = barSlices[l];
			if (barSlice) {
				while (i1 - 16 > i0) {
					barSlice[--i1 - i0] = data[i1];
					barSlice[--i1 - i0] = data[i1];
					barSlice[--i1 - i0] = data[i1];
					barSlice[--i1 - i0] = data[i1];
					barSlice[--i1 - i0] = data[i1];
					barSlice[--i1 - i0] = data[i1];
					barSlice[--i1 - i0] = data[i1];
					barSlice[--i1 - i0] = data[i1];
					barSlice[--i1 - i0] = data[i1];
					barSlice[--i1 - i0] = data[i1];
					barSlice[--i1 - i0] = data[i1];
					barSlice[--i1 - i0] = data[i1];
					barSlice[--i1 - i0] = data[i1];
					barSlice[--i1 - i0] = data[i1];
					barSlice[--i1 - i0] = data[i1];
					barSlice[--i1 - i0] = data[i1];
				}
				while (i1-- > i0) {
					barSlice[i1 - i0] = data[i1];
				}
			}
			else {
				// Cach the barSlice to avoid allocating thousands of
				// tiny typed arrays and immediately throwing them away.
				// Realistically we only have to cache a few options
				// due to possible rounding error.
				barSlice = data.slice(i0, i1);
				barSlices[l] = barSlice;
			}
			barSlice.sort();
			let j = 0, k = 0;
			while (j < l) {
				const val = barSlice[j];
				do {
					k++;
				} while (k < l && val === barSlice[k]);
				const y = (height * j / l) | 0;
				const y1 = (height * k / l) | 0;
				const roundedHeight = y1 - y;
				context.fillStyle = dataToColor(val || 0);
				context.fillRect(x, y, roundedWidth, roundedHeight);
				j = k;
			}
		}
	}
}

function barPaint(context, range, _, settings) {
	if (settings.logScale){
		_barPaintLog(context, range);
	} else {
		_barPaint(context, range);
	}
	const ratio = (range.ratio || 1);
	textStyle(context);
	const minmaxSize = 8 * ratio;
	textSize(context, minmaxSize);
	const min = range.min || 0;
	const max = range.max || 0;
	drawText(context, min.toPrecision(3), 4 * ratio, context.height - 2);
	drawText(context, max.toPrecision(3), 4 * ratio, 2 + minmaxSize);
}

function _barPaint(context, range,){
	const { means, barWidth } = calcMeans(range);
	const max = range.max || 0;

	// factor to multiply the bar values by, to calculate bar height
	// Scaled down a tiny bit to keep vertical space between sparklines
	const barScale = context.height * 0.9375 / max || 0;
	let i = 0, x = range.xOffset;

	// draw bars (outliers)
	context.fillStyle = '#000000';
	while (i < means.length) {

		// Even if outliers[i] is not a number, OR-masking forces it to 0
		const barHeight = (means[i] * barScale) | 0;

		// advance while height doesn't change
		let j = i, nextHeight;
		do {
			j++;
			nextHeight = (means[j] * barScale) | 0;
		} while (barHeight === nextHeight && i + j < means.length);

		const w = (j - i) * barWidth;

		// zero values are an extremely common case,
		// so skip those pointless draw calls
		if (barHeight) {
			// canvas defaults to positive y going *down*, so to
			// draw from bottom to top we start at context height and
			// subtract the bar height.
			let y = context.height - barHeight | 0;

			// force to pixel grid
			context.fillRect(x | 0, y, ((x + w) | 0) - (x | 0), barHeight);
		}
		i = j; x += w;
	}
}

function _barPaintLog(context, range,){
	const { means, barWidth } = calcMeans(range);
	const max = range.max || 0;

	// factor to multiply the bar values by, to calculate bar height
	// Scaled down a tiny bit to keep vertical space between sparklines
	const barScale = context.height * 0.9375 / logProject(max) || 0;
	let i = 0, x = range.xOffset;

	// draw bars (outliers)
	context.fillStyle = '#000000';
	while (i < means.length) {

		// Even if outliers[i] is not a number, OR-masking forces it to 0
		const barHeight = (logProject(means[i]) * barScale) | 0;

		// advance while height doesn't change
		let j = i, nextHeight;
		do {
			j++;
			nextHeight = (logProject(means[j]) * barScale) | 0;
		} while (barHeight === nextHeight && i + j < means.length);

		const w = (j - i) * barWidth;

		// zero values are an extremely common case,
		// so skip those pointless draw calls
		if (barHeight) {
			// canvas defaults to positive y going *down*, so to
			// draw from bottom to top we start at context height and
			// subtract the bar height.
			let y = context.height - barHeight | 0;

			// force to pixel grid
			context.fillRect(x | 0, y, ((x + w) | 0) - (x | 0), barHeight);
		}
		i = j; x += w;
	}
}

function heatmapPainter(context, range, dataToColor) {
	const { means, barWidth } = calcMeans(range);
	let i = 0, x = range.xOffset;
	while (i < means.length) {
		// Even if outliers[i] is not a number, OR-masking forces it to 0
		let color = dataToColor(means[i] || 0);
		context.fillStyle = color;
		let j = i, nextColor;
		// advance while colour value doesn't change
		do {
			j++;
			nextColor = dataToColor(means[j] || 0);
		} while (color === nextColor && i + j < means.length);
		const w = (j - i) * barWidth;
		// force to pixel grid
		context.fillRect(x | 0, 0, ((x + w) | 0) - (x | 0), context.height);
		i = j; x += w;
	}
}

function flamemapPainter(context, range, dataToColor) {
	const { data, xOffset } = range;
	// Support high-density displays. However, we cut it by half
	// to increase details a little bit.
	// Downside: using browser-zoom scales up plots as well
	let ratio = range.ratio * range.scale;
	ratio = ratio > 1 ? ratio : 1;
	// Important: we MUST round this number, or the plotter
	// crashes the browser for results that are not
	// powers of two.
	const width = (range.width / ratio) | 0;

	if (data.length < width) {
		// more pixels than data
		const barWidth = width * range.scale / data.length;
		const barHeight = context.height;

		let i = 0, x = xOffset;
		while (i < data.length) {
			// Even if outliers[i] is not a number, OR-masking forces it to 0
			let color = dataToColor(data[i] || 0);
			context.fillStyle = color;
			let j = i, nextColor;
			// advance while colour value doesn't change
			do {
				j++;
				nextColor = dataToColor(data[j] || 0);
			} while (color === nextColor && i + j < data.length);
			// force to pixel grid
			const w = (j - i) * barWidth;
			const roundedWidth = ((x + w) | 0) - (x | 0);
			context.fillRect(x | 0, 0, roundedWidth, barHeight);
			i = j; x += w;
		}
	}
	else {
		// more data than pixels

		const barWidth = ratio;

		// Because of rounding, our bins can come in two sizes.
		// For small datasets this is a problem, because plotting
		// a gradient for two or three cells gives a very result.
		// to fix this, we always make the gradient as large as
		// the largest bin size.
		// If necessary, we'll pad it with a zero value.
		const binSize = Math.ceil(data.length / width) | 0;

		const flameHeight = context.height * 0.9375;
		// the thin heatmap strip
		const heatmapHeight = context.height - (flameHeight | 0) - range.ratio;

		context.fillStyle = '#e8e8e8';
		context.fillRect(0, 0, context.width, context.height);

		let flameSlices = {}, i = width;
		while (i--) {
			const x = (xOffset + i * barWidth) | 0;
			const x1 = (xOffset + (i + 1) * barWidth) | 0;
			const roundedWidth = x1 - x;

			let i0 = (i * data.length / width) | 0;
			let i1 = ((i + 1) * data.length / width) | 0;
			const l = i1 - i0;
			let flameSlice = flameSlices[l];
			if (flameSlice) {
				while (i1 - 16 > i0) {
					flameSlice[--i1 - i0] = data[i1];
					flameSlice[--i1 - i0] = data[i1];
					flameSlice[--i1 - i0] = data[i1];
					flameSlice[--i1 - i0] = data[i1];
					flameSlice[--i1 - i0] = data[i1];
					flameSlice[--i1 - i0] = data[i1];
					flameSlice[--i1 - i0] = data[i1];
					flameSlice[--i1 - i0] = data[i1];
					flameSlice[--i1 - i0] = data[i1];
					flameSlice[--i1 - i0] = data[i1];
					flameSlice[--i1 - i0] = data[i1];
					flameSlice[--i1 - i0] = data[i1];
					flameSlice[--i1 - i0] = data[i1];
					flameSlice[--i1 - i0] = data[i1];
					flameSlice[--i1 - i0] = data[i1];
					flameSlice[--i1 - i0] = data[i1];
				}
				while (i1-- > i0) {
					flameSlice[i1 - i0] = data[i1];
				}
			}
			else {
				// Cach the flameSlice to avoid allocating thousands of
				// tiny typed arrays and immediately throwing them away.
				// Realistically we only have to cache a few options
				// due to possible rounding error.
				flameSlice = data.slice(i0, i1);
				flameSlices[l] = flameSlice;
			}
			flameSlice.sort();
			const yOffset = binSize - flameSlice.length;
			let j = 0, k = 0;
			while (j < l) {
				const val = flameSlice[j];
				do {
					k++;
				} while (k < l && val === flameSlice[k]);
				const y = (flameHeight * (j + yOffset) / binSize) | 0;
				const y1 = (flameHeight * (k + yOffset) / binSize) | 0;
				const roundedHeight = y1 - y;
				context.fillStyle = dataToColor(val || 0);
				context.fillRect(x, y, roundedWidth, roundedHeight);
				j = k;
			}
			// draw strip to highlight max value, so dataset with
			// sparse gene expression are more visible
			context.fillRect(x, flameHeight, roundedWidth, heatmapHeight);
		}
		// slightly separate the heatmap from the flame-map with a faded strip
		context.fillStyle = 'darkgray';
		context.globalAlpha = 1;
		context.fillRect(0, flameHeight, context.width, range.ratio|0);
		context.globalAlpha = 1.0;
	}
}

function labelPainter(context, label) {
	const ratio = (context.pixelRatio || 1);
	const labelSize = 12 * ratio;
	textStyle(context);
	textSize(context, labelSize);
	drawText(context, label, 32 * ratio, labelSize * 1.2);
}