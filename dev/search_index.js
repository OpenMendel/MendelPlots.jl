var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "MendelPlots.jl",
    "title": "MendelPlots.jl",
    "category": "page",
    "text": ""
},

{
    "location": "#MendelPlots.jl-1",
    "page": "MendelPlots.jl",
    "title": "MendelPlots.jl",
    "category": "section",
    "text": "MendelPlots.jl is a Julia package for creating plots for genome-wide association studies (GWAS) results. The package can currently create Manhattan Plots and QQ Plots for GWAS data, specifically catered to the data files created from OpenMendel software packages MendelGWAS and PolrGWAS. The input needed is a dataframe (see DataFrames.jl) or individual features as arrays.MendelPlots.jl uses Gadfly as the backend for plotting and saves the plots as .png files. "
},

{
    "location": "#Installation-1",
    "page": "MendelPlots.jl",
    "title": "Installation",
    "category": "section",
    "text": "This package requires Julia v0.7.0 or later. The package has not yet been registered and must be installed using the repository location. Start julia and use the ] key to switch to the package manager REPL and proceed as follows:(v1.0) pkg> add https://github.com/OpenMendel/MendelPlots.jl.git# machine information for this tutorial\nversioninfo()Julia Version 1.0.3\nCommit 099e826241 (2018-12-18 01:34 UTC)\nPlatform Info:\n  OS: macOS (x86_64-apple-darwin14.5.0)\n  CPU: Intel(R) Core(TM) i7-4850HQ CPU @ 2.30GHz\n  WORD_SIZE: 64\n  LIBM: libopenlibm\n  LLVM: libLLVM-6.0.0 (ORCJIT, haswell)For use in this tutorial, we will load the following packages:using TextParse, DataFrames, MendelPlots┌ Info: Loading Cairo backend into Compose.jl\n└ @ Compose /Users/christophergerman/.julia/packages/Compose/pDFGJ/src/Compose.jl:165\n┌ Info: Loading DataFrames support into Gadfly.jl\n└ @ Gadfly /Users/christophergerman/.julia/packages/Gadfly/09PWZ/src/mapping.jl:228"
},

{
    "location": "#Example-dataset-1",
    "page": "MendelPlots.jl",
    "title": "Example dataset",
    "category": "section",
    "text": "The data folder of the package in test contains an example simulated data set. In this tutorial, we use relative path ../data. In general, the user can locate this folder by the following command:import MendelPlots\njoinpath(dirname(pathof(MendelPlots)), \"../test/data\");ls -l ../test/datatotal 832\n-rw-r--r--  1 christophergerman  staff  424332 Jan 24 00:05 gwasresults.txt"
},

{
    "location": "#Basic-usage-1",
    "page": "MendelPlots.jl",
    "title": "Basic usage",
    "category": "section",
    "text": "The following commands can be used to load the test dataset into a dataframe to be used to create plots. data, colnames = csvread(\"../test/data/gwasresults.txt\", \',\', header_exists = true)\ndf = DataFrame([i for i in data], Symbol.(colnames))<table class=\"data-frame\"><thead><tr><th></th><th>pval</th><th>chr</th><th>pos</th></tr><tr><th></th><th>Float64</th><th>Int64</th><th>Int64</th></tr></thead><tbody><p>16,500 rows × 3 columns</p><tr><th>1</th><td>0.434119</td><td>1</td><td>1</td></tr><tr><th>2</th><td>0.61908</td><td>1</td><td>2</td></tr><tr><th>3</th><td>0.909921</td><td>1</td><td>3</td></tr><tr><th>4</th><td>0.0419107</td><td>1</td><td>4</td></tr><tr><th>5</th><td>0.344776</td><td>1</td><td>5</td></tr><tr><th>6</th><td>0.308763</td><td>1</td><td>6</td></tr><tr><th>7</th><td>0.687524</td><td>1</td><td>7</td></tr><tr><th>8</th><td>0.0716104</td><td>1</td><td>8</td></tr><tr><th>9</th><td>0.882899</td><td>1</td><td>9</td></tr><tr><th>10</th><td>0.762597</td><td>1</td><td>10</td></tr><tr><th>11</th><td>0.824667</td><td>1</td><td>11</td></tr><tr><th>12</th><td>0.521365</td><td>1</td><td>12</td></tr><tr><th>13</th><td>0.95395</td><td>1</td><td>13</td></tr><tr><th>14</th><td>0.491313</td><td>1</td><td>14</td></tr><tr><th>15</th><td>0.274445</td><td>1</td><td>15</td></tr><tr><th>16</th><td>0.0133856</td><td>1</td><td>16</td></tr><tr><th>17</th><td>0.990837</td><td>1</td><td>17</td></tr><tr><th>18</th><td>0.782683</td><td>1</td><td>18</td></tr><tr><th>19</th><td>0.206984</td><td>1</td><td>19</td></tr><tr><th>20</th><td>0.0443713</td><td>1</td><td>20</td></tr><tr><th>21</th><td>0.735768</td><td>1</td><td>21</td></tr><tr><th>22</th><td>0.336091</td><td>1</td><td>22</td></tr><tr><th>23</th><td>0.810657</td><td>1</td><td>23</td></tr><tr><th>24</th><td>0.593453</td><td>1</td><td>24</td></tr><tr><th>25</th><td>0.933379</td><td>1</td><td>25</td></tr><tr><th>26</th><td>0.867928</td><td>1</td><td>26</td></tr><tr><th>27</th><td>0.139833</td><td>1</td><td>27</td></tr><tr><th>28</th><td>0.0694416</td><td>1</td><td>28</td></tr><tr><th>29</th><td>0.228683</td><td>1</td><td>29</td></tr><tr><th>30</th><td>0.0627061</td><td>1</td><td>30</td></tr><tr><th>&vellip;</th><td>&vellip;</td><td>&vellip;</td><td>&vellip;</td></tr></tbody></table>The basic commands for MendelPlots.jl are qq()\nmanhattan()"
},

{
    "location": "#MendelPlots.qq",
    "page": "MendelPlots.jl",
    "title": "MendelPlots.qq",
    "category": "function",
    "text": "qq(pvalues::AbstractArray)\n\nPosition arguments\n\npvalues::AbstractArray: pvalues. A one dimensional array containing pvalues to be used in the qqplot.\nqq(df::DataFrame)\n\nPosition arguments\n\ndf::DataFrame: DataFrame containing pvalues to be used in the qqplot. Note: The column of the dataframe\n\nthat indicates pvalues must be named pval (df[:pval] must exist)\n\nKeyword arguments\n\ntitles::AbstractString: Title for the plot. Default is \"QQ Plot of GWAS p-values\".\n\nTo have blank enter \"\". \n\noutfile::AbstractString: output name to save the QQplot. Name should end in format.\n\nDefault is \"qqplot.png\". Supports .png, .pdf, and .svg files. \n\ndpi::Union{Float64, Int64}: dots per inch to save the png file. Higher DPI results in larger file with \n\nhigher resolution. Default dpi is 350.\n\nxlabel::AbstractString: option to replace x-label text\nylabel::AbstractString: option to replace y-label text\nxmin::Union{Float64, Int64}: Specified minimum x value to represent on the plot\nxmax::Union{Float64, Int64}: Specified maximum x value to represent on the plot\nymin::Union{Float64, Int64}: Specified minimum y value to represent on the plot\nymax::Union{Float64, Int64}: Specified maximum y value to represent on the plot\nlinecolor::AbstractString: Color of \"normal\" line. Default color is \"red\". \ndotcolor::AbstractString: Color of the dots. Default color is \"black\". \nfontsize size of the axis labels. Default is \"15pt\". \npvalvar variable indicating pvalue column name (for dataframes only). Default is \"pval\". \n\n\n\n\n\n"
},

{
    "location": "#QQ-Plots-1",
    "page": "MendelPlots.jl",
    "title": "QQ Plots",
    "category": "section",
    "text": "The following command creates a qq plot from the dataqq(df)display(\"image/png\", read(\"qqplot.png\"))(Image: png)For documentation of the qq function, type ?qq in Julia REPL.qq"
},

{
    "location": "#MendelPlots.manhattan",
    "page": "MendelPlots.jl",
    "title": "MendelPlots.manhattan",
    "category": "function",
    "text": "manhattan(data::DataFrame)\n\nPosition arguments\n\ndata::DataFrame: A DataFrame containing information to be used in the Manhattan Plot. \n\nNote, DataFrame must have the following values saved under the corresponding names.  pvalues:pval, chromosome:chr. Additionally, the DataFrame must be in order of basepairs  going from first to last if there\'s no position arguement. Optionally, if there is  basepair information, then the position variable must be named pos. \n\nmanhattan(pvalues::AbstractArray, chr::AbstractArray)\n\nPosition arguments\n\npvalues::AbstractArray: pvalues for the associated GWAS. Must be in the \n\norder of the basepairs. \n\nchr::AbstractArray: An array of chromosome identifiers for each pvalue. \n\nMust match order with pvalues. \n\nmanhattan(pvalues::AbstractArray, chr::AbstractArray, pos::AbstractArray)\n\nPosition arguments\n\npvalues::AbstractArray: pvalues for the associated GWAS. \n\nMust be in the same order of the basepairs and chromosomes. \n\nchr::AbstractArray: An array of chromosome identifiers for each pvalue. \n\nMust match order with pvalues and positions. \n\npos::AbstractArray: An array of basepair positions for each pvalue/chromosome. \n\nMust match order with pvalues and chromosomes. \n\nKeyword arguments\n\ntitles::AbstractString: Title for the plot. Default is \"Manhattan Plot\".\n\nTo have blank enter \"\". \n\noutfile::AbstractString: output name to save the manhattan plot. Name should end in format.\n\nDefault is \"manhattan.png\". Supports .png, .pdf, and .svg files. \n\ndpi::Int64: dots per inch to save the png file. Higher DPI results in \n\nlarger file with higher resolution. Default dpi is 350.\n\nxlabel::AbstractString: option to replace x-label text\nylabel::AbstractString: option to replace y-label text\nymax::Union{Float64, Int64}: Specified maximum y value to represent \n\non the plot\n\nsignifline::Union{Float64, Int64}: Line to draw significance at. \n\nDefault in Bonferonni corrected p-value for α = 0.05. \n\nlinecolor::AbstractString: Color for significance line. Default \n\nis \'deepskyblue1\'. \n\nfontsize size of the axis labels. Default is \"15pt\". \npvalvar variable indicating pvalue column name (for dataframes only). Default is \"pval\". \nchrvar variable indicating chromosome column name (for dataframes only). Default is \"chr\". \nposvar variable indicating BP position column name (for dataframes only). Default is \"pos\". \n\n\n\n\n\n"
},

{
    "location": "#Manhattan-Plots-1",
    "page": "MendelPlots.jl",
    "title": "Manhattan Plots",
    "category": "section",
    "text": "The following command creates a manhattan plot from the datamanhattan(df)display(\"image/png\", read(\"manhattan.png\"))(Image: png)For documentation of the manhattan function, type ?manhattan in Julia REPL.manhattan"
},

{
    "location": "#Necessary-Inputs-1",
    "page": "MendelPlots.jl",
    "title": "Necessary Inputs",
    "category": "section",
    "text": "qq expects either an DataFrame object input or an array of pvalues as an input. If a DataFrame is the input, the pvalues either must be stored under the name pval or you must use the pvalvar argument to the specify the variable name in the dataframe that corresponds to pvalue. manhattan expects either an DataFrame object input or an array of pvalues and an array of chromosome IDs as an input. If a DataFrame is the input, the pvalues either must be stored under the name pval or you must use the pvalvar argument to the specify the variable name in the dataframe that corresponds to pvalue. The chromosomes and pvalues must correspond in order to each other, and must be ordered in according to ascending basepairs. The chromosome variable must either be named chr or the chromosome variable name must be specified using the chrvar argument. Optionally, if you have basepair location information in your DataFrame, the position variable must either be named pos or the BP position variable name must be specified using the posvar argument, but the basepair position isn\'t required to create a create a Manhattan plot. "
},

{
    "location": "#Additional-Options-1",
    "page": "MendelPlots.jl",
    "title": "Additional Options",
    "category": "section",
    "text": "There are several other options that the qq and manhattan functions take, refer to the specific documentation for each function via the ? command to see the option names. Current options include arguments for qq line color, qq dot color, maximum x and y values, dpi, significance line y-value, significance line color, title, fontsize, and dataframe names of pvalues, chromosomes, and BP positions in your input dataframe. You can utilize more options to create a more customized plot. qq(df[:pval]; xlabel = \"Expected\", ylabel = \"Observed\", \n    titles = \"\", outfile = \"testqq.png\", dotcolor = \"gray\", \n    fontsize = 18pt, linecolor = \"blue\")display(\"image/png\", read(\"testqq.png\"))(Image: png)manhattan(df; pvalvar = \"pval\", chrvar = \"chr\", \n    posvar = \"pos\", outfile = \"manhattan2.pdf\", fontsize = 18pt, linecolor = \"red\")"
},

{
    "location": "#Saving-Files-1",
    "page": "MendelPlots.jl",
    "title": "Saving Files",
    "category": "section",
    "text": "qq, by default, outputs a .png named qqplot.png. Use the keyword argument \'outfile\' to change the output file name. It will parse the output file name to ensure that the extension is compatible. Currently, we support .png, .pdf, and .svg files. manhattan by default, outputs a .png named manhattan.png. Use the keyword argument \'outfile\' to change the output file name. It will parse the output file name to ensure that the extension is compatible. Currently, we support .png, .pdf, and .svg files. "
},

]}
