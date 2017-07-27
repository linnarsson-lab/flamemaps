import React, { Component } from 'react';

import Checkbox from 'rc-checkbox';
import Slider from 'rc-slider';
import InputNumber from 'rc-input-number'

import { Plot } from './plot';

import { makeAttr } from '../lib/util';

import { attr_hexb } from '../lib/data';

const SliderWithTooltip = Slider.createSliderWithTooltip(Slider);

export class IntroDemo extends Component {
  constructor(props) {
    super(props);

    this.handleAmount = this.handleAmount.bind(this);
    this.handleLog = this.handleLog.bind(this);

    const amount = props.amount || 100;
    const logScale = props.logScale === undefined || props.logScale;
    let attr = makeAttr(`Hexb, first ${amount} cells of 3005`, attr_hexb.arrayType, attr_hexb.data);
    attr.data = attr.data.slice(0, amount);

    this.state = {
      attr,
      amount,
      logScale,
    };
  }

  handleAmount(value) {
    const amount = Math.max(Math.min(3005, value | 0), 100);

    let { logScale, attr } = this.state;
    attr = Object.assign({}, attr,
      {
        name: `Hexb, first ${amount} cells of 3005`,
        data: attr_hexb.data.slice(0, amount),
      })

    this.setState({ amount, attr })
  }

  handleLog(e, checked) {
    this.setState({ logScale: e.target.checked ? true : false })
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.amount){
      this.handleAmount(nextProps.amount);
    }
    if (nextProps.logScale){
      this.handleLog(nextProps.logScale);
    }
  }

  render(){
    const { attr, amount, logScale } = this.state;
    return (
      <div>
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