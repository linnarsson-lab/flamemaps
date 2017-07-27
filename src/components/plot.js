import React, { PureComponent } from 'react';

import { Canvas } from './canvas';
import { sparkline } from '../lib/plotters';

export class Plot extends PureComponent {
	modeCycler() {
		const { mode, modes } = this.state;
		const nextMode = (mode + 1) % modes.length;
		this.setState({ mode: nextMode });
	}

	constructor(props) {
		super(props);
		this.modeCycler = this.modeCycler.bind(this);

		const modes = props.modes || ['Bars', 'Flame', 'Heatmap'];
		let idx = modes.indexOf(props.mode);
		const mode = idx !== -1 ? idx : 0;
		this.state = { modes, mode };
	}


	render() {
		const { modes, mode } = this.state;
		const { attr, style, watchedVal, pixelScale, settings } = this.props;
		return (
			<div onClick={this.modeCycler}>
				<Canvas
					paint={sparkline(attr, modes[mode], settings)}
					style={style}
					bgColor={'white'}
					watchedVal={watchedVal}
					pixelScale={pixelScale}
					redraw clear
				/>
			</div>
		);
	}
}