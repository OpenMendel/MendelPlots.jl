var documenterSearchIndex = {"docs":
[{"location":"#MendelPlots.jl","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"","category":"section"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"MendelPlots.jl is a Julia package for creating plots for genome-wide association studies (GWAS) results. The package can currently create Manhattan Plots and QQ Plots for GWAS data, specifically catered to the data files created from OpenMendel software packages MendelGWAS and PolrGWAS. The input needed is a dataframe (see DataFrames.jl) or individual features as arrays.","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"MendelPlots.jl uses Gadfly as the backend for plotting and saves the plots as .png files. ","category":"page"},{"location":"#Installation","page":"MendelPlots.jl","title":"Installation","text":"","category":"section"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"This package requires Julia v0.7.0 or later. The package has not yet been registered and must be installed using the repository location. Start julia and use the ] key to switch to the package manager REPL and proceed as follows:","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"(v1.5) pkg> add https://github.com/OpenMendel/MendelPlots.jl.git","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"# machine information for this tutorial\nversioninfo()","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"Julia Version 1.5.2\nCommit 539f3ce943 (2020-09-23 23:17 UTC)\nPlatform Info:\n  OS: macOS (x86_64-apple-darwin18.7.0)\n  CPU: Intel(R) Core(TM) i7-4850HQ CPU @ 2.30GHz\n  WORD_SIZE: 64\n  LIBM: libopenlibm\n  LLVM: libLLVM-9.0.1 (ORCJIT, haswell)\nEnvironment:\n  JULIA_NUM_THREADS = 4","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"For use in this tutorial, we will load the following packages:","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"using TextParse, DataFrames, MendelPlots","category":"page"},{"location":"#Example-dataset","page":"MendelPlots.jl","title":"Example dataset","text":"","category":"section"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"The data folder of the package in test contains an example simulated data set. In this tutorial, we use relative path ../data. In general, the user can locate this folder by the following command:","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"import MendelPlots\njoinpath(dirname(pathof(MendelPlots)), \"../test/data\")","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":";ls -l ../test/data","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"total 832\n-rw-r--r--  1 christophergerman  staff  424332 Jan 24 00:05 gwasresults.txt","category":"page"},{"location":"#Basic-usage","page":"MendelPlots.jl","title":"Basic usage","text":"","category":"section"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"The following commands can be used to load the test dataset into a dataframe to be used to create plots. ","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"data, colnames = csvread(\"../test/data/gwasresults.txt\", ',', header_exists = true)\ndf = DataFrame([i for i in data], Symbol.(colnames))","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"<table class=\"data-frame\"><thead><tr><th></th><th>pval</th><th>chr</th><th>pos</th><th>gene</th></tr><tr><th></th><th>Float64</th><th>Int64</th><th>Int64</th><th>String</th></tr></thead><tbody><p>16,500 rows × 4 columns</p><tr><th>1</th><td>0.434119</td><td>1</td><td>1</td><td></td></tr><tr><th>2</th><td>0.61908</td><td>1</td><td>2</td><td></td></tr><tr><th>3</th><td>0.909921</td><td>1</td><td>3</td><td></td></tr><tr><th>4</th><td>0.0419107</td><td>1</td><td>4</td><td></td></tr><tr><th>5</th><td>0.344776</td><td>1</td><td>5</td><td></td></tr><tr><th>6</th><td>0.308763</td><td>1</td><td>6</td><td></td></tr><tr><th>7</th><td>0.687524</td><td>1</td><td>7</td><td></td></tr><tr><th>8</th><td>0.0716104</td><td>1</td><td>8</td><td></td></tr><tr><th>9</th><td>0.882899</td><td>1</td><td>9</td><td></td></tr><tr><th>10</th><td>0.762597</td><td>1</td><td>10</td><td></td></tr><tr><th>11</th><td>0.824667</td><td>1</td><td>11</td><td></td></tr><tr><th>12</th><td>0.521365</td><td>1</td><td>12</td><td></td></tr><tr><th>13</th><td>0.95395</td><td>1</td><td>13</td><td></td></tr><tr><th>14</th><td>0.491313</td><td>1</td><td>14</td><td></td></tr><tr><th>15</th><td>0.274445</td><td>1</td><td>15</td><td></td></tr><tr><th>16</th><td>0.0133856</td><td>1</td><td>16</td><td></td></tr><tr><th>17</th><td>0.990837</td><td>1</td><td>17</td><td></td></tr><tr><th>18</th><td>0.782683</td><td>1</td><td>18</td><td></td></tr><tr><th>19</th><td>0.206984</td><td>1</td><td>19</td><td></td></tr><tr><th>20</th><td>0.0443713</td><td>1</td><td>20</td><td></td></tr><tr><th>21</th><td>0.735768</td><td>1</td><td>21</td><td></td></tr><tr><th>22</th><td>0.336091</td><td>1</td><td>22</td><td></td></tr><tr><th>23</th><td>0.810657</td><td>1</td><td>23</td><td></td></tr><tr><th>24</th><td>0.593453</td><td>1</td><td>24</td><td></td></tr><tr><th>25</th><td>0.933379</td><td>1</td><td>25</td><td></td></tr><tr><th>26</th><td>0.867928</td><td>1</td><td>26</td><td></td></tr><tr><th>27</th><td>0.139833</td><td>1</td><td>27</td><td></td></tr><tr><th>28</th><td>0.0694416</td><td>1</td><td>28</td><td></td></tr><tr><th>29</th><td>0.228683</td><td>1</td><td>29</td><td></td></tr><tr><th>30</th><td>0.0627061</td><td>1</td><td>30</td><td></td></tr><tr><th>&vellip;</th><td>&vellip;</td><td>&vellip;</td><td>&vellip;</td><td>&vellip;</td></tr></tbody></table>","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"The basic commands for MendelPlots.jl are ","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"qq()\nmanhattan()","category":"page"},{"location":"#QQ-Plots","page":"MendelPlots.jl","title":"QQ Plots","text":"","category":"section"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"The following command creates a qq plot from the data","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"qq(df)","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"display(\"image/png\", read(\"qqplot.png\"))","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"(Image: png)","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"For documentation of the qq function, type ?qq in Julia REPL.","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"qq","category":"page"},{"location":"#MendelPlots.qq","page":"MendelPlots.jl","title":"MendelPlots.qq","text":"qq(pvalues::AbstractArray)\n\nPosition arguments\n\npvalues::AbstractArray: pvalues. A one dimensional array containing pvalues to be used in the qqplot.\nqq(df::DataFrame)\n\nPosition arguments\n\ndf::DataFrame: DataFrame containing pvalues to be used in the qqplot. Note: The column of the dataframe\n\nthat indicates pvalues must be named pval (df[!, :pval] must exist)\n\nKeyword arguments\n\ntitles::AbstractString: Title for the plot. Default is \"QQ Plot of GWAS p-values\".\n\nTo have blank enter \"\". \n\noutfile::AbstractString: output name to save the QQplot. Name should end in format.\n\nDefault is \"qqplot.png\". Supports .png, .pdf, and .svg files. \n\ndpi::Union{Float64, Int64}: dots per inch to save the png file. Higher DPI results in larger file with \n\nhigher resolution. Default dpi is 350.\n\nxlabel::AbstractString: option to replace x-label text\nylabel::AbstractString: option to replace y-label text\nxmin::Union{Float64, Int64}: Specified minimum x value to represent on the plot\nxmax::Union{Float64, Int64}: Specified maximum x value to represent on the plot\nymin::Union{Float64, Int64}: Specified minimum y value to represent on the plot\nymax::Union{Float64, Int64}: Specified maximum y value to represent on the plot\nlinecolor::AbstractString: Color of \"normal\" line. Default color is \"red\". \ndotcolor::AbstractString: Color of the dots. Default color is \"black\". \nfontsize size of the axis labels. Default is \"15pt\". \npvalvar variable indicating pvalue column name (for dataframes only). Default is \"pval\". \n\n\n\n\n\n","category":"function"},{"location":"#Manhattan-Plots","page":"MendelPlots.jl","title":"Manhattan Plots","text":"","category":"section"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"The following command creates a manhattan plot from the data","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"manhattan(df)","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"display(\"image/png\", read(\"manhattan.png\"))","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"(Image: png)","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"For documentation of the manhattan function, type ?manhattan in Julia REPL.","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"manhattan","category":"page"},{"location":"#MendelPlots.manhattan","page":"MendelPlots.jl","title":"MendelPlots.manhattan","text":"manhattan(data::DataFrame)\n\nPosition arguments\n\ndata::DataFrame: A DataFrame containing information to be used in the Manhattan Plot. \n\nNote, DataFrame must have the following values saved under the corresponding names.  pvalues:pval, chromosome:chr. Additionally, the DataFrame must be in order of basepairs  going from first to last if there's no position arguement. Optionally, if there is  basepair information, then the position variable must be named pos. \n\nmanhattan(pvalues::AbstractArray, chr::AbstractArray)\n\nPosition arguments\n\npvalues::AbstractArray: pvalues for the associated GWAS. Must be in the \n\norder of the basepairs. \n\nchr::AbstractArray: An array of chromosome identifiers for each pvalue. \n\nMust match order with pvalues. \n\nmanhattan(pvalues::AbstractArray, chr::AbstractArray, pos::AbstractArray)\n\nPosition arguments\n\npvalues::AbstractArray: pvalues for the associated GWAS. \n\nMust be in the same order of the basepairs and chromosomes. \n\nchr::AbstractArray: An array of chromosome identifiers for each pvalue. \n\nMust match order with pvalues and positions. \n\npos::AbstractArray: An array of basepair positions for each pvalue/chromosome. \n\nMust match order with pvalues and chromosomes. \n\nKeyword arguments\n\ntitles::AbstractString: Title for the plot. Default is \"Manhattan Plot\".\n\nTo have blank enter \"\". \n\noutfile::AbstractString: output name to save the manhattan plot. Name should end in format.\n\nDefault is \"manhattan.png\". Supports .png, .pdf, and .svg files. \n\ndpi::Int64: dots per inch to save the png file. Higher DPI results in \n\nlarger file with higher resolution. Default dpi is 350.\n\nxlabel::AbstractString: option to replace x-label text\nylabel::AbstractString: option to replace y-label text\nymax::Union{Float64, Int64}: Specified maximum y value to represent \n\non the plot\n\nsignifline::Union{Float64, Int64}: Line to draw significance at. \n\nDefault in Bonferonni corrected p-value for α = 0.05. \n\nlinecolor::AbstractString: Color for significance line. Default \n\nis 'deepskyblue1'. \n\nfontsize size of the axis labels. Default is \"15pt\". \npvalvar variable indicating pvalue column name (for dataframes only). Default is \"pval\". \nchrvar variable indicating chromosome column name (for dataframes only). Default is \"chr\". \nposvar variable indicating BP position column name (for dataframes only). Default is \"pos\". \nannotatevar variable indicating annotation column name (for dataframes only). Default is \"gene\". \nannotateinds indicies of rows to include as annotation for the manhattan plot. Default is nothing. \n\n\n\n\n\n","category":"function"},{"location":"#Necessary-Inputs","page":"MendelPlots.jl","title":"Necessary Inputs","text":"","category":"section"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"qq expects either an DataFrame object input or an array of pvalues as an input. If a DataFrame is the input, the pvalues either must be stored under the name pval or you must use the pvalvar argument to the specify the variable name in the dataframe that corresponds to pvalue. ","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"manhattan expects either an DataFrame object input or an array of pvalues and an array of chromosome IDs as an input. If a DataFrame is the input, the pvalues either must be stored under the name pval or you must use the pvalvar argument to the specify the variable name in the dataframe that corresponds to pvalue. The chromosomes and pvalues must correspond in order to each other, and must be ordered in according to ascending basepairs. The chromosome variable must either be named chr or the chromosome variable name must be specified using the chrvar argument. Optionally, if you have basepair location information in your DataFrame, the position variable must either be named pos or the BP position variable name must be specified using the posvar argument, but the basepair position isn't required to create a create a Manhattan plot. ","category":"page"},{"location":"#Annotated-Genes","page":"MendelPlots.jl","title":"Annotated Genes","text":"","category":"section"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"Gene annotations may be displayed in the Manhattan plot if the information is available in the dataframe object. The annotation variable name can be specified with annotatevar. By default is it assumed to be :gene. The indicies (corresponding to the results dataframe) must be specified for annotations to be applied using the annotateinds option. For example, the top hits are the indicies (4380, 5470, 6722, 7374, 12061, 4936, 14978, 7481), so we can use those to annotate the Manhattan plot with their gene labels.","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"manhattan(df;  \n    annotateinds = [4380\n    5470\n    6722\n    7374\n   12061\n    4936\n   14978\n    7481],\n    titles = \"Annotated Manhattan Plot\", dpi = 300, \n    outfile = \"annotated_manhattan.png\")","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"display(\"image/png\", read(\"annotated_manhattan.png\"))","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"(Image: png)","category":"page"},{"location":"#Additional-Options","page":"MendelPlots.jl","title":"Additional Options","text":"","category":"section"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"There are several other options that the qq and manhattan functions take, refer to the specific documentation for each function via the ? command to see the option names. Current options include arguments for qq line color, qq dot color, maximum x and y values, dpi, significance line y-value, significance line color, title, fontsize, and dataframe names of pvalues, chromosomes, and BP positions in your input dataframe. ","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"You can utilize more options to create a more customized plot. ","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"qq(df[!, :pval]; xlabel = \"Expected\", ylabel = \"Observed\", \n    titles = \"\", outfile = \"testqq.png\", dotcolor = \"gray\", \n    fontsize = 18pt, linecolor = \"blue\")","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"display(\"image/png\", read(\"testqq.png\"))","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"(Image: png)","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"manhattan(df; pvalvar = \"pval\", chrvar = \"chr\", \n    posvar = \"pos\", outfile = \"manhattan2.pdf\", fontsize = 18pt, linecolor = \"red\")","category":"page"},{"location":"#Saving-Files","page":"MendelPlots.jl","title":"Saving Files","text":"","category":"section"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"qq, by default, outputs a .png named qqplot.png. Use the keyword argument 'outfile' to change the output file name. It will parse the output file name to ensure that the extension is compatible. Currently, we support .png, .pdf, and .svg files. ","category":"page"},{"location":"","page":"MendelPlots.jl","title":"MendelPlots.jl","text":"manhattan by default, outputs a .png named manhattan.png. Use the keyword argument 'outfile' to change the output file name. It will parse the output file name to ensure that the extension is compatible. Currently, we support .png, .pdf, and .svg files. ","category":"page"}]
}