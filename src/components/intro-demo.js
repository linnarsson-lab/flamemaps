import React, { Component } from 'react';

import Checkbox from 'rc-checkbox';
import Slider from 'rc-slider';
import InputNumber from 'rc-input-number'

import { Plot } from './plot';

import { data } from '../lib/data';

const SliderWithTooltip = Slider.createSliderWithTooltip(Slider);

export class IntroDemo extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.handleLog = this.handleLog.bind(this);

    let datamap = {};
    const dataselect = (
      <label>
        Select data set: <select onChange={this.handleSelect}>
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
    const logScale = props.logScale === undefined || props.logScale;

    const selected = data[12];
    const attr = Object.assign({}, selected,
      {
        name: `${selected.name}, first ${amount} cells of 3005`,
        data: selected.data.slice(0, amount),
      }
    );

    this.state = {
      datamap,
      dataselect,
      selected,
      attr,
      amount,
      logScale,
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.amount) {
      this.handleAmount(nextProps.amount);
    }
    if (nextProps.logScale) {
      this.handleLog(nextProps.logScale);
    }
  }

  render() {
    const { dataselect, attr, amount, logScale } = this.state;
    return (
      <div>
        {dataselect}
        <Plot
          attr={attr}
          key={'intro_demo_bar'}
          modes={['Bars']}
          pixelScale={4}
          settings={{ logScale }}
          style={{ height: '100px', margin: '5px 0px 5px 0px' }} />
        <Plot
          attr={attr}
          key={'intro_demo_heatmap'}
          modes={['Heatmap']}
          pixelScale={4}
          settings={{ logScale }}
          style={{ height: '100px', margin: '5px 0px 5px 0px' }} />
        <Plot
          attr={attr}
          key={'intro_demo_flame'}
          modes={['Flame']}
          pixelScale={4}
          settings={{ logScale }}
          style={{ height: '100px', margin: '5px 0px 5px 0px' }} />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <SliderWithTooltip
            onChange={this.handleAmount}
            style={{ flex: 450, margin: '10px 25px 10px 25px' }}
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
          <label style={{ flex: 150, margin: '10px 25px 10px 25px' }}>
            <Checkbox
              defaultChecked={1}
              checked={logScale ? 1 : 0}
              onChange={this.handleLog} />
            <span>&nbsp;log<sub>2</sub> scale</span>
          </label>
        </div>
      </div>
    );
  }
}