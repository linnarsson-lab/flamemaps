import React, { PureComponent } from 'react';
//import './App.css';
//import './lib/pure-min.css';

import Slider from 'rc-slider';
import InputNumber from 'rc-input-number'
import { Plot } from './components/plot';

import { SplashImage, SplashFlame } from './components/splash-image';
import { IntroDemo } from './components/intro-demo';
import { AlternatingPlots } from './components/alternating-plots';
import { Demos } from './components/demos';

import { data } from './lib/data';


const SliderWithTooltip = Slider.createSliderWithTooltip(Slider);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.handleIntroDemoAmount = this.handleIntroDemoAmount.bind(this);
    this.handleUnsortedWidth = this.handleUnsortedWidth.bind(this);

    this.makeUnsortedPlots = this.makeUnsortedPlots.bind(this);


    const sorted_example_data = [data[10], data[11], data[3], data[13], data[12]];

    const sorted_plots = (
      <div key={'sorted_plots'}>
        {
          sorted_example_data.map((attr) => (
            <Plot
              attr={attr}
              key={'sorted_plots_' + attr.name}
              modes={['Bars']}
              pixelScale={1}
              settings={{ sort: 1, logScale: true }}
              style={{ height: '50px', margin: '5px 0px 5px 0px' }} />))
        }
      </div>
    );

    const unsorted_width = 100;
    const unsorted_plots = this.makeUnsortedPlots(unsorted_width, sorted_example_data);
    this.state = {
      sorted_example_data,
      sorted_plots,
      unsorted_plots,
      showBar: true,
      showHeatmap: true,
      showFlame: true,
    };
  }

  handleIntroDemoAmount(introDemoAmount) {
    this.setState({ introDemoAmount });
  }
  handleUnsortedWidth(value) {
    const unsorted_width = Math.max(30, Math.min(100, value));
    const unsorted_plots = this.makeUnsortedPlots(unsorted_width, this.state.sorted_example_data);
    this.setState({ unsorted_plots });
  }

  makeUnsortedPlots(unsorted_width, sorted_example_data) {
    const unsorted_plots_heatmap = (<div key='unsorted_plots_heatmap'>
      {
        sorted_example_data.map((attr) => (
          <Plot
            attr={attr}
            key={'unsorted_plots_heatmap' + attr.name}
            modes={['Heatmap']}
            watchedVal={unsorted_width}
            settings={{ logScale: true }}
            style={{ height: '50px', margin: '5px 0px 5px 0px' }} />
        ))
      }
    </div>
    );

    const unsorted_plots_bar = (<div key='unsorted_plots_bar'>
      {
        sorted_example_data.map((attr) => (
          <Plot
            attr={attr}
            key={'unsorted_plots_bar' + attr.name}
            modes={['Bar']}
            watchedVal={unsorted_width}
            settings={{ logScale: true }}
            style={{ height: '50px', margin: '5px 0px 5px 0px' }} />
        ))
      }
    </div>
    );

    const unsorted_plots_flame = (<div key='unsorted_plots_flame'>
      {
        sorted_example_data.map((attr) => (
          <Plot
            attr={attr}
            key={'unsorted_plots_flame' + attr.name}
            modes={['Flame']}
            watchedVal={unsorted_width}
            settings={{ logScale: true }}
            style={{ height: '50px', margin: '5px 0px 5px 0px' }} />
        ))
      }
    </div>
    );
    const unsorted_plots = (
      <div
        key='unsorted_plots_container'>
        <div
          key='unsorted_plots'
          style={{
            width: unsorted_width + '%',
            display: 'flex', flexDirection: 'row',
            flexWrap: 'wrap'
          }}>
          <div style={{ flex: '1 1' }}>
            {unsorted_plots_heatmap}
          </div>
          <div style={{ flex: '1 1' }}>
            {unsorted_plots_bar}
          </div>
          <div style={{ flex: '1 1' }}>
            {unsorted_plots_flame}
          </div>
        </div>
        <div
          key='unsorted_plots_controls'
          style={{ display: 'flex', flexDirection: 'row' }}>
          <SliderWithTooltip
            onChange={this.handleUnsortedWidth}
            style={{ flex: 600, margin: '10px 25px 10px 25px' }}
            min={30}
            max={100}
            defaultValue={unsorted_width}
            value={unsorted_width}
          />
          <InputNumber
            onChange={this.handleUnsortedWidth}
            style={{ flex: 100, margin: '10px 25px 10px 25px' }}
            min={30}
            max={100}
            defaultValue={unsorted_width}
            value={unsorted_width}
          />
        </div>
      </div>
    );
    return unsorted_plots;
  }

  render() {
    const {
      introDemoAmount,
      introDemoLogscale,
      sorted_plots,
      unsorted_plots,
    } = this.state;
    const introSetLink = (val) => {
      return (
        <button className='link'
          onClick={(e) => {
            e.preventDefault();
            this.handleIntroDemoAmount(val);
          }}>
          {val}
        </button>
      )
    }

    return (
      <article>
        <h1>Flame maps</h1>
        <p><i>Job van der Zwan</i></p>
        <SplashImage
          width={70}
          pixelScale={1}
          logScale={true} />
        <h2>Introduction</h2>
        <p>Flame maps (not to be confused with <a href='http://www.brendangregg.com/flamegraphs.html'>flame graphs</a>) are a novel type of plot (as far as we know), that appear to be useful when there are more data points than available resolution to display them (be that pixels or print), and where averaging binned values has significant downsides. They were designed at <a href='http://linnarssonlab.org/'>Linnarsson Lab</a> to cope with issues that arose when displaying tens or hundreds of thousands of cells on a regular monitor. By combining both spatial dimensions and colour they can convey more raw information than traditional bar graphs or heat maps, without adding much visual complexity.</p>
        <h2>Issues introduced by binning and averaging</h2>
        <p>Three interactive plots should be displayed below, one bar graph, one heatmap, and one flame map (if they are not, you probably need to enable javascript). The plots show levels of gene expression of HexB in a selection of mouse cells. The data is taken from <a href='http://science.sciencemag.org/content/347/6226/1138'>"Cell types in the mouse cortex and hippocampus revealed by single-cell RNA-seq"</a> <i>(A Zeisel, AB Muñoz-Manchado, et al. 2015)</i>. However, the data itself does not really matter for what we are trying to demonstrate.
        </p>
        <p>
          Assuming you have enough screen resolution available, the plots should be 800 pixels wide, and for demonstration purposes the width of the bars is at least 4 pixels (if you are on a high density screen or use browser-zoom, we compensate for that). Remember those numbers for later. </p>
        <p>Try changing the number of plotted cells, and predicting how different amounts of data affect the shape plot itself:</p>
        <IntroDemo amount={introDemoAmount} logScale={introDemoLogscale} />
        <p>Did you notice the change once the number of cells exceeds {introSetLink(200)}? You may want to increase the value one step at a time to really see the effect. How the graphs behave when you wiggle the value around {introSetLink(300)} is also very revealing. And for the sake of completeness, try {introSetLink(2995)} to {introSetLink(3005)}. <i>(note: we are assuming you have 800 pixels available on your screen. If you are on a smaller screen, these effects will happen earlier and the numbers used in this article will be off. It is very hard to make dynamic plots behave robustly across media)</i>
        </p>
        <p>What is happening here? In this example we have 800 pixels available, and a minimum of four pixels per column. That means we can show up to 200 data points individually. If we want to show more data, we have to find a way to deal with grouped data. For the bar graph and heatmap we typically bin the data per column, then plot the average value of the bin.
        </p>
        <h3>Large relative differences when averaging small bin sizes</h3>
        <p>Compare plotting {introSetLink(298)}, {introSetLink(299)}, and {introSetLink(300)} cells. In this range the bins alternate between one and two data points. Because it is one and a half times the amount of columns, a tiny bit of wiggling has a big effect on how the data is distributed, revealing how big the effect on the resulting plot can be. To make matters worse, for bar graphs and heat maps there is no direct visual way of telling how this data is distributed, hiding these effects. Admittedly, this example is specifically chosen to maximise that effect, but it illustrates the point.
        </p>
        <h3>Averaging over sparse data</h3>
        <p>
          Notice how the bar graph height decreases with increased bin-size. This is because our data is sparse, so averaging tends to go towards (near) zero. When we have very large data sets (so a lot of data per bin), this can mask non-zero values.
          </p>
        <p>
          <i>(Aside from using a log-scale, there are more sophisticated alternatives to averaging that can help here, like <a href='https://skemman.is/handle/1946/15343'>Steinarsson's Largest Triangle Three Buckets algorithm</a>, but they have their own trade-offs)</i>
        </p>
        <h2>How flame maps address these issues</h2>
        <p>The problems in the previous paragraph could be seen as simplified versions of the problems shown by <a href='https://en.wikipedia.org/wiki/Anscombe%27s_quartet'>Anscombe's Quartet</a>, or the more recent <a href='https://www.autodeskresearch.com/publications/samestats'>'Datasaurus Dozen'</a> by Matejka and Fitzmaurice. Like the graphs in these papers, the most straight-forward solution would be showing the raw data being binned.
        </p>
        <p>
          Heat maps only use horizontal position and colour, and bar graphs use horizontal position and height (colours usually being limited to grouping data by category). The idea behind flame maps is to use width, height and colour; they effectively have one extra "dimension" at their disposal to communicate information.
          </p>
        <p>First, the data is binned per column as before. Then, for each column, the data is sorted from low to high values. The values are then plotted as colours. The lowest values appear on top, and the highest value at the bottom (if we have only one data point per column, the result is simply a heatmap). This results in a visual look that gives the graph its name.
        </p>
        <p>
          The height gives an indication of how many non-zero values a bin contains (it is fixed at the biggest bin size, and for bins with less data we plot a grey block to signal the missing element). The colour indicates what the actual cell values are. When plotting {introSetLink(298)} cells in the example above, we can immediately see that we are binning two high values. Similarly, at {introSetLink(300)} cells we can see that we bin a zero and non-zero value, skewing the average value downwards.
        </p>
        <p>
          Even if we have more data per column than vertical pixels, and are therefore forced to average data per pixel, this does not pose as much of a problem as before. Because data is sorted, the adjacent values are likely to be (nearly) the same value.
        </p>
        <h2>Dealing with very sparse data</h2>
        <p>
          Sometimes the data is so sparse that only the bottom bin of a column contains non-zero values. If our columns are only two to four data points high ({introSetLink(400)}, {introSetLink(600)} and {introSetLink(800)} cells in the above demo) these are still readable, but when the data-to-pixel ratio is bigger, we end up with our sparse-data averaging problem again. For example, in the postage-stamp sized plots that opened the article, each cell has onlyone or two pixels. With sparse data, this makes non-zero values hard to spot.
        </p>
        <p>
          To compensate for this, flame maps add a thin strip that only shows the maximum value of the column above it. To avoid confusing this with a higher number of expressed cells these are separated by a grey line. The extra strip makes presence the non-zero values stand out more in the sparsely expressed genes:
        </p>
        <SplashFlame
          width={70}
          pixelScale={1}
          logScale={true} />
        <p>
          Even for very sparse data, we can see where non-zero values are present.
        </p>
        <h2>Caveats of using flame maps</h2>
        <p>
          We do not want to suggest that flame maps are a drop-in replacement for bar charts and heatmaps. They have their own trade-offs and potential issues.
        </p>
        <h3>Lack of familiarity and added visual complexity</h3>
        <p>
           Bar graphs read as "higher is more", heat maps as "more colour intensity is more". Flame maps do both, and they represent different things. Being a novel data visualisation, it may not be immediately obvious how to read them for people unfamiliar with them, so they require explanation.
        </p>
        <p>A related issue is that flame maps require a bit more effort to interpret. Showing more information is not always desirable. While we focus on making sure non-zero values stand out, in many contexts the smoothing effects of averaging are actually desirable. In that case flame maps are more likely to add visual noise.
        </p>
        <h3>Simpler alternatives</h3>
        <p>
          Flame maps came about to address specific problems: showing sparsity, and preventing deceptive averages. However, when that is <i>all</i> that we want to know, we can also sort the data as a whole, instead of per column, which is an easier to interpret visual solution:
        </p>
        {sorted_plots}
        <p>
          However, this is not an option when the order of data matters. For example, if we want to compare which cluster of cells has high or low values across various genes, we need to keep a fixed order:
        </p>
        {unsorted_plots}
        <h3>Aliasing issues</h3>
        <p>
          An underlying assumption for flame maps is that slightly displacing cells locally is not a problem, letting us get away with locally sorting the data by value. This might not alwys be the case.
        </p>
        <p>
          For example, aliasing issues are still problematic. Below are two artificial datasets that demonstrate this. Both alternate between on and off, but they might do so at different offsets. You can tweak the values yourself to see how this results in aliasing problems:
        </p>
        <AlternatingPlots />
        <p>
          As you can see, the data only really makes sense when we zoom in far enough that each cell is plotted separately. However, bar graphs and heat maps perform just as poorly. We suspect that in any situation where sorting is a significant issue, averaging is just as bad.
        </p>
        <p>
          The cause of the problem here is not really the type of plot being used, it is the underlying ordering. If something like this would show up in a real data set, the problem is likely either the choice of algorithm that lead to said ordering, or the data itself.
        </p>
        <p>
          The point however is that, unlike with sparsity or averaging, flame maps are just as susceptible to this problem as bar graphs and heat maps.
        </p>
        <h3>Imprecision of colour comparisons</h3>
        <p>If we want to determine how much two values differ, human perception is less precise when comparing colours than when comparing sizes. Ignoring the aforementioned issues with averaging, flame maps and heat maps both have a disadvantage over bar charts here.
        </p>
        <p>
          With that in mind, for anything that requires more precise interpretations than comparing zero-values, low non-zero values, and high non-zero values, we advise against using flame maps (or heat maps). Providing more fine-grained controls like clipping, tresholding and log-scaling the data may also help.
        </p>
        <h3>Optical illusions</h3>
        <p>
          In all honesty, we have not looked into this in detail, but it seems very likely that particular colour gradient arrangements can lead to optical illusions, like the <a href='https://en.wikipedia.org/wiki/Contrast_effect'>simultaneous contrast effect</a>, <a href='https://en.wikipedia.org/wiki/Mach_bands'>Mach bands</a>, and the <a href='https://en.wikipedia.org/wiki/Watercolour_illusion'>watercolour illusion</a>. This could interfere with the correct interpretation of the underlying quantative values. Of course, heat maps might also be susceptible to colour-related optical illusions, but whether they are to the same degree is unknown.
        </p>
        <h2>Summary</h2>
        <p>We have argued that flame maps:</p>
        <ul>
          <li>are better at giving an idea of how many zero values there are in the plotted data</li>
          <li>let us discern whether the bins contain many low values, or a few high values</li>
          <li>do not average away non-zero values when data is extremely sparse</li>
        </ul>
        <p>In situations where these are desired properties, and a very precise distinction between high and low values is not required, we think they will provide advantages over to bar graphs and heat maps.</p>
        <h2>Implementations</h2>
        <p><i>For now, you're looking at it. Sorry. Flame maps were created for an in-house web-based data browser. For performance reasons they were implemented in raw javascript and html5 canvas (so no, not even d3.js was used). This demo page is based on repurposed plotting code. I do not know PyPlot, R or any other plotting library really, and don't have the time it takes to learn them well enough to implement these plots efficiently. So I figured it made more sense to write a convincing demonstration page and hope that  others will agree these plots are useful, and then let the various plotting library wizards out there take over. And then Gioele stop wishing I'll learn how to use PyPlot - Job</i></p>
        <h2>Interactive Demos</h2>
        <Demos />
      </article>
    );
  }
}

export default App;
