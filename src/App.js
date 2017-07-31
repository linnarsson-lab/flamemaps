import React, { PureComponent } from 'react';
//import './App.css';
//import './lib/pure-min.css';

import Checkbox from 'rc-checkbox';

import { SplashImage, SplashFlame } from './components/splash-image';
import { IntroDemo } from './components/intro-demo';

import { SortedPlots } from './components/sorted-plots';
import { UnsortedPlots } from './components/unsorted-plots';
import { AlternatingPlots } from './components/alternating-plots';
import { Demos } from './components/demos';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.handleIntroDemoAmount = this.handleIntroDemoAmount.bind(this);
    this.handleEmphNZ = this.handleEmphNZ.bind(this);

    this.state = {
      splashEmphNZ: true,
      showBar: true,
      showHeatmap: true,
      showFlame: true,
    };
  }

  handleIntroDemoAmount(introDemoAmount) {
    this.setState({ introDemoAmount });
  }

  handleEmphNZ(e, checked) {
    this.setState({ splashEmphNZ: e.target.checked ? true : false })
  }

  render() {
    const {
      introDemoAmount,
      splashEmphNZ,
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
        <h2>Introduction</h2>
        <p>
          Flame maps (not to be confused with <a href='http://www.brendangregg.com/flamegraphs.html'>flame graphs</a>) are a novel type of plot (as far as we can tell), originally designed at <a href='http://linnarssonlab.org/'>Linnarsson Lab</a> to cope with issues that arose due to having far more raw data to show than available screen resolution. Below you can compare a few examples of the same data displayed as bar graphs, heat maps, and flame maps.
        </p>
        <SplashImage
          width={70}
          pixelScale={1}
          settings={{ logScale: true, emphasizeNonZero: true }} />
        <p><i>
          (The data is taken from <a href='http://science.sciencemag.org/content/347/6226/1138'>"Cell types in the mouse cortex and hippocampus revealed by single-cell RNA-seq", A Zeisel, AB Muñoz-Manchado, et al. 2015</a>. However, the data itself does not really matter for what we are trying to demonstrate)
        </i></p>
        <p>
          Similar to bar graphs and heat maps, flame maps are constructed by grouping the input values across the available columns, evenly and in order. However, instead of averaging these values, they are then sorted and plotted as a vertical heat map (if we have only one data point per column, the result is effectively a regular heatmap). The typical look of the plotted gradients gives the flame map its name.
        </p>
        <p>
          This has the effect of plotting the number of non-zero values, and how those values are distributed as two separate things; using an average would reduce these separate measurements to one number. They may be of use in situations where this distinction is important.</p>
        <h2>Issues introduced by binning and averaging</h2>
        <p>
          Three interactive plots should be displayed below, one bar graph, one heatmap, and one flame map. The plots show levels of gene expression in a selection of mouse cells for a given gene.
        </p>
        <p>
          The plots should be 800 pixels wide, and for demonstration purposes the width of the columns is at least four pixels. <i>(we are assuming this is viewed on a display with screen enough resolution. We try to compensate for smaller screens, as well as browser-zoom and high density displays, but it might not be completely right. Our apologies, it is very hard to make dynamic plots behave the same across different media)</i></p>
        <p>Try changing the number of plotted cells, while predicting how different amounts of data affect the shape plot itself:</p>
        <IntroDemo amount={introDemoAmount} />
        <p>
          Did you notice the change once the number of cells exceeds {introSetLink(200)}? You may want to increase the value one step at a time to really see the effect. How the graphs change when you wiggle the value around {introSetLink(300)} is also very revealing. And for the sake of completeness, try {introSetLink(2995)} to {introSetLink(3005)}.
        </p>
        <h3>Large relative differences when averaging small bin sizes</h3>
        <p>
          Recall that we have 800 pixels available, and a minimum of four pixels per column. Therefore we can display at most 200 data points individually. Bigger data sets inevitably involve grouping the data. For the bar graph and heatmap we typically bin the data per column, then plot the average value of the bin.
        </p>
        <p>
          Compare plotting {introSetLink(298)}, {introSetLink(299)}, and {introSetLink(300)} cells. In this range the bins alternate between one and two data points. Because it is one and a half times the amount of columns, a tiny bit of wiggling has a big effect on how the data is distributed. To make matters worse, for bar graphs and heat maps there is no direct visual way of telling how this is done, hiding it from the reader. Admittedly, the examples are specifically chosen to maximise that effect, but it illustrates the point.
        </p>
        <h3>Averaging over sparse data</h3>
        <p>
          You may have noticed that the bar graphs tends to decrease in height with increased bin-size. Because our data is sparse, averaging tends to skew values towards zero. When we have very large data sets, this can even mask non-zero values, although log-scaling the vertical axis helps a bit here.
          </p>
        <p>
          <i>(Aside from using a log-scale, there are more sophisticated alternatives to averaging that can help as well, like <a href='https://skemman.is/handle/1946/15343'>Steinarsson's Largest Triangle Three Buckets algorithm</a>, but they have their own trade-offs)</i>
        </p>
        <h2>How flame maps attempt to address these issues</h2>
        <p>The problems in the previous paragraph could be seen as simplified versions of the problems highlighted by <a href='https://en.wikipedia.org/wiki/Anscombe%27s_quartet'>Anscombe's Quartet</a>, or the more recent <a href='https://www.autodeskresearch.com/publications/samestats'>'Datasaurus Dozen'</a> by Matejka and Fitzmaurice. Like the graphs in these papers, the most straight-forward solution would be showing the raw data being binned.
        </p>
        <h3>Using more space and colour dimensions</h3>
        <p>
          Heat maps only use horizontal position and colour, and bar graphs use horizontal position and height (colours usually being limited to grouping data by category). Flame maps use width, height and colour to indicate different things, effectively having one extra "dimension" at their disposal to communicate information.
          </p>
        <p>
          The height gives an indication of how many non-zero values a bin contains (it is fixed at the biggest bin size, and for bins with less data a grey block signals the missing element). The colour indicates what the actual cell values are. When plotting between {introSetLink(201)} and {introSetLink(400)} cells in the example above, we can immediately see when we are binning two values or one, and what their separate values are.
        </p>
        <p>
          Even when we have more data per column than vertical pixels, and are therefore forced to average data per pixel, this does not pose as much of a problem as before. Because the data is sorted, the values being averaged are likely to be (nearly) the same value.
        </p>
        <h3>Dealing with very sparse data</h3>
        <p>
          Sometimes the data is so sparse that only the bottom bin of a column contains non-zero values. If our columns are only two to four data points high ({introSetLink(400)}, {introSetLink(600)} and {introSetLink(800)} cells in the above demo), these are still readable, but when the data-to-pixel ratio is bigger, we end up with our sparse-data averaging problem again. For example, in the postage-stamp sized plots that opened the article, each cell has only one or two pixels. With sparse data, this makes non-zero values hard to spot.
        </p>
        <p>
          To compensate for this, flame maps default to adding a thin strip below the main plot, that shows the maximum value of the column above it. These are separated by a grey line, to avoid confusing this with a higher number of expressed cells:
        </p>
        <SplashFlame
          width={70}
          pixelScale={1}
          settings={{ logScale: true, emphasizeNonZero: splashEmphNZ }} />
        <label style={{ margin: '10px 25px 10px 25px' }}>
          <Checkbox
            defaultChecked={1}
            checked={splashEmphNZ ? 1 : 0}
            onChange={this.handleEmphNZ} />
          <span>&nbsp;emphasize non-zero</span>
        </label>
        <p>
          For very sparse data, the extra strip makes the of presence non-zero values stand out.
        </p>
        <h2>Caveats of using flame maps</h2>
        <p>
          We do not want to suggest that flame maps are a drop-in replacement for bar charts and heatmaps. They have their own trade-offs and potential issues.
        </p>
        <h3>Simpler alternatives</h3>
        <p>
          Even when showing sparsity and preventing deceptive averages is important, there might be simpler alternatives. When that is <i>all</i> that we want to know, we can also sort the data as a whole, instead of per column, which is an easier to interpret visual solution:
        </p>
        <SortedPlots />
        <p>
          However, when the order of data matters this is not an option. For example, if we want to compare which cluster of cells has high or low values across various genes, we need to keep a fixed order.
        </p>
        <UnsortedPlots />
        <h3>Aliasing issues</h3>
        <p>
          An underlying assumption for flame maps is that slightly displacing cells locally is not a problem, letting us get away with sorting the data by value in each column. This might not alwys be the case.
        </p>
        <p>
          For example, aliasing issues are still problematic. Below are two artificial data sets that demonstrate this. Both alternate between on and off, but they might do so at different offsets. You can tweak the values yourself explore what kind of aliasing issues can arise:
        </p>
        <AlternatingPlots />
        <p>
          As you can see, the data only really makes sense when we zoom in far enough that each cell is plotted separately. However, bar graphs and heat maps perform just as poorly. We suspect that in any situation where sorting is a significant issue, averaging is just as bad.
        </p>
        <p>
          The cause of the problem here is not really the type of plot being used, it is the underlying ordering. If something like this would show up in a real data set, the problem is likely either the choice of algorithm that lead to said ordering, or the data itself.
        </p>
        <p>
          The point however is that, unlike the issues caused by sparsity or averaging, flame maps are just as susceptible to this as bar graphs and heat maps.
        </p>
        <h3>Imprecision of colour comparisons</h3>
        <p>If we want to determine how much two values differ, human perception is less precise when comparing colours than when comparing sizes. Ignoring the aforementioned issues with averaging, flame maps and heat maps both have a disadvantage over bar charts here.
        </p>
        <p>
          With that in mind, for anything that requires more precise interpretations than comparing zero-values, low non-zero values, and high non-zero values, we advise against using flame maps (or heat maps). Providing more fine-grained controls like clipping, tresholding and log-scaling the data may also help.
        </p>
        <h3>Optical illusions</h3>
        <p>
          It is plausible that certain colour gradient arrangements can lead to optical illusions, like the <a href='https://en.wikipedia.org/wiki/Contrast_effect'>simultaneous contrast effect</a>, <a href='https://en.wikipedia.org/wiki/Mach_bands'>Mach bands</a>, and the <a href='https://en.wikipedia.org/wiki/Watercolour_illusion'>watercolour illusion</a>. Similarly, the optical illusions related to perceived sizes being affected by nearby sizes are well documented - i.e. the <a href='https://en.wikipedia.org/wiki/Ebbinghaus_illusion'>Ebbinghaus illusion</a>.
        </p>
        <p>
          This could interfere with the correct interpretation of the underlying data. Of course, both heat maps and bar graphs would also be susceptible to these types of illusions, but since flame maps combine size and colour they might be more susceptible to them, or suffer from novel illusions that arise from the combination. However, we have not really looked into this, so this is purely speculative.
        </p>
        <h2>Summary</h2>
        <p>When compared to traditional bar graphs and heat maps, due to not averaging grouped data, flame maps let us:</p>
        <ul>
          <li>discern the relative amount of zero values</li>
          <li>discern whether grouped data contain many low values, or a few high values</li>
          <li>spot the presence of non-zero values when data is extremely sparse</li>
        </ul>
        <p>In situations where these are desired properties, and a very precise distinction between high and low values is not required, we think they will provide advantages.</p>
        <p>
          They are, in our opinion, very simple to construct, to the point where we are still not sure if they are really novel or if we simply have not looked hard enough. If they do already exist under another name, and with implementations in major plotting packages, please let us know. It would make the people in our group very happy (see below).
        </p>
        <h2>Implementations</h2>
        <p><i>
          For now, you're looking at it. Sorry. The source code for this website be found at:
          </i></p>
        <p><a href='https://github.com/linnarsson-lab/flamemaps'>
          https://github.com/linnarsson-lab/flamemaps
        </a></p>
        <p><i>
          Flame maps were created for an as-of-now in-house web app. For performance reasons they were implemented in raw javascript and html5 canvas (not even a framework like d3.js was used). This demo page is based on repurposed plotting code from thos web app. I do not know PyPlot, R or any other plotting library really, and currently don't have the time it would take to learn them well enough to implement these plots efficiently. So I figured it made more sense to write a convincing demonstration page and hope that  others will agree these plots are useful, in the hope that the various plotting library wizards out there take over from there. And then Gioele can stop wishing I'll learn how to use PyPlot to implement this for him - Job
          </i></p>
        <h2>Interactive Demos</h2>
        <Demos />
      </article>
    );
  }
}

export default App;
