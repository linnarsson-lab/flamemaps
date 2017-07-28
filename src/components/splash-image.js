import React, { PureComponent } from 'react';

import { Plot } from './plot';

import { data } from '../lib/data';

export class SplashImage extends PureComponent {

  render() {
    const {
    width,
      pixelScale,
      settings,
    } = this.props;

    return (
      <div>
        <p><i>Bar graphs</i></p>
        <SplashBar
          width={width}
          pixelScale={pixelScale}
          settings={settings}
        />
        <p><i>Heat Maps</i></p>
        <SplashHeatmap
          width={width}
          pixelScale={pixelScale}
          settings={settings}
        />
        <p><i>Flame Maps</i></p>
        <SplashFlame
          width={width}
          pixelScale={pixelScale}
          settings={settings}
        />
      </div>
    )
  }
}

export class SplashBar extends PureComponent {
  render() {
    const {
      width,
      pixelScale,
      settings,
    } = this.props;
    const watchedVal = `${width}${pixelScale}${settings}`;

    return (
      <div style={{ margin: '20px 0px 20px 0px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          data.map((attr) => (
            <Plot
              attr={attr}
              key={'demo_' + attr.name + '_bar'}
              modes={['Bar']}
              settings={settings}
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
      settings,
    } = this.props;
    const watchedVal = `${width}${pixelScale}${settings}`;

    return (
      <div style={{ margin: '20px 0px 20px 0px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          data.map((attr) => (
            <Plot
              attr={attr}
              key={'demo_' + attr.name + '_heatmap'}
              modes={['Heatmap']}
              settings={settings}
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
      settings,
    } = this.props;
    const watchedVal = `${width}${pixelScale}${settings}`;

    return (
      <div style={{ margin: '20px 0px 20px 0px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          data.map((attr) => (
            <Plot
              attr={attr}
              key={'demo_' + attr.name + '_flame'}
              modes={['Flame']}
              settings={settings}
              pixelScale={pixelScale}
              watchedVal={watchedVal}
              style={{ margin: 5, width: width, height: 70, flex: 1 }} />
          ))
        }
      </div>
    );
  }
}