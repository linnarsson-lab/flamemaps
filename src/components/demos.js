import React, { PureComponent } from 'react';

import Checkbox from 'rc-checkbox';
import Slider, { Range } from 'rc-slider';
import InputNumber from 'rc-input-number'

import { debounce } from 'lodash';

import { RemountOnResize } from './remount';

import { Plot } from './plot';

import { data } from '../lib/data';

const SliderWithTooltip = Slider.createSliderWithTooltip(Slider);
const RangeWithTooltip = Slider.createSliderWithTooltip(Range);

export class Demos extends PureComponent {
   constructor(props) {
      super(props);
      this.handleLowerBound = this.handleLowerBound.bind(this);
      this.handleRange = this.handleRange.bind(this);
      this.handleUpperBound = this.handleUpperBound.bind(this);
      this.handlewidth = this.handlewidth.bind(this);
      this.handleDemoPixels = this.handleDemoPixels.bind(this);
      this.updatePixels = debounce(this.updatePixels.bind(this), 100);
      this.handleLog = this.handleLog.bind(this);
      this.handleByGene = this.handleByGene.bind(this);
      this.handleBarToggle = this.handleBarToggle.bind(this);
      this.handleHeatmapToggle = this.handleHeatmapToggle.bind(this);
      this.handleFlameToggle = this.handleFlameToggle.bind(this);
      this.handleEmphNZToggle = this.handleEmphNZToggle.bind(this);
      this.handleIcicle = this.handleIcicle.bind(this);
      this.mountedView = this.mountedView.bind(this);

      const ratio = window.devicePixelRatio || 1;
      let { logScale, emphasizeNonZero, showIcicle } = props;
      logScale = logScale === undefined || logScale;
      emphasizeNonZero = emphasizeNonZero === undefined || emphasizeNonZero;

      showIcicle = showIcicle === undefined ? false : showIcicle;


      this.state = {
         containerWidth: 0,
         ratio,
         lowerBound: 0,
         upperBound: 3005,
         _lowerBound: 0,
         _upperBound: 3005,
         width: 200,
         scaledWidth: 200,
         pixelScale: 1,
         roundedPixelScale: 1,
         logScale,
         emphasizeNonZero,
         showIcicle,
         arrangeByGene: false,
         showBar: true,
         showHeatmap: true,
         showFlame: true,
      };
   }

   handleLowerBound(lowerBound) {
      let { upperBound, scaledWidth, roundedPixelScale } = this.state;
      lowerBound = lowerBound < 2905 ? lowerBound : 2905;
      upperBound = upperBound > lowerBound + 100 ? upperBound : lowerBound + 100;
      this.setState({ lowerBound, upperBound });
      this.updatePixels(lowerBound, upperBound, scaledWidth, roundedPixelScale);
   }

   handleRange(values) {
      const lowerBound = values[0];
      const upperBound = values[1];
      const { scaledWidth, roundedPixelScale } = this.state;
      this.setState({ lowerBound, upperBound });
      this.updatePixels(lowerBound, upperBound, scaledWidth, roundedPixelScale);
   }

   handleUpperBound(upperBound) {
      let { lowerBound, scaledWidth, roundedPixelScale } = this.state;
      upperBound = upperBound > 100 ? upperBound : 100;
      lowerBound = lowerBound < upperBound - 100 ? lowerBound : upperBound - 100;
      this.setState({ lowerBound, upperBound });
      this.updatePixels(lowerBound, upperBound, scaledWidth, roundedPixelScale);
   }

   handlewidth(value) {
      const { lowerBound, upperBound, pixelScale, containerWidth, ratio } = this.state;
      const width = Math.max(70, Math.min(800, value));
      const scaledWidth = (width * containerWidth / (800 * ratio)) | 0;
      const roundedPixelScale = scaledWidth / Math.ceil(scaledWidth / pixelScale);

      this.setState({
         width,
      });
      this.updatePixels(lowerBound, upperBound, scaledWidth, roundedPixelScale);
   }

   handleDemoPixels(value) {
      const { lowerBound, upperBound, scaledWidth } = this.state;
      const pixelScale = Math.max(1, Math.min(40, value | 0));
      const roundedPixelScale = scaledWidth / Math.ceil(scaledWidth / pixelScale);
      this.setState({
         pixelScale,
      });
      this.updatePixels(lowerBound, upperBound, scaledWidth, roundedPixelScale);
   }

   updatePixels(lowerBound, upperBound, scaledWidth, roundedPixelScale) {

      this.setState({
         _lowerBound: lowerBound,
         _upperBound: upperBound,
         scaledWidth,
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

   handleIcicle(e) {
      e.preventDefault();
      const showIcicle = !this.state.showIcicle;
      this.setState({ showIcicle })
   }

   mountedView(view) {
      // Similar to the trick used in the Canvas component,
      // this lets us scale below 800 pixels and still mainting
      // _some_ form of consistency.
      if (view) {
         const ratio = window.devicePixelRatio || 1;
         const containerWidth = (view.clientWidth * ratio) | 0;
         this.setState({ view, ratio, containerWidth });
      }
   }


   render() {
      const {
         view,
         lowerBound,
         upperBound,
         _lowerBound,
         _upperBound,
         width,
         scaledWidth,
         pixelScale,
         roundedPixelScale,
         logScale,
         emphasizeNonZero,
         arrangeByGene,
         showBar,
         showHeatmap,
         showFlame,
         showIcicle,
         } = this.state;
      const settings = { logScale, emphasizeNonZero };
      const watchedVal = `${scaledWidth}${roundedPixelScale}${_lowerBound}${_upperBound}`;

      const plotStyle = { margin: 5, width: scaledWidth, height: 70, flex: 1 };
      return (
         <RemountOnResize>
            <div ref={this.mountedView}>
               <div key='controls'>
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
                     <button
                        style={{ flex: 100, margin: '10px 25px 10px 25px' }}
                        onClick={this.handleIcicle}>
                        {showIcicle ? <span>Flame/<b>Icicle</b></span> : <span><b>Flame</b>/Icicle</span>}
                     </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
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
                           focusOnUpDown={false}
                        />
                        <span>&nbsp;plot&nbsp;width</span>
                     </label>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
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
                           focusOnUpDown={false}
                        />
                        <span>&nbsp;pixels/column</span>
                     </label>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                     <RangeWithTooltip
                        onChange={this.handleRange}
                        style={{ flex: 600, margin: '10px 25px 10px 25px' }}
                        min={0}
                        max={3005}
                        defaultValue={[lowerBound, upperBound]}
                        value={[lowerBound, upperBound]}
                        pushable={100}
                     />
                     <div style={{ flex: 200, display: 'flex', flexDirection: 'column', margin: '10px 25px 10px 25px' }}>
                        <label style={{ flex: 100 }}>
                           <InputNumber
                              onChange={this.handleUpperBound}
                              min={100}
                              max={3005}
                              defaultValue={upperBound}
                              value={upperBound}
                              focusOnUpDown={false}
                           />
                           <span>Upper bound</span>
                        </label>
                        <label style={{ flex: 100 }}>
                           <InputNumber
                              onChange={this.handleLowerBound}
                              min={0}
                              max={2905}
                              defaultValue={lowerBound}
                              value={lowerBound}
                              focusOnUpDown={false}
                           />
                           <span>Lower bound</span>
                        </label>
                     </div>
                  </div>
               </div>
               {view ? <Plots
                  lowerBound={_lowerBound}
                  upperBound={_upperBound}
                  arrangeByGene={arrangeByGene}
                  showBar={showBar}
                  showHeatmap={showHeatmap}
                  showFlame={showFlame}
                  showIcicle={showIcicle}
                  settings={settings}
                  style={plotStyle}
                  pixelScale={roundedPixelScale}
                  watchedVal={watchedVal} /> : null}
            </div>
         </RemountOnResize>
      )
   }
}

class Plots extends PureComponent {
   render() {
      const {
         lowerBound,
         upperBound,
         arrangeByGene,
         showBar,
         showHeatmap,
         showFlame,
         showIcicle,
         settings,
         pixelScale,
         watchedVal,
         style,
      } = this.props;
      const boundData = data.map(
         (attr) => (
            Object.assign(
               {},
               attr,
               { data: attr.data.slice(lowerBound, upperBound) }
            )
         )
      );
      return arrangeByGene ? (
         <div style={{ margin: '20px 0px 20px 0px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {
               boundData.map((attr) => (
                  <div style={{ margin: '0px 0px 0px 0px', display: 'flex', flexDirection: 'column', flexWrap: 'none' }}>
                     {showBar ? <Plot
                        attr={attr}
                        key={'demo_' + attr.name + '_bar'}
                        modes={['Bar']}
                        settings={settings}
                        pixelScale={pixelScale}
                        watchedVal={watchedVal}
                        style={style} /> : null}
                     {showHeatmap ? <Plot
                        attr={attr}
                        key={'demo_' + attr.name + '_heatmap'}
                        modes={['Heatmap']}
                        settings={settings}
                        pixelScale={pixelScale}
                        watchedVal={watchedVal}
                        style={style} /> : null}
                     {showFlame ? (
                        showIcicle ? (
                           <Plot
                              attr={attr}
                              key={'demo_' + attr.name + '_icicle'}
                              modes={['Icicle']}
                              settings={settings}
                              pixelScale={pixelScale}
                              watchedVal={watchedVal}
                              style={style} />

                        ) : (
                              <Plot
                                 attr={attr}
                                 key={'demo_' + attr.name + '_flame'}
                                 modes={['Flame']}
                                 settings={settings}
                                 pixelScale={pixelScale}
                                 watchedVal={watchedVal}
                                 style={style} />
                           )
                     ) : null}
                  </div>
               ))}
         </div>
      ) : (
            <div>
               {showBar ? <div style={{ margin: '20px 0px 20px 0px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  {boundData.map((attr) => (
                     <Plot
                        attr={attr}
                        key={'demo_' + attr.name + '_bar'}
                        modes={['Bar']}
                        settings={settings}
                        pixelScale={pixelScale}
                        watchedVal={watchedVal}
                        style={style} />
                  ))}
               </div> : null}
               {showHeatmap ? <div style={{ margin: '20px 0px 20px 0px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  {boundData.map((attr) => (
                     <Plot
                        attr={attr}
                        key={'demo_' + attr.name + '_heatmap'}
                        modes={['Heatmap']}
                        settings={settings}
                        pixelScale={pixelScale}
                        watchedVal={watchedVal}
                        style={style} />
                  ))}
               </div> : null}
               {showFlame ? <div style={{ margin: '20px 0px 20px 0px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  {showIcicle ? (
                     boundData.map((attr) => (
                        <Plot
                           attr={attr}
                           key={'demo_' + attr.name + '_icicle'}
                           modes={['Icicle']}
                           settings={settings}
                           pixelScale={pixelScale}
                           watchedVal={watchedVal}
                           style={style} />))
                  ) : (
                        boundData.map((attr) => (
                           <Plot
                              attr={attr}
                              key={'demo_' + attr.name + '_flame'}
                              modes={['Flame']}
                              settings={settings}
                              pixelScale={pixelScale}
                              watchedVal={watchedVal}
                              style={style} />))
                     )
                  }
               </div> : null}
            </div>
         );
   }
}