import React, { Component } from 'react';

import Checkbox from 'rc-checkbox';
import Slider from 'rc-slider';
import InputNumber from 'rc-input-number'

import { RemountOnResize } from './remount';

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
      this.handleEmphNZToggle = this.handleEmphNZToggle.bind(this);
      this.mountedView = this.mountedView.bind(this);

      this.makeControls = this.makeControls.bind(this);
      const ratio = window.devicePixelRatio || 1;

      this.state = {
         containerWidth: 0,
         ratio,
         width: 200,
         scaledWidth: 200,
         pixelScale: 1,
         roundedPixelScale: 1,
         logScale: true,
         emphasizeNonZero: true,
         arrangeByGene: false,
         showBar: true,
         showHeatmap: true,
         showFlame: true,
      };
   }

   handlewidth(value) {
      const { pixelScale, containerWidth, ratio } = this.state;
      const width = Math.max(70, Math.min(800, value));
      const scaledWidth = (width * containerWidth / (800*ratio)) | 0;
      const roundedPixelScale = scaledWidth / Math.ceil(scaledWidth / pixelScale);

      this.setState({
         width,
         scaledWidth,
         roundedPixelScale,
      });
   }

   handleDemoPixels(value) {
      const { scaledWidth } = this.state;
      const pixelScale = Math.max(1, Math.min(40, value | 0));
      const roundedPixelScale = scaledWidth / Math.ceil(scaledWidth / pixelScale);

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

   handleEmphNZToggle(e, checked) {
      this.setState({ emphasizeNonZero: e.target.checked ? true : false });
   }

   makeControls() {
      const {
         width,
         pixelScale,
         showBar,
         showHeatmap,
         showFlame,
         logScale,
         emphasizeNonZero,
         arrangeByGene,
      } = this.state;

      return (
         <div>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
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

            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
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
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
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
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
               <label style={{ flex: 100, margin: '5px 25px 5px 25px' }}>
                  <Checkbox
                     defaultChecked={logScale}
                     checked={logScale}
                     onChange={this.handleLog} />
                  <span>log<sub>2</sub> scale</span>
               </label>
               <label style={{ flex: 100, margin: '5px 25px 5px 25px' }}>
                  <Checkbox
                     defaultChecked={emphasizeNonZero}
                     checked={emphasizeNonZero}
                     onChange={this.handleEmphNZToggle} />
                  <span>emphasize non-zero</span>
               </label>
               <label style={{ flex: 100, margin: '5px 25px 5px 25px' }}>
                  <Checkbox
                     defaultChecked={arrangeByGene}
                     checked={arrangeByGene}
                     onChange={this.handleByGene} />
                  <span>arrange per gene</span>
               </label>
            </div>
         </div>
      );
   }

   mountedView(view) {
      // Similar to the trick used in the Canvas component,
      // this lets us scale below 800 pixels and still mainting
      // _some_ form of consistency.
      if (view) {
         const ratio  =  window.devicePixelRatio || 1;
         const containerWidth = (view.clientWidth * ratio) | 0;
         this.setState({ view, ratio, containerWidth });
      }
   }


   render() {
      const {
         view,
         scaledWidth,
         pixelScale,
         roundedPixelScale,
         logScale,
         emphasizeNonZero,
         arrangeByGene,
         showBar,
         showHeatmap,
         showFlame,
      } = this.state
      const settings = { logScale, emphasizeNonZero };
      const watchedVal = `${scaledWidth}${pixelScale}${logScale}${arrangeByGene}`;

      const plotStyle = { margin: 5, width: scaledWidth, height: 70, flex: 1 };
      let plots;
      if (view) {
         plots = arrangeByGene ? (
            <div style={{ margin: '20px 0px 20px 0px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
               {
                  data.map((attr) => (
                     <div style={{ margin: '0px 0px 0px 0px', display: 'flex', flexDirection: 'column', flexWrap: 'none' }}>
                        {showBar ? <Plot
                           attr={attr}
                           key={'demo_' + attr.name + '_bar'}
                           modes={['Bar']}
                           settings={settings}
                           pixelScale={roundedPixelScale}
                           watchedVal={watchedVal}
                           style={plotStyle} /> : null}
                        {showHeatmap ? <Plot
                           attr={attr}
                           key={'demo_' + attr.name + '_heatmap'}
                           modes={['Heatmap']}
                           settings={settings}
                           pixelScale={roundedPixelScale}
                           watchedVal={watchedVal}
                           style={plotStyle} /> : null}
                        {showFlame ? <Plot
                           attr={attr}
                           key={'demo_' + attr.name + '_flame'}
                           modes={['Flame']}
                           settings={settings}
                           pixelScale={roundedPixelScale}
                           watchedVal={watchedVal}
                           style={plotStyle} /> : null}
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
                           style={plotStyle} />
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
                           style={plotStyle} />
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
                           style={plotStyle} />
                     ))}
                  </div> : null}
               </div>
            );


      }

      return (
         <RemountOnResize>
            <div ref={this.mountedView}>
               {this.makeControls()}
               {plots}
            </div>
         </RemountOnResize>
      )
   }
}