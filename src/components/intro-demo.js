import React, { Component } from 'react';

import Checkbox from 'rc-checkbox';
import Slider from 'rc-slider';
import InputNumber from 'rc-input-number'

import { RemountOnResize } from './remount';

import { Plot } from './plot';

import { data, datamap } from '../lib/data';

const SliderWithTooltip = Slider.createSliderWithTooltip(Slider);



export class IntroDemo extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.handleLog = this.handleLog.bind(this);
    this.handleEmphNZ = this.handleEmphNZ.bind(this);
    this.handleIcicle = this.handleIcicle.bind(this);
    this.mountedView = this.mountedView.bind(this);

    let { pixelScale, amount, gene, settings } = props;
    pixelScale = pixelScale !== undefined ? pixelScale : 4;
    amount = amount !== undefined ? amount : 100;
    const selected = gene || 'Meg3';

    let { logScale, emphasizeNonZero, showIcicle } = settings || {};
    logScale = logScale === undefined || logScale;
    emphasizeNonZero = emphasizeNonZero === undefined || emphasizeNonZero;
    showIcicle = showIcicle === undefined ? false : showIcicle;

    const selected_attr = datamap[selected];
    const attr = Object.assign({}, selected_attr,
      {
        name: `${selected_attr.name}, first ${amount} cells of 3005`,
        data: selected_attr.data.slice(0, amount),
      }
    );


    this.state = {
      pixelScale,
      selected,
      selected_attr,
      attr,
      amount,
      logScale,
      emphasizeNonZero,
      showIcicle,
    };
  }


  handleSelect(event) {
    const { amount } = this.state;
    const selected = event.target.value || "Meg3";
    const selected_attr = datamap[selected];
    const attr = Object.assign({}, selected_attr,
      {
        name: `${selected_attr.name}, first ${amount} cells of 3005`,
        data: selected_attr.data.slice(0, amount),
      });
    this.setState({ selected, selected_attr, attr });
  }

  handleAmount(value) {
    const amount = Math.max(Math.min(3005, value | 0), 100);

    let { attr, selected_attr } = this.state;
    attr = Object.assign({}, selected_attr,
      {
        name: `${selected_attr.name}, first ${amount} cells of 3005`,
        data: selected_attr.data.slice(0, amount),
      })

    this.setState({ amount, attr })
  }

  handleLog(e, checked) {
    this.setState({ logScale: e.target.checked ? true : false })
  }

  handleEmphNZ(e, checked) {
    this.setState({ emphasizeNonZero: e.target.checked ? true : false })
  }

  handleIcicle(e) {
    e.preventDefault();
    const showIcicle = !this.state.showIcicle;
    this.setState({ showIcicle })
  }

  componentWillReceiveProps(nextProps) {
    let { amount, gene, settings } = nextProps;
    amount = amount !== undefined ? amount : 100;
    const selected = gene || this.state.selected;

    let { selected_attr } = this.state;
    let newState = {};

    const { logScale, emphasizeNonZero, showIcicle } = settings || {};
    if (logScale !== undefined) {
      newState.logScale = logScale;
    }
    if (emphasizeNonZero !== undefined) {
      newState.emphasizeNonZero = emphasizeNonZero;
    }
    if (showIcicle !== undefined) {
      newState.showIcicle = showIcicle;
    }

    if (selected !== this.state.selected) {
      newState.selected = selected;
      selected_attr = datamap[selected];
      newState.selected_attr = selected_attr;
    }
    if (amount !== this.state.amount) {
      newState.amount = amount;
    }

    if (Object.keys(newState).length) {
      newState.attr = Object.assign({}, selected_attr,
        {
          name: `${selected_attr.name}, first ${amount} cells of 3005`,
          data: selected_attr.data.slice(0, amount),
        }
      );
      this.setState(newState);
    }
  }

  mountedView(view) {
    // Similar to the trick used in the Canvas component,
    // this lets us scale below 800 pixels and still mainting
    // _some_ form of consistency.
    if (view) {
      const pixelScale = this.state.pixelScale * view.clientWidth / 800;
      this.setState({ view, pixelScale });
    }
  }

  render() {
    const {
      selected,
      attr,
      amount,
      logScale,
      emphasizeNonZero,
      showIcicle,
      pixelScale,
    } = this.state;

    const settings = { logScale, emphasizeNonZero };
    const plotStyle = { height: '100px', margin: '5px 0px 5px 0px' };
    return (
      <RemountOnResize>
        <div
          key='intro_demo'
          ref={this.mountedView}>
          <label>
            Select gene data: <select onChange={this.handleSelect} value={selected}>
              {
                data.map((attr) => {
                  return (
                    <option
                      key={attr.name}
                      value={attr.name}>
                      {attr.name}
                    </option>
                  );
                })
              }
            </select>
          </label>
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
          {showIcicle ? (
            <Plot
              attr={attr}
              key={'intro_demo_icicle'}
              modes={['Icicle']}
              pixelScale={pixelScale}
              settings={settings}
              style={plotStyle} />
          ) : (
              <Plot
                attr={attr}
                key={'intro_demo_flame'}
                modes={['Flame']}
                pixelScale={pixelScale}
                settings={settings}
                style={plotStyle} />
            )

          }
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
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
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
            <button
              style={{ flex: 150, margin: '10px 25px 10px 25px' }}
              onClick={this.handleIcicle}>
              {showIcicle ? <span>Flame/<b>Icicle</b></span> : <span><b>Flame</b>/Icicle</span>}
            </button>
          </div>
        </div>
      </RemountOnResize>
    );
  }
}