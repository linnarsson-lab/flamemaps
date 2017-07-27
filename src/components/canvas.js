import React, { PureComponent } from 'react';

import {
	RemountOnResize
} from './remount';

class CanvasComponent extends PureComponent {

	draw() {
		if (this.canvas && this.props.paint) {
			const canvas = this.canvas;
			let context = canvas.getContext('2d');
			// store width, height and ratio in context for paint functions
			context.width = this.state.width;
			context.height = this.state.height;
			context.pixelRatio = this.state.ratio;
			context.pixelScale = this.state.pixelScale;
			// should we clear the canvas every redraw?
			if (this.props.clear) {
				if (this.props.bgColor) {
					context.fillStyle = this.props.bgColor;
					context.fillRect(0, 0, canvas.width, canvas.height);
				} else {
					context.clearRect(0, 0, canvas.width, canvas.height);
				}
			}
			this.props.paint(context);
		}
	}

	constructor(props) {
		super(props);
		this.draw = this.draw.bind(this);
	}

	// Make sure we get a sharp canvas on Retina displays
	// as well as adjust the canvas on zoomed browsers
	// Does NOT scale; painter functions decide how to handle
	// window.devicePixelRatio on a case-by-case basis
	componentDidMount() {
		const view = this.view;
		const pixelScale = this.props.pixelScale || 1;
		const ratio = window.devicePixelRatio || 1;
		const width = (view.clientWidth * ratio) | 0;
		const height = (view.clientHeight * ratio) | 0;
		this.setState({ width, height, ratio, pixelScale });
	}

	componentDidUpdate() {
		if (this.props.redraw) {
			this.draw();
		}
	}

	render() {
		// The way canvas interacts with CSS layouting is a bit buggy
		// and inconsistent across browsers. To make it dependent on
		// the layout of the parent container, we only render it after
		// mounting, that is: after CSS layouting is done.
		const canvas = this.view ? (
			<canvas
				ref={(cv) => { this.canvas = cv; }}
				width={this.state.width}
				height={this.state.height}
				style={{
					width: '100%',
					height: '100%'
				}}
			/>
		) : null;

		return (
			<div
				ref={(view) => { this.view = view; }}
				style={this.props.style}
			>
				{canvas}
			</div>
		);
	}
}

// A simple helper component, wrapping retina logic for canvas and
// auto-resizing the canvas to fill its parent container.
// To determine size/layout, we just use CSS on the div containing
// the Canvas component (we're using this with flexbox, for example).
// Expects a "paint" function that takes a "context" to draw on
// Whenever this component updates it will call this paint function
// to draw on the canvas. For convenience, pixel dimensions are stored
// in context.width, context.height and contex.pixelRatio.
export class Canvas extends PureComponent {
	render() {
		// If not given a width or height prop, make these fill their parent div
		// This will implicitly set the size of the <Canvas> component, which
		// will then call the passed paint function with the right dimensions.
		let { width, height, style } = this.props;
		style = style || {};
		if (width) {
			style['minWidth'] = (width | 0) + 'px';
			style['maxWidth'] = (width | 0) + 'px';
		}
		if (height) {
			style['minHeight'] = (height | 0) + 'px';
			style['maxHeight'] = (height | 0) + 'px';
		}
		return (
			<RemountOnResize
			/* Since canvas interferes with CSS layouting,
			we unmount and remount it on resize events */
			watchedVal={this.props.watchedVal}
			>
				<CanvasComponent
					paint={this.props.paint}
					clear={this.props.clear}
					bgColor={this.props.bgColor}
					pixelScale={this.props.pixelScale}
					redraw={this.props.redraw}
					className={this.props.className}
					style={style}
				/>
			</RemountOnResize>
		);
	}
}
