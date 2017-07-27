import React, { PureComponent } from 'react';

import { Plot } from './plot';

import { data } from '../lib/data';

export class SplashImage extends PureComponent {

  render() {
    const {
    width,
      pixelScale,
      logScale,
    } = this.props;
    const settings = { logScale };
    const watchedVal = `${width}${pixelScale}${logScale}`;

    return (
      <div>
        <SplashBar
          width={width}
          pixelScale={pixelScale}
          logScale={logScale}
        />
        <p><i>Bar graphs</i></p>
        <SplashHeatmap
          width={width}
          pixelScale={pixelScale}
          logScale={logScale}
        />
        <p><i>Heat Maps</i></p>
        <SplashFlame
          width={width}
          pixelScale={pixelScale}
          logScale={logScale}
        />
        <p><i>Flame Maps</i></p>
      </div>
    )
  }
}

export class SplashBar extends PureComponent {
  render() {
    const {
      width,
      pixelScale,
      logScale,
    } = this.props;
    const watchedVal = `${width}${pixelScale}${logScale}`;

    return (
      <div style={{ margin: '20px 0px 20px 0px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          data.map((attr) => (
            <Plot
              attr={attr}
              key={'demo_' + attr.name + '_bar'}
              modes={['Bar']}
              settings={{logScale}}
              pixelScale={pixelScale}
              watchedVal={watchedVal}
              style={{ margin: 5, width: width, height: 70, flex: 1 }} />
          ))
        }
      </div>
    );
  }
}

export class SplashHeatmap extends PureComponent {
  render() {
    const {
      width,
      pixelScale,
      logScale,
    } = this.props;
    const watchedVal = `${width}${pixelScale}${logScale}`;

    return (
      <div style={{ margin: '20px 0px 20px 0px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          data.map((attr) => (
            <Plot
              attr={attr}
              key={'demo_' + attr.name + '_heatmap'}
              modes={['Heatmap']}
              settings={{logScale}}
              pixelScale={pixelScale}
              watchedVal={watchedVal}
              style={{ margin: 5, width: width, height: 70, flex: 1 }} />
          ))
        }
      </div>
    );
  }
}

export class SplashFlame extends PureComponent {
  render() {
    const {
      width,
      pixelScale,
      logScale,
    } = this.props;
    const watchedVal = `${width}${pixelScale}${logScale}`;

    return (
      <div style={{ margin: '20px 0px 20px 0px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          data.map((attr) => (
            <Plot
              attr={attr}
              key={'demo_' + attr.name + '_flame'}
              modes={['Flame']}
              settings={{logScale}}
              pixelScale={pixelScale}
              watchedVal={watchedVal}
              style={{ margin: 5, width: width, height: 70, flex: 1 }} />
          ))
        }
      </div>
    );
  }
}