import React, { PureComponent } from 'react';
import { Plot } from './plot';

import { RemountOnResize } from './remount';

import { data } from '../lib/data';

export class UnsortedPlots extends PureComponent {
   constructor(props) {
      super(props);
      this.mountedView = this.mountedView.bind(this);

      const example_data = [data[10], data[11], data[3], data[13], data[12]];
      this.state = {
         example_data,
         scaledWidth: 0,
      };
   }


   mountedView(view) {
      // Similar to the trick used in the Canvas component,
      // this lets us scale below 800 pixels and still mainting
      // _some_ form of consistency.
      if (view) {
         const ratio = window.devicePixelRatio || 1;
         const scaledWidth = (250 * view.clientWidth / 800) | 0;
         this.setState({ view, ratio, scaledWidth });
      }
   }

   render() {
      const { example_data, scaledWidth } = this.state;
      const plotWrapperStyle = { width: scaledWidth, margin: '0 auto' };
      const plotStyle = { height: '50px', margin: '5px 0px 5px 0px' };
      const settings = { logScale: true, emphasizeNonZero: true };
      const heatmap = (
         <div key='heatmap' style={plotWrapperStyle}>
            {
               example_data.map((attr) => (
                  <Plot
                     attr={attr}
                     key={'heatmap' + attr.name}
                     modes={['Heatmap']}
                     settings={settings}
                     pixelScale={4}
                     style={plotStyle} />
               ))
            }
         </div>
      );

      const bar = (
         <div key='bar' style={plotWrapperStyle}>
            {
               example_data.map((attr) => (
                  <Plot
                     attr={attr}
                     key={'bar' + attr.name}
                     modes={['Bar']}
                     settings={settings}
                     pixelScale={4}
                     style={plotStyle} />
               ))
            }
         </div>
      );

      const flame = (
         <div key='flame' style={plotWrapperStyle}>
            {
               example_data.map((attr) => (
                  <Plot
                     attr={attr}
                     key={'flame' + attr.name}
                     modes={['Flame']}
                     settings={settings}
                     pixelScale={4}
                     style={plotStyle} />
               ))
            }
         </div>
      );

      const plotPaddingStyle = { flex: '1 1' };
      return (
         <RemountOnResize>
            <div
               ref={this.mountedView}
               key='container'>
               <div
                  key='unsorted_plots'
                  style={{
                     display: 'flex',
                     flexDirection: 'row',
                  }}>
                  <div style={plotPaddingStyle}>
                     {heatmap}
                  </div>
                  <div style={plotPaddingStyle}>
                     {bar}
                  </div>
                  <div style={plotPaddingStyle}>
                     {flame}
                  </div>
               </div>
            </div>
         </RemountOnResize>
      );
   }
}