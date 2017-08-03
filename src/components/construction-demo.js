import React, { Component } from 'react';
import { RemountOnResize } from './remount';

import { Plot } from './plot';

import { data_meg3 } from '../lib/data';
const meg3 = Object.assign(
   {},
   data_meg3,
   { data: data_meg3.data.slice(0, 100) }
);

export class ConstructionDemo extends Component {
   constructor(props) {
      super(props);
      this.mountedView = this.mountedView.bind(this);
      this.state = { pixelScale: 80 }
   }

   mountedView(view) {
      if (view) {
         const pixelScale = view.clientWidth / 10;
         this.setState({ view, pixelScale });
      }
   }

   render() {
      return (
         <RemountOnResize>
            <div
               key={'meg3_construction_example'}
               ref={this.mountedView}>
               <Plot
                  attr={meg3}
                  modes={['Flame']}
                  pixelScale={this.state.pixelScale}
                  settings={{ logScale: true, emphasizeNonZero: false }}
                  style={{ height: '100px', margin: '5px 0px 5px 0px' }} />
            </div>
         </RemountOnResize>
      );
   }
}