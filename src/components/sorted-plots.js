import React, { PureComponent } from 'react';
import { Plot } from './plot';

import { data } from '../lib/data';

export class SortedPlots extends PureComponent {
   constructor(props) {
      super(props);
      const sorted_example_data = [data[10], data[11], data[3], data[13], data[12]];
      this.state = { sorted_example_data };
   }

   render() {

      return (<div key={'sorted_plots'}>
         {
            this.state.sorted_example_data.map((attr) => (
               <Plot
                  attr={attr}
                  key={'sorted_plots_' + attr.name}
                  modes={['Bars']}
                  pixelScale={1}
                  settings={{ sort: 1, logScale: true }}
                  style={{ height: '50px', margin: '5px 0px 5px 0px' }} />))
         }
      </div>
      )
   }
}