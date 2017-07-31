import React, { Component } from 'react';

import Checkbox from 'rc-checkbox';
import Slider from 'rc-slider';
import InputNumber from 'rc-input-number'

import { RemountOnResize } from './remount';

import { Plot } from './plot';

import { data } from '../lib/data';

const SliderWithTooltip = Slider.createSliderWithTooltip(Slider);

export class IntroDemo extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.handleLog = this.handleLog.bind(this);
    this.handleEmphNZ = this.handleEmphNZ.bind(this);
    this.mountedView = this.mountedView.bind(this);

    let datamap = {};
    const dataselect = (
      <label>
        Select gene data: <select onChange={this.handleSelect}>
          {
            data.map((attr) => {
              console.log(attr)
              datamap[attr.name] = attr;
              return <option value={attr.name} selected={attr.name === 'Hexb'}>{attr.name}</option>;
            })
          }
        </select>
      </label>
    );

    const amount = props.amount || 100;
    let { logScale, emphasizeNonZero } = props.settings || {};
    logScale = logScale === undefined || logScale;
    emphasizeNonZero = emphasizeNonZero === undefined || emphasizeNonZero;

    const selected = data[12];
    const attr = Object.assign({}, selected,
      {
        name: `${selected.name}, first ${amount} cells of 3005`,
        data: selected.data.slice(0, amount),
      }
    );

    this.state = {
      pixelScale: 4,
      datamap,
      dataselect,
      selected,
      attr,
      amount,
      logScale,
      emphasizeNonZero,
    };
  }

  handleSelect(event) {
    const { amount, datamap } = this.state;
    const selected = datamap[event.target.value || "Hexb"];
    const attr = Object.assign({}, selected,
      {
        name: `${selected.name}, first ${amount} cells of 3005`,
        data: selected.data.slice(0, amount),
      });
    this.setState({ selected, attr });
  }

  handleAmount(value) {
    const amount = Math.max(Math.min(3005, value | 0), 100);

    let { attr, selected } = this.state;
    attr = Object.assign({}, selected,
      {
        name: `${selected.name}, first ${amount} cells of 3005`,
        data: selected.data.slice(0, amount),
      })

    this.setState({ amount, attr })
  }

  handleLog(e, checked) {
    this.setState({ logScale: e.target.checked ? true : false })
  }

  handleEmphNZ(e, checked) {
    this.setState({ emphasizeNonZero: e.target.checked ? true : false })
  }

  mountedView(view) {
    // Similar to the trick used in the Canvas component,
    // this lets us scale below 800 pixels and still mainting
    // _some_ form of consistency.
    if (view) {
      const pixelScale = 4 * view.clientWidth / 800;
      this.setState({ view, pixelScale });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.amount) {
      this.handleAmount(nextProps.amount);
    }
    if (nextProps.logScale) {
      this.handleLog(nextProps.logScale);
    }
  }

  render() {
    const {
      dataselect,
      attr,
      amount,
      logScale,
      emphasizeNonZero,
      pixelScale,
    } = this.state;

    const settings = {logScale, emphasizeNonZero};
    const plotStyle = { height: '100px', margin: '5px 0px 5px 0px' };
    return (
      <RemountOnResize>
        <div ref={this.mountedView}>
          {dataselect}
          <Plot
            attr={attr}
            key={'intro_demo_bar'}
            modes={['Bars']}
            pixelScale={pixelScale}
            settings={settings}
            style={plotStyle} />
          <Plot
            attr={attr}
            key={'intro_demo_heatmap'}
            modes={['Heatmap']}
            pixelScale={pixelScale}
            settings={settings}
            style={plotStyle} />
          <Plot
            attr={attr}
            key={'intro_demo_flame'}
            modes={['Flame']}
            pixelScale={pixelScale}
            settings={settings}
            style={plotStyle} />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SliderWithTooltip
              onChange={this.handleAmount}
              style={{ flex: 300, margin: '10px 25px 10px 25px' }}
              min={100}
              max={3005}
              defaultValue={amount}
              value={amount}
            />
            <InputNumber
              onChange={this.handleAmount}
              style={{ flex: 100, margin: '10px 25px 10px 25px' }}
              min={100}
              max={3005}
              defaultValue={amount}
              value={amount}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <label style={{ flex: 150, margin: '10px 25px 10px 25px' }}>
              <Checkbox
                defaultChecked={1}
                checked={logScale ? 1 : 0}
                onChange={this.handleLog} />
              <span> log<sub>2</sub> scale</span>
            </label>
            <label style={{ flex: 150, margin: '10px 25px 10px 25px' }}>
              <Checkbox
                defaultChecked={1}
                checked={emphasizeNonZero ? 1 : 0}
                onChange={this.handleEmphNZ} />
              <span> emphasize non-zero</span>
            </label>
          </div>
        </div>
      </RemountOnResize>
    );
  }
}