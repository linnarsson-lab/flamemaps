import React, { Component } from 'react';

import Checkbox from 'rc-checkbox';
import Slider from 'rc-slider';
import InputNumber from 'rc-input-number'

import { Plot } from './plot';

import { data } from '../lib/data';

const SliderWithTooltip = Slider.createSliderWithTooltip(Slider);

export class Demos extends Component {
   constructor(props) {
      super(props);

      this.handlewidth = this.handlewidth.bind(this);
      this.handleDemoPixels = this.handleDemoPixels.bind(this);
      this.handleLog = this.handleLog.bind(this);
      this.handleByGene = this.handleByGene.bind(this);
      this.handleBarToggle = this.handleBarToggle.bind(this);
      this.handleHeatmapToggle = this.handleHeatmapToggle.bind(this);
      this.handleFlameToggle = this.handleFlameToggle.bind(this);

      this.makeControls = this.makeControls.bind(this);

      this.state = {
         width: 800,
         pixelScale: 1,
         roundedPixelScale: 1,
         logScale: true,
         arrangeByGene: false,
         showBar: true,
         showHeatmap: true,
         showFlame: true,
      };
   }

   handlewidth(value) {
      const { pixelScale } = this.state;
      const width = Math.max(70, Math.min(800, value | 0));
      const roundedPixelScale = width / Math.ceil(width / pixelScale);

      this.setState({
         width,
         roundedPixelScale,
      });
   }

   handleDemoPixels(value) {
      const { width } = this.state;
      const pixelScale = Math.max(1, Math.min(40, value | 0));
      const roundedPixelScale = width / Math.ceil(width / pixelScale);

      this.setState({
         pixelScale,
         roundedPixelScale,
      });
   }

   handleLog(e, checked) {
      this.setState({ logScale: e.target.checked ? true : false });

   }
   handleByGene(e, checked) {
      this.setState({ arrangeByGene: e.target.checked ? true : false });
   }

   handleBarToggle(e, checked) {
      this.setState({ showBar: e.target.checked ? true : false });
   }
   handleHeatmapToggle(e, checked) {
      this.setState({ showHeatmap: e.target.checked ? true : false });
   }
   handleFlameToggle(e, checked) {
      this.setState({ showFlame: e.target.checked ? true : false });
   }

   makeControls() {
      const {
         width,
         pixelScale,
         showBar,
         showHeatmap,
         showFlame,
         logScale,
         arrangeByGene,
      } = this.state;
      return (
         <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
               <SliderWithTooltip
                  onChange={this.handlewidth}
                  style={{ flex: 600, margin: '10px 25px 10px 25px' }}
                  min={70}
                  max={800}
                  defaultValue={width}
                  value={width}
               />
               <label style={{
                  flex: 200,
                  margin: '10px 25px 10px 25px'
               }}>
                  <InputNumber
                     onChange={this.handlewidth}
                     min={70}
                     max={800}
                     defaultValue={width}
                     value={width}
                  />
                  <span>&nbsp;plot&nbsp;width</span>
               </label>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
               <SliderWithTooltip
                  onChange={this.handleDemoPixels}
                  style={{ flex: 600, margin: '10px 25px 10px 25px' }}
                  min={1}
                  max={40}
                  defaultValue={pixelScale}
                  value={pixelScale}
               />
               <label style={{
                  flex: 200,
                  margin: '10px 25px 10px 25px'
               }}>
                  <InputNumber
                     onChange={this.handleDemoPixels}
                     min={1}
                     max={40}
                     defaultValue={pixelScale}
                     value={pixelScale}
                  />
                  <span>&nbsp;pixels/column</span>
               </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
               <label style={{ flex: 100, margin: '5px 25px 5px 25px' }}>
                  <Checkbox
                     defaultChecked={showBar}
                     checked={showBar}
                     onChange={this.handleBarToggle} />
                  <span>show bar graphs</span>
               </label>
               <label style={{ flex: 100, margin: '5px 25px 5px 25px' }}>
                  <Checkbox
                     defaultChecked={showHeatmap}
                     checked={showHeatmap}
                     onChange={this.handleHeatmapToggle} />
                  <span>show heat maps</span>
               </label>
               <label style={{ flex: 100, margin: '5px 25px 5px 25px' }}>
                  <Checkbox
                     defaultChecked={showFlame}
                     checked={showFlame}
                     onChange={this.handleFlameToggle} />
                  <span>show flame maps</span>
               </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
               <label style={{ flex: 100, margin: '5px 25px 5px 25px' }}>
                  <Checkbox
                     defaultChecked={logScale}
                     checked={logScale}
                     onChange={this.handleLog} />
                  <span>log<sub>2</sub> scale</span>
               </label>
               <label style={{ flex: 100, margin: '5px 25px 5px 25px' }}>
                  <Checkbox
                     defaultChecked={arrangeByGene}
                     checked={arrangeByGene}
                     onChange={this.handleByGene} />
                  <span>arrange per gene</span>
               </label>
               <div style={{ flex: 100, margin: '5px 25px 5px 25px' }} />
            </div>
         </div>
      );
   }

   render() {
      const {
         width,
         pixelScale,
         roundedPixelScale,
         logScale,
         arrangeByGene,
         showBar,
         showHeatmap,
         showFlame,
      } = this.state
      const settings = { logScale };
      const watchedVal = `${width}${pixelScale}${logScale}${arrangeByGene}`;

      const plots = arrangeByGene ? (
         <div style={{ margin: '20px 0px 20px 0px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {
               data.map((attr) => (
                     <div style={{ margin: '0px 0px 0px 0px', display: 'flex', flexDirection: 'column', flexWrap: 'none' }}>
                        { showBar ? <Plot
                           attr={attr}
                           key={'demo_' + attr.name + '_bar'}
                           modes={['Bar']}
                           settings={settings}
                           pixelScale={roundedPixelScale}
                           watchedVal={watchedVal}
                           style={{ margin: 5, width: width, height: 70, flex: 1 }} /> : null}
                        { showHeatmap ? <Plot
                           attr={attr}
                           key={'demo_' + attr.name + '_heatmap'}
                           modes={['Heatmap']}
                           settings={settings}
                           pixelScale={roundedPixelScale}
                           watchedVal={watchedVal}
                           style={{ margin: 5, width: width, height: 70, flex: 1 }} /> : null }
                        { showFlame ? <Plot
                           attr={attr}
                           key={'demo_' + attr.name + '_flame'}
                           modes={['Flame']}
                           settings={settings}
                           pixelScale={roundedPixelScale}
                           watchedVal={watchedVal}
                           style={{ margin: 5, width: width, height: 70, flex: 1 }} /> : null}
                     </div>
            ))}
         </div>
      ) : (
            <div>
               {showBar ? <div style={{ margin: '20px 0px 20px 0px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  {data.map((attr) => (
                     <Plot
                        attr={attr}
                        key={'demo_' + attr.name + '_bar'}
                        modes={['Bar']}
                        settings={settings}
                        pixelScale={roundedPixelScale}
                        watchedVal={watchedVal}
                        style={{ margin: 5, width: width, height: 70, flex: 1 }} />
                  ))}
               </div> : null}
               {showHeatmap ? <div style={{ margin: '20px 0px 20px 0px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  {data.map((attr) => (
                     <Plot
                        attr={attr}
                        key={'demo_' + attr.name + '_heatmap'}
                        modes={['Heatmap']}
                        settings={settings}
                        pixelScale={roundedPixelScale}
                        watchedVal={watchedVal}
                        style={{ margin: 5, width: width, height: 70, flex: 1 }} />
                  ))}
               </div> : null}
               {showFlame ? <div style={{ margin: '20px 0px 20px 0px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  {data.map((attr) => (
                     <Plot
                        attr={attr}
                        key={'demo_' + attr.name + '_flame'}
                        modes={['Flame']}
                        settings={settings}
                        pixelScale={roundedPixelScale}
                        watchedVal={watchedVal}
                        style={{ margin: 5, width: width, height: 70, flex: 1 }} />
                  ))}
               </div> : null}
            </div>
         );
      return (
         <div>
            {this.makeControls()}
            {plots}
         </div>
      )
   }
}