import React, { PureComponent } from 'react';

import Checkbox from 'rc-checkbox';

import { SplashImage, SplashFlame, SplashIcicle } from './components/splash-image';
import { IntroDemo } from './components/intro-demo';
import { ConstructionDemo } from './components/construction-demo';
import { SortedPlots } from './components/sorted-plots';
import { AliasingPlots } from './components/aliasing-plots';
import { Demos } from './components/demos';


class App extends PureComponent {
  constructor(props) {
    super(props);

    this.handleIntroDemoAmount = this.handleIntroDemoAmount.bind(this);
    this.handleIntroDemoGene = this.handleIntroDemoGene.bind(this);
    this.handleEmphNZ = this.handleEmphNZ.bind(this);
    this.handleIcicle = this.handleIcicle.bind(this);

    this.introSetAmountLink = this.introSetAmountLink.bind(this);


    this.state = {
      splashEmphNZ: true,
      showBar: true,
      showHeatmap: true,
      showFlame: true,
      showIcicle: false,
    };
  }

  handleIntroDemoAmount(introDemoAmount) {
    this.setState({ introDemoAmount });
  }

  handleIntroDemoGene(introGene) {
    this.setState({ introGene });
  }

  handleEmphNZ(e, checked) {
    this.setState({ splashEmphNZ: e.target.checked ? true : false })
  }

  handleIcicle(e) {
    e.preventDefault();
    const showIcicle = !this.state.showIcicle;
    this.setState({ showIcicle })
  }

  introSetAmountLink(val, description) {
    return (
      <button className='link'
        onClick={(e) => {
          e.preventDefault();
          this.handleIntroDemoAmount(val);
        }}>
        {description || val}
      </button>
    )
  }

  render() {
    const {
      introDemoAmount,
      introGene,
      splashEmphNZ,
      showIcicle,
    } = this.state;


    return (
      <article>
        <h1>Icicle and Flame Maps</h1>
        <p><i>Job van der Zwan</i></p>
        <h2>Introduction</h2>
        <p>
          Icicle and flame maps (not to be confused with <a href='http://www.cs.middlebury.edu/~candrews/showcase/infovis_techniques_s16/icicle_plots/icicleplots.html'>icicle plots</a> or <a href='http://www.brendangregg.com/flamegraphs.html'>flame graphs</a>) are a novel type of plot (as far as we can tell), originally designed at <a href='http://linnarssonlab.org/'>Linnarsson Lab</a> to cope with issues that arose due to having far more raw data to show than available screen resolution. Specifically, they avoid issues of smoothing out information through averaging. In a flame map, the "height" of a column shows the ratio of zero to non-zero values in that column. The heat map gradient of the column shows the actual values. Below a few example <a href='https://en.wikipedia.org/wiki/Small_multiple'>small multiples</a> of the same data displayed are as bar graphs, heat maps, and flame/icicle maps.
        </p>
        <SplashImage
          width={70}
          pixelScale={1}
          settings={{ logScale: true, emphasizeNonZero: true }} />
        <p>
          <i>(The data is taken from <a href='http://science.sciencemag.org/content/347/6226/1138'>"Cell types in the mouse cortex and hippocampus revealed by single-cell RNA-seq", A Zeisel, AB Muñoz-Manchado, et al. 2015</a>. However, the data itself does not really matter for what we are trying to demonstrate)</i>
        </p>
        <p>Note that icicle maps are just upside-down flame maps with a different color scale. As they are identical otherwise, we will use flame maps as the standard example from now on.</p>
        <h2>Original Scientific Context</h2>
        <p>
          Flame and icicle maps were designed to solve a specific problem, and knowing the problem they originally tried to solve may make it easier to understand them.
          </p>
        <p>
          Linnarsson Lab does research in the field of molecular neurobiology, using <a href='https://en.wikipedia.org/wiki/Single_cell_sequencing#Single-cell_RNA_sequencing_.28scRNA-seq.29'>Single cell RNA sequencing</a> (scRNAseq). The <a href='https://en.wikipedia.org/wiki/Lie-to-children'>lies-to-children</a> explanation of what we do is as follows:
        </p>
        <ul>
          <li>Take a sample of cells (the biological kind)</li>
          <li>Measure gene expressions for each cell: <i>"is gene Mog active, is gene Plp1 active, etc."</i>. This is measured by counting RNA molecules for that gene (for those unfamiliar with this field of biology, "RNA molecules" can be thought of as "active copies of that gene" here)</li>
          <li>Try to identify which genes are associated with which cell type</li>
          <li>Combine this with sampling from different developmental stages to untangle the genetic side of cell development</li>
        </ul>
        <p>
          The idea is to identify cell types by their active genes (for example, <a href='http://ki.se/en/news/special-nerve-cells-cause-goose-bumps-and-nipple-erection'>discovering new types of neurons</a>). Since we don't know <i>a priori</i> what the relevant genes will be, the number of genes measured is essentially "as much as one can get away with" (typically tens of thousands). Similarly, for purposes of statistical strength, the cell sample size is "as big as one can get away with", which is rapidly increasing in this field: data sets of tens of thousands of cells are common now, hundreds of thousands are starting to pop up and surely a million is not far off.
        </p>
        <p>
          The end result is a data set that is basically a giant table, with columns representing individual cells, rows representing genes, and cells in the table representing how much RNA was measured of that gene in that particular (biological) cell. Most of these cells will be zero, because the gene is not active - we have a sparse data set.
        </p>
        <p>
          To make sense of the data, clustering algorithms are used to sort the rows and columns of this table, so that similar cells and genes end up close together. The next step is to inspect individual rows of this table for "marker genes" - genes whose activation (or lack thereof) can be used to categorise cell types. That is where these plots come in.
        </p>
        <p>
          <b>Unlike most charts, the x-axes of the plots used in this article do not represent a value like time, or clear-cut categories. It's just cells, ordered by "heuristic likeness" (to the best of our cluster algorithm's ability), grouped evenly across available columns of our plot.</b>
        </p>
        <p>
          When we use a bar graph to plot a gene row, each column in the graph simply takes a portion of our original row. Say we have 100.000 cells, but only 1000 pixels to display them. Even if we make the columns of our bar graph as narrow as a single pixel, they still represent 100 cells, typically by averaging their values. The first column takes the first 100, the second column the next 100, and so on.
        </p>
        <h2>Issues introduced by grouping and averaging</h2>
        <p>
          Three interactive plots should be displayed below: one bar graph, one heat map, and one flame map. The plots show levels of gene expression in a selection of mouse cells for a given gene.
        </p>
        <p>For heat maps and flame maps, missing values are displayed as grey, zero values are displayed as white, and non-zero values scale from yellow for low values, to red for high values.
        </p>
        <p>
          The plots should be 800 pixels wide, and for demonstration purposes the width of the columns is at least four pixels. That means they can display at most 200 columns (assuming this is viewed on a display with a high enough resolution. We try to compensate for smaller screens, zoom settings, and high density displays, but it might not be completely right. Apologies, it is very hard to make dynamic plots behave the same across different media).
        </p>
        <p>Try changing the number of plotted cells, while predicting how different amounts of data affect the shape plot itself:</p>
        <IntroDemo amount={introDemoAmount} gene={introGene} />
        <p>
          Notice the change once the number of cells exceeds {this.introSetAmountLink(200)}? How the graphs change when wiggling the value around {this.introSetAmountLink(300)} is also very revealing.
        </p>
        <h3>Large relative differences when averaging small group sizes</h3>
        <p>
          Any data set larger than the maximum amount of columns requires grouping the data, in this case any data set bigger than 200 cells. For the bar graph and heat map we typically group the data as evenly as possible, then plot the average value per group (that is, per column).
        </p>
        <p>
          Compare plotting {this.introSetAmountLink(298)}, {this.introSetAmountLink(299)}, and {this.introSetAmountLink(300)} cells. In this range the columns alternate between grouping one and two data points. A tiny bit of wiggling has a big effect on how the data is distributed. To make matters worse, for bar graphs and heat maps there is no direct visual way of telling how this is done, hiding it from the reader. Admittedly, the data-to-group ratio in this example is specifically chosen to maximise that effect, but it illustrates the point.
        </p>
        <h3>Averaging away information</h3>
        <p>
          Often, averaging is a good thing, smoothing away noise and outliers. In our case it can hide useful information. It may be important to know in <i>how many</i> cells a gene is expressed. In other words: the sparsity of the data. This is a separate thing from the actual value of expression. Averaging reduces these two types of information to one number.
        </p>
        <p>
          The bar graphs also tend to decrease in height when there is more data per column, and the heat maps tend to fade (try Hexb, without
        log scaling, and slowly increase values while while observing the left side of the plot). Because our data is sparse, averaging tends to skew values towards zero. When we have very large data sets, this can even mask non-zero values, although log-scaling the vertical axis helps a bit here.
          </p>
        <p>
          <i>(Aside from using a log-scale, there are more sophisticated alternatives to averaging that can help as well, like <a href='https://skemman.is/handle/1946/15343'>Steinarsson's Largest Triangle Three Buckets algorithm</a>, but they have their own trade-offs)</i>
        </p>
        <h2>How flame maps attempt to address these issues</h2>
        <p>The aforementioned problems are simplified examples of the problems highlighted by <a href='https://en.wikipedia.org/wiki/Anscombe%27s_quartet'>Anscombe's Quartet</a>, or the more recent <a href='https://www.autodeskresearch.com/publications/samestats'>'Datasaurus Dozen'</a> by Matejka and Fitzmaurice. Like the graphs in these papers, the most straight-forward solution would be directly representing the raw data being grouped.
        </p>
        <h3>Construction</h3>
        <p>
          Similar to how we use bar graphs and heat maps, flame maps group the input data in order, and as evenly as possible across the available columns. However, instead of averaging these values, each column sorts their values, and plots them a vertical heat map (if we have only one data point per column, the result is effectively a regular heat map). The typical look of the plotted gradients gives the flame map its name.
        </p>
        <p>
          So in our original scRNAseq context, cells (samples) are ordered along the x-axis according to clustering algorithm. Each column represents groups of either <i>n</i> or <i>n-1</i> cells, where <i>n</i> is total cells divided by total columns, rounded up. The y-axis counts the occurrences of cells with an gene expression given by the colour.
        </p>
        <h3>Construction example</h3>
        <p>
          Let's walk through an example construction step by step. We will take {this.introSetAmountLink(100, 'the first hundred values')} of Meg3 as our example data, which has the following values:
        </p>
        <pre>{`
[
   0,  4,  4,  0,  4,  4,  1,  2,  0,  0,
   0,  0,  0,  0,  1,  0,  5, 10,  0,  0,
   1,  1,  0,  1,  0,  0,  0,  0,  0,  1,
   0,  0,  0,  0,  0,  0,  0,  0,  3,  0,
   0,  0,  0,  0,  0,  0,  0,  3,  2,  0,
   1,  1,  0,  2,  3,  1,  0,  2,  2,  0,
   6,  4,  2,  8,  8,  2,  0,  5,  1,  4,
   3,  4,  3,  0,  4,  5,  3,  0,  3,  0,
   1,  0,  0,  3,  0,  2,  5,  1,  0,  3,
   1,  3,  0,  0,  0,  0,  4,  2,  3,  1,
     /* rest of the data */
]`}
        </pre>
        <p>
          Lets say that our plot settings works out to grouping ten data points per column:
          <br/>(in our opening plot this would be {this.introSetAmountLink(2000, 'showing the first 2000 elements')})
        </p>
        <pre>{`
[
   [0,  4,  4,  0,  4,  4,  1,  2,  0,  0],
   [0,  0,  0,  0,  1,  0,  5, 10,  0,  0],
   [1,  1,  0,  1,  0,  0,  0,  0,  0,  1],
   [0,  0,  0,  0,  0,  0,  0,  0,  3,  0],
   [0,  0,  0,  0,  0,  0,  0,  3,  2,  0],
   [1,  1,  0,  2,  3,  1,  0,  2,  2,  0],
   [6,  4,  2,  8,  8,  2,  0,  5,  1,  4],
   [3,  4,  3,  0,  4,  5,  3,  0,  3,  0],
   [1,  0,  0,  3,  0,  2,  5,  1,  0,  3],
   [1,  3,  0,  0,  0,  0,  4,  2,  3,  1],
      /* rest of the data */
]`}
        </pre>
        <p>
          The values in the groups are then sorted:
        </p>
        <pre>{`
[
   [0,  0,  0,  0,  1,  2,  4,  4,  4,  4],
   [0,  0,  0,  0,  0,  0,  0,  1,  5, 10],
   [0,  0,  0,  0,  0,  0,  1,  1,  1,  1],
   [0,  0,  0,  0,  0,  0,  0,  0,  0,  3],
   [0,  0,  0,  0,  0,  0,  0,  0,  2,  3],
   [0,  0,  0,  1,  1,  1,  2,  2,  2,  3],
   [0,  1,  2,  2,  4,  4,  5,  6,  8,  8],
   [0,  0,  0,  3,  3,  3,  3,  4,  4,  5],
   [0,  0,  0,  0,  1,  1,  2,  3,  3,  5],
   [0,  0,  0,  0,  1,  1,  2,  3,  3,  4],
     /* rest of the data */
]`}
        </pre>
        <p>
          And plotted top to bottom: (replacing zeros with dots here, for ease of reading)
        </p>
        <pre>{`
    .  .  .  .  .   .  .  .  .  .
    .  .  .  .  .   .  1  .  .  .
    .  .  .  .  .   .  2  .  .  .
    .  .  .  .  .   1  2  3  .  .
    1  .  .  .  .   1  4  3  1  1
    2  .  .  .  .   1  4  3  1  1
    4  .  1  .  .   2  5  3  2  2
    4  1  1  .  .   2  6  4  3  3
    4  5  1  .  2   2  8  4  3  3
    4 10  1  3  3   3  8  5  5  4 ...
`}
        </pre>
        <p>
          The actual resulting plot looks like this:
        </p>
        <div style={{ maxWidth: 200 }}>
          <ConstructionDemo />
        </div>
        <p>
          As mentioned, the same shape can be seen in the introduction plot above when {this.introSetAmountLink(2000, 'set to 2000 elements')}.
        </p>
        <h3>Using more space and colour dimensions</h3>
        <p>
          Heat maps (as used here) only use horizontal position and colour, and bar graphs use horizontal position and height (colours are usually limited to grouping clusters by category). Flame maps use width, height and colour to indicate different things, effectively having one extra "dimension" at their disposal to communicate information.
        </p>
        <p>
          <b>In a flame map, the "height" of a column shows the count of non-zero values in that column. The gradient of the column gives an impression of the actual values</b> (height is fixed at the biggest column size, and for groups with less data a grey block signals the missing element).
        </p>
        <p>
          For example, when plotting between {this.introSetAmountLink(201)} and {this.introSetAmountLink(400)} cells in the example above, we can immediately see when we are grouping two values or one, and what their separate values are. Meg3 is another good example of where this adds information: there is a chunk where nearly all cells are non-zero, but expression level varies. This could not be discerned on the heat map or bar graph.
        </p>
        <p>
          Even when we have more data per column than vertical pixels, and are therefore forced to average data per pixel, this is less of a problem than before: because the data is sorted, the values being averaged are likely to be (nearly) the same value.
        </p>
        <h3>Dealing with very sparse data</h3>
        <p>
          Sometimes the data is so sparse that only the bottom tile of a flame map column contains non-zero values. If our columns are only two to four data points high ({this.introSetAmountLink(400)}, {this.introSetAmountLink(600)} and {this.introSetAmountLink(800)} cells in the above demo), these are still readable, but when the data-to-pixel ratio is bigger, we end up with our sparse-data averaging problem again.
        </p>
        <p>For example, in the small multiple that opened the article, each cell has only one or two pixels. With sparse data, this makes non-zero values hard to spot.
        </p>
        <p>
          To compensate for this, flame maps default to adding a thin strip below the main plot, that shows the maximum value of the column above it. These are separated by a grey line, to avoid confusing this with a higher number of expressed cells:
        </p>
        {
          showIcicle ? (
            <SplashIcicle
              key='emphNZ_icicle'
              width={70}
              pixelScale={1}
              settings={{ logScale: true, emphasizeNonZero: splashEmphNZ }} />
          ) : (
              <SplashFlame
                key='emphNZ_flame'
                width={70}
                pixelScale={1}
                settings={{ logScale: true, emphasizeNonZero: splashEmphNZ }} />
            )
        }
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          <label style={{ flex: 150, margin: '10px 25px 10px 25px' }}>
            <Checkbox
              defaultChecked={1}
              checked={splashEmphNZ ? 1 : 0}
              onChange={this.handleEmphNZ} />
            <span>&nbsp;emphasize non-zero</span>
          </label>
          <button
            style={{ flex: 150, margin: '10px 25px 10px 25px' }}
            onClick={this.handleIcicle}>
            {showIcicle ? <span>Flame/<b>Icicle</b></span> : <span><b>Flame</b>/Icicle</span>}
          </button>
        </div>
        <p>
          For very sparse data, the extra strip makes the presence of non-zero values stand out.
        </p>
        <h2>Caveats of using flame maps</h2>
        <p>
          We do not want to suggest that flame maps are a drop-in replacement for bar graphs and heatmaps. They have their own trade-offs and potential issues.
        </p>
        <h3>Simpler alternatives</h3>
        <p>
          Even when showing sparsity and preventing deceptive averages is important, there might be simpler alternatives. When that is <i>all</i> that we want to know, we can also sort the data as a whole, instead of per column, which is an easier to interpret visual solution:
        </p>
        <SortedPlots />
        <p>
          However, when the order of data matters this is not an option. In our case, we want to compare clusters of cells, so regardless of which order we choose, it has to stay constant across plots.
        </p>
        <h3>Aliasing</h3>
        <p>
          Grouping data inherently makes it susceptible to <a href='https://en.wikipedia.org/wiki/Aliasing'>aliasing issues</a>. Below is an interactive that demonstrate this the effects. The data alternates between one and zero. Tweak the values of how quickly it alternates, with which offset, and with which plotsettings, to explore the aliasing issues that can arise:
        </p>
        <AliasingPlots />
        <p>
          As can be seen, the data only really makes sense when we zoom in far enough that each cell is plotted separately. However, bar graphs and heat maps perform just as poorly.
        </p>
        <p>
          The cause of the problem is not really the type of plot being used. If something like this would show up in a real data set, the problem is likely either the choice of algorithm that lead to said ordering, or the data itself.
        </p>
        <p>
          The point however is that, unlike the issues caused by sparsity or averaging, flame maps are just as susceptible to this as bar graphs and heat maps.
        </p>
        <h3>Imprecision of colour comparisons</h3>
        <p>If we want to determine how much two values differ, human perception is less precise when comparing colours than when comparing sizes. Ignoring the aforementioned issues with averaging, flame maps and heat maps both have a disadvantage over bar graphs here.
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
          <li>discern whether grouped data contain many low values, or a few high values</li>
          <li>discern the ratio zero to non-zero values</li>
          <li>spot the presence of non-zero values when data is extremely sparse</li>
        </ul>
        <p>In situations where these are desired properties, and a very precise distinction between high and low values is not required, we think they will provide advantages.</p>
        <p>
          They are, in our opinion, very simple to construct, to the point where we are still not sure if they are really novel or if we simply have not looked hard enough. If they do already exist under another name, and with implementations in major plotting packages, please let us know. It would make the people in our group very happy (see below).
        </p>
        <h2>Implementations</h2>
        <p><i>
          I'll switch to first person here, because this is a WIP. For now, this website is the only implementation. Sorry. The source code for it can be found at:
          </i></p>
        <p><a href='https://github.com/linnarsson-lab/flamemaps'>
          https://github.com/linnarsson-lab/flamemaps
        </a></p>
        <p><i>
          Flame maps were created for a for-now in-house web app. For performance reasons they were implemented in raw javascript and html5 canvas (not even a framework like d3.js was used). This demo page is based on repurposed plotting code from this web app. I do not know PyPlot, R or any other plotting library really, and currently don't have the time it would take to learn them well enough to implement these plots efficiently. So I figured it made more sense to write a convincing demonstration page and hope that  others will agree these plots are useful, in the hope that the various plotting library wizards out there take over from there. And then Gioele can stop wishing I'll learn how to use PyPlot to implement this for him - Job van der Zwan
          </i></p>
        <h2>Interactive Demos</h2>
        <Demos />
        <h2>Acknowledgements</h2>
        <p>
          The author would like to thank the whole <a href='http://linnarssonlab.org/people/'>Linnarsson Lab group</a> for early feedback on these plots, and Sten Linnarsson in particular for being given the creative freedom to explore this side-project. We thank <a href='https://twitter.com/xangregg'>Xan Gregg</a> for suggesting the Icicle Plot variant. Finally, we thank <a href='http://www.iysik.com/'>Stefan Hoj-Edwards</a> at The Roslin Institute, University of Edinburgh, for discussions that helped tremendously with finding and correcting sloppy wording and confusing descriptions.
        </p>
      </article>
    );
  }
}

export default App;
