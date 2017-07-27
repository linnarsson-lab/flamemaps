import React, { Component } from 'react';

import Slider from 'rc-slider';
import InputNumber from 'rc-input-number'

import { Plot } from './plot';

import { makeAttr } from '../lib/util';

const SliderWithTooltip = Slider.createSliderWithTooltip(Slider);

export class AlternatingPlots extends Component {

   constructor(props) {
      super(props);

      this.handleLength = this.handleLength.bind(this);
      this.handleWidth = this.handleWidth.bind(this);
      this.handlePixelScale = this.handlePixelScale.bind(this);
      this.handleTopOffset = this.handleTopOffset.bind(this);
      this.handleBottomOffset = this.handleBottomOffset.bind(this);

      const length = 8000,
         pixelScale = 1,
         roundedPixelScale = 1,
         width = 10,
         topOffset = 5,
         bottomOffset = 0;

      this.state = {
         length,
         width,
         pixelScale,
         roundedPixelScale,
         topOffset,
         bottomOffset
      };
   }

   handleLength(value) {
      const length = Math.max(8, Math.min(8000, value));
      const { pixelScale } = this.state;
      const roundedPixelScale = length / Math.ceil(length / pixelScale);
      this.setState({ length, pixelScale, roundedPixelScale })
   }

   handleWidth(value) {
      const width = Math.max(1, Math.min(40, value));
      this.setState({ width })
   }

   handlePixelScale(value) {
      const { length } = this.state;
      const pixelScale = Math.max(1, Math.min(40, value | 0));
      const roundedPixelScale = length / Math.ceil(length / pixelScale);
      this.setState({ pixelScale, roundedPixelScale })
   }

   handleTopOffset(value) {
      const topOffset = Math.max(0, Math.min(39, value));
      this.setState({ topOffset })
   }

   handleBottomOffset(value) {
      const bottomOffset = Math.max(0, Math.min(39, value));
      this.setState({ bottomOffset })
   }

   render() {
      const {
         length,
         width,
         topOffset,
         bottomOffset,
         pixelScale,
         roundedPixelScale,
      } = this.state;
      const watchedVal = `${length}${width}${topOffset}${bottomOffset}${pixelScale}${roundedPixelScale}`

      let top = new Uint8Array(length);
      for (let i = 0; i < top.length; i++) {
         top[i] = ((i + topOffset) / width) & 1;
      }
      let top_attr = makeAttr(`${length} cells`, 'uint8', top);
      let bottom = new Uint8Array(length);
      for (let i = 0; i < bottom.length; i++) {
         bottom[i] = ((i + bottomOffset) / width) & 1;
      }
      let bottom_attr = makeAttr(`${length} cells`, 'uint8', bottom);

      return (
         <div key={'alternatingDataFigure'}>
            <p><i>Heat map</i></p>
            <Plot
               attr={top_attr}
               key={'top_heatmap'}
               modes={['Heatmap']}
               settings={{ logScale: true }}
               pixelScale={roundedPixelScale}
               watchedVal={watchedVal}
               style={{ height: 50, margin: '5px 0px 5px 0px' }} />
            <Plot
               attr={bottom_attr}
               key={'bottom_heatmap'}
               modes={['Heatmap']}
               settings={{ logScale: true }}
               pixelScale={roundedPixelScale}
               watchedVal={watchedVal}
               style={{ height: 50, margin: '5px 0px 5px 0px' }} />
            <p><i>Bar graph</i></p>
            <Plot
               attr={top_attr}
               key={'top_bar'}
               modes={['Bar']}
               settings={{ logScale: true }}
               pixelScale={roundedPixelScale}
               watchedVal={watchedVal}
               style={{ height: 50, margin: '5px 0px 5px 0px' }} />
            <Plot
               attr={bottom_attr}
               key={'bottom_bar'}
               modes={['Bar']}
               settings={{ logScale: true }}
               pixelScale={roundedPixelScale}
               watchedVal={watchedVal}
               style={{ height: 50, margin: '5px 0px 5px 0px' }} />
            <p><i>Flame map</i></p>
            <Plot
               attr={top_attr}
               key={'top'}
               modes={['Flame']}
               settings={{ logScale: true }}
               pixelScale={roundedPixelScale}
               watchedVal={watchedVal}
               style={{ height: 50, margin: '5px 0px 5px 0px' }} />
            <Plot
               attr={bottom_attr}
               key={'bottom'}
               modes={['Flame']}
               settings={{ logScale: true }}
               pixelScale={roundedPixelScale}
               watchedVal={watchedVal}
               style={{ height: 50, margin: '5px 0px 5px 0px' }} />
            <div
               key='controls_length'
               style={{ display: 'flex', flexDirection: 'row' }}>
               <SliderWithTooltip
                  onChange={this.handleLength}
                  style={{ flex: 500, margin: '10px 25px 10px 25px' }}
                  min={8}
                  max={8000}
                  defaultValue={length}
                  value={length}
               />
               <label style={{ flex: 100, margin: '10px 25px 10px 25px' }}>
                  <InputNumber
                     onChange={this.handleLength}
                     min={8}
                     max={8000}
                     defaultValue={length}
                     value={length}
                  />
                  <span>data length</span>
               </label>
            </div>
            <div
               key='controls_width'
               style={{ display: 'flex', flexDirection: 'row' }}>
               <SliderWithTooltip
                  onChange={this.handleWidth}
                  style={{ flex: 500, margin: '10px 25px 10px 25px' }}
                  min={1}
                  max={40}
                  defaultValue={width}
                  value={width}
               />
               <label style={{ flex: 100, margin: '10px 25px 10px 25px' }}>
                  <InputNumber
                     onChange={this.handleWidth}
                     min={1}
                     max={40}
                     defaultValue={width}
                     value={width}
                  />
                  <span>zebra width</span>
               </label>
            </div>
            <div
               key='controls_pixelScale'
               style={{ display: 'flex', flexDirection: 'row' }}>
               <SliderWithTooltip
                  onChange={this.handlePixelScale}
                  style={{ flex: 500, margin: '10px 25px 10px 25px' }}
                  min={1}
                  max={40}
                  defaultValue={pixelScale}
                  value={pixelScale}
               />
               <label style={{ flex: 100, margin: '10px 25px 10px 25px' }}>
                  <InputNumber
                     onChange={this.handlePixelScale}
                     min={1}
                     max={40}
                     defaultValue={pixelScale}
                     value={pixelScale}
                  />
                  <span>column size</span>
               </label>
            </div>
            <div
               key='controls_top'
               style={{ display: 'flex', flexDirection: 'row' }}>
               <SliderWithTooltip
                  onChange={this.handleTopOffset}
                  style={{ flex: 500, margin: '10px 25px 10px 25px' }}
                  min={0}
                  max={39}
                  defaultValue={topOffset}
                  value={topOffset}
               />
               <label style={{ flex: 100, margin: '10px 25px 10px 25px' }}>
                  <InputNumber
                     onChange={this.handleTopOffset}
                     min={0}
                     max={39}
                     defaultValue={topOffset}
                     value={topOffset}
                  />
                  <span>top offset</span>
               </label>
            </div>
            <div
               key='controls_bottom'
               style={{ display: 'flex', flexDirection: 'row' }}>
               <SliderWithTooltip
                  onChange={this.handleBottomOffset}
                  style={{ flex: 500, margin: '10px 25px 10px 25px' }}
                  min={1}
                  max={39}
                  defaultValue={bottomOffset}
                  value={bottomOffset}
               />
               <label style={{ flex: 100, margin: '10px 25px 10px 25px' }}>
                  <InputNumber
                     onChange={this.handleBottomOffset}
                     min={1}
                     max={39}
                     defaultValue={bottomOffset}
                     value={bottomOffset}
                  />
                  <span>bottom offset</span>
               </label>
            </div>
         </div>
      );

   }

}