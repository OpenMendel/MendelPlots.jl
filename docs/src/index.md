
# MendelPlots.jl

MendelPlots.jl is a Julia package for creating plots for genome-wide association studies (GWAS) results. The package can currently create Manhattan Plots and QQ Plots for GWAS data, specifically catered to the data files created from [*OpenMendel*](https://github.com/OpenMendel) software packages [MendelGWAS](https://github.com/OpenMendel/MendelGWAS.jl) and [PolrGWAS](https://github.com/OpenMendel/PolrGWAS.jl). The input needed is a dataframe (see [DataFrames.jl](https://github.com/JuliaData/DataFrames.jl) or individual features as arrays.

MendelPlots.jl uses [Gadfly](https://github.com/GiovineItalia/Gadfly.jl) as the backend for plotting and saves the plots as .png files. 


# Installation
This package requires Julia v0.7.0 or later. The package has not yet been registered and must be installed using the repository location. Start julia and use the ] key to switch to the package manager REPL and proceed as follows:
```julia
(v1.0) pkg> add https://github.com/OpenMendel/MendelPlots.jl.git
```


```julia
# machine information for this tutorial
versioninfo()
```

    Julia Version 1.0.3
    Commit 099e826241 (2018-12-18 01:34 UTC)
    Platform Info:
      OS: macOS (x86_64-apple-darwin14.5.0)
      CPU: Intel(R) Core(TM) i7-4850HQ CPU @ 2.30GHz
      WORD_SIZE: 64
      LIBM: libopenlibm
      LLVM: libLLVM-6.0.0 (ORCJIT, haswell)


For use in this tutorial, we will load the following packages:


```julia
using TextParse, DataFrames, MendelPlots
```

    ┌ Info: Loading Cairo backend into Compose.jl
    └ @ Compose /Users/christophergerman/.julia/packages/Compose/pDFGJ/src/Compose.jl:165
    ┌ Info: Loading DataFrames support into Gadfly.jl
    └ @ Gadfly /Users/christophergerman/.julia/packages/Gadfly/09PWZ/src/mapping.jl:228


## Example dataset

Thee `data` folder of the package in test contains an example simulated data set. In this tutorial, we use relative path `../data`. In general, the user can locate this folder by the following command:
```julia
import MendelPlots
joinpath(dirname(pathof(MendelPlots)), "../test/data")
```


```julia
;ls -l ../test/data
```

    total 832
    -rw-r--r--  1 christophergerman  staff  424332 Jan 24 00:05 gwasresults.txt


## Basic usage

The following commands can be used to load the test dataset into a dataframe to be used to create plots. 


```julia
data, colnames = csvread("../test/data/gwasresults.txt", ',', header_exists = true)
df = DataFrame([i for i in data], Symbol.(colnames))
```




<table class="data-frame"><thead><tr><th></th><th>pval</th><th>chr</th><th>pos</th></tr><tr><th></th><th>Float64</th><th>Int64</th><th>Int64</th></tr></thead><tbody><p>16,500 rows × 3 columns</p><tr><th>1</th><td>0.434119</td><td>1</td><td>1</td></tr><tr><th>2</th><td>0.61908</td><td>1</td><td>2</td></tr><tr><th>3</th><td>0.909921</td><td>1</td><td>3</td></tr><tr><th>4</th><td>0.0419107</td><td>1</td><td>4</td></tr><tr><th>5</th><td>0.344776</td><td>1</td><td>5</td></tr><tr><th>6</th><td>0.308763</td><td>1</td><td>6</td></tr><tr><th>7</th><td>0.687524</td><td>1</td><td>7</td></tr><tr><th>8</th><td>0.0716104</td><td>1</td><td>8</td></tr><tr><th>9</th><td>0.882899</td><td>1</td><td>9</td></tr><tr><th>10</th><td>0.762597</td><td>1</td><td>10</td></tr><tr><th>11</th><td>0.824667</td><td>1</td><td>11</td></tr><tr><th>12</th><td>0.521365</td><td>1</td><td>12</td></tr><tr><th>13</th><td>0.95395</td><td>1</td><td>13</td></tr><tr><th>14</th><td>0.491313</td><td>1</td><td>14</td></tr><tr><th>15</th><td>0.274445</td><td>1</td><td>15</td></tr><tr><th>16</th><td>0.0133856</td><td>1</td><td>16</td></tr><tr><th>17</th><td>0.990837</td><td>1</td><td>17</td></tr><tr><th>18</th><td>0.782683</td><td>1</td><td>18</td></tr><tr><th>19</th><td>0.206984</td><td>1</td><td>19</td></tr><tr><th>20</th><td>0.0443713</td><td>1</td><td>20</td></tr><tr><th>21</th><td>0.735768</td><td>1</td><td>21</td></tr><tr><th>22</th><td>0.336091</td><td>1</td><td>22</td></tr><tr><th>23</th><td>0.810657</td><td>1</td><td>23</td></tr><tr><th>24</th><td>0.593453</td><td>1</td><td>24</td></tr><tr><th>25</th><td>0.933379</td><td>1</td><td>25</td></tr><tr><th>26</th><td>0.867928</td><td>1</td><td>26</td></tr><tr><th>27</th><td>0.139833</td><td>1</td><td>27</td></tr><tr><th>28</th><td>0.0694416</td><td>1</td><td>28</td></tr><tr><th>29</th><td>0.228683</td><td>1</td><td>29</td></tr><tr><th>30</th><td>0.0627061</td><td>1</td><td>30</td></tr><tr><th>&vellip;</th><td>&vellip;</td><td>&vellip;</td><td>&vellip;</td></tr></tbody></table>



The basic commands for MendelPlots.jl are 
    
```julia
qq()
manhattan()
``` 

The following command creates a qq plot from the data


```julia
qq(df)
```

<img src="../qqplot.png">

For documentation of the `qq` function, type `?qq` in Julia REPL.
```@docs
qq
```

The following command creates a manhattan plot from the data


```julia
manhattan(df)
```

<img src="../manhattan.png">

For documentation of the `manhattan` function, type `?manhattan` in Julia REPL.
```@docs
manhattan
```

### Necessary Inputs

`qq` expects either an DataFrame object input or an array of pvalues as an input. If a DataFrame is the input, the pvalues must be stored under the name pval.  

`manhattan` expects either an DataFrame object input or an array of pvalues and an array of chromosome IDs as an input. If a DataFrame is the input, the pvalues must be stored under the name `pval`.  The chromosomes and pvalues must correspond in order to each other, and must be ordered in according to ascending basepairs. The chromosome variable must be named `chr`. Optionally, if you have basepair location information in your DataFrame, the position variable must be named `pos`, but the basepair position isn't required to create a plot. 

### Additional Options

There are several other options that the `qq` and `manhattan` functions take, refer to the specific documentation for each function via the `?` command to see the option names. Current options include arguments for qq line color, qq dot color, maximum x and y values, dpi, significance line y-value, significance line color, and title. 

### Output files

`qq` outputs a .png file of the QQ plot. By default, it will be named qqplot.png. Use the keyword argument 'outfile' to change the output file name.

`manhattan` outputs a .png file of the Manhattan plot. By default, it will be named manhattan.png. Use the keyword argument 'outfile' to change the output file name.

You can utilize more options to create a more customized plot. 


```julia
qq(df[:pval]; xlabel = "Expected", ylabel = "Observed", 
    titles = "", outfile = "testqq.png", dotcolor = "gray", 
    fontsize = 20pt, linecolor = "blue")
```

<img src="../testqq.png">
