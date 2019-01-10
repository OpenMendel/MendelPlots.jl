
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

`data` folder of the package in test an example data set. In this tutorial, we use relative path `../data`. In general, user can locate this folder by command
```julia
import MendelPlots
joinpath(dirname(pathof(MendelPlots)), "../test/data")
```


```julia
;ls -l ../test/data
```

    total 1648
    -rw-r--r--+ 1 christophergerman  staff  842365 Jan  8 18:04 polrgwas.scoretest.txt


## Basic usage

The following commands can be used to load the test dataset into a dataframe to be used to create plots. 


```julia
data, colnames = csvread("../test/data/polrgwas.scoretest.txt", ',', header_exists = true)
df = DataFrame([i for i in data], Symbol.(colnames))
```




<table class="data-frame"><thead><tr><th></th><th>chr</th><th>pos</th><th>snpid</th><th>maf</th><th>pval</th></tr><tr><th></th><th>Int64</th><th>Int64</th><th>String</th><th>Float64</th><th>Float64</th></tr></thead><tbody><p>13,928 rows × 5 columns</p><tr><th>1</th><td>1</td><td>554484</td><td>rs10458597</td><td>0.0</td><td>1.0</td></tr><tr><th>2</th><td>1</td><td>758311</td><td>rs12562034</td><td>0.0776398</td><td>0.00456531</td></tr><tr><th>3</th><td>1</td><td>967643</td><td>rs2710875</td><td>0.324074</td><td>3.10828e-5</td></tr><tr><th>4</th><td>1</td><td>1168108</td><td>rs11260566</td><td>0.191589</td><td>1.21687e-5</td></tr><tr><th>5</th><td>1</td><td>1375074</td><td>rs1312568</td><td>0.441358</td><td>0.00820686</td></tr><tr><th>6</th><td>1</td><td>1588771</td><td>rs35154105</td><td>0.0</td><td>1.0</td></tr><tr><th>7</th><td>1</td><td>1789051</td><td>rs16824508</td><td>0.00462963</td><td>0.511198</td></tr><tr><th>8</th><td>1</td><td>1990452</td><td>rs2678939</td><td>0.453704</td><td>0.299728</td></tr><tr><th>9</th><td>1</td><td>2194615</td><td>rs7553178</td><td>0.226852</td><td>0.171333</td></tr><tr><th>10</th><td>1</td><td>2396747</td><td>rs13376356</td><td>0.14486</td><td>0.532042</td></tr><tr><th>11</th><td>1</td><td>2623158</td><td>rs28753913</td><td>0.0</td><td>1.0</td></tr><tr><th>12</th><td>1</td><td>2823603</td><td>rs1563468</td><td>0.483025</td><td>0.225191</td></tr><tr><th>13</th><td>1</td><td>3025087</td><td>rs6690373</td><td>0.25387</td><td>0.701847</td></tr><tr><th>14</th><td>1</td><td>3225416</td><td>rs12043519</td><td>0.029321</td><td>0.00107978</td></tr><tr><th>15</th><td>1</td><td>3431124</td><td>rs12093117</td><td>0.109907</td><td>0.427794</td></tr><tr><th>16</th><td>1</td><td>3633945</td><td>rs10910017</td><td>0.221875</td><td>0.913129</td></tr><tr><th>17</th><td>1</td><td>3895935</td><td>rs34770924</td><td>0.0246914</td><td>0.999021</td></tr><tr><th>18</th><td>1</td><td>4096895</td><td>rs6702633</td><td>0.475232</td><td>0.00651631</td></tr><tr><th>19</th><td>1</td><td>4297388</td><td>rs684965</td><td>0.305556</td><td>0.0951953</td></tr><tr><th>20</th><td>1</td><td>4498133</td><td>rs11809295</td><td>0.0993789</td><td>0.0832435</td></tr><tr><th>21</th><td>1</td><td>4698713</td><td>rs578528</td><td>0.324074</td><td>0.0692307</td></tr><tr><th>22</th><td>1</td><td>4899946</td><td>rs4654471</td><td>0.358025</td><td>0.224531</td></tr><tr><th>23</th><td>1</td><td>5100369</td><td>rs6681148</td><td>0.131579</td><td>0.155667</td></tr><tr><th>24</th><td>1</td><td>5302730</td><td>rs10799197</td><td>0.428793</td><td>0.669055</td></tr><tr><th>25</th><td>1</td><td>5502779</td><td>rs10796400</td><td>0.231481</td><td>0.241525</td></tr><tr><th>26</th><td>1</td><td>5703284</td><td>rs2244632</td><td>0.394737</td><td>0.53453</td></tr><tr><th>27</th><td>1</td><td>5904631</td><td>rs7549324</td><td>0.367284</td><td>0.716133</td></tr><tr><th>28</th><td>1</td><td>6106513</td><td>rs2843494</td><td>0.0648148</td><td>0.365573</td></tr><tr><th>29</th><td>1</td><td>6310159</td><td>rs4908880</td><td>0.0555556</td><td>0.579307</td></tr><tr><th>30</th><td>1</td><td>6514524</td><td>rs932112</td><td>0.220679</td><td>0.303095</td></tr><tr><th>&vellip;</th><td>&vellip;</td><td>&vellip;</td><td>&vellip;</td><td>&vellip;</td><td>&vellip;</td></tr></tbody></table>



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

`manhattan` expects either an DataFrame object input or an array of pvalues and an array of chromosome IDs as an input. If a DataFrame is the input, the pvalues must be stored under the name pval.  The chromosomes and pvalues must correspond in order to each other, and must be ordered in according to ascending basepairs. 

### Additional Options

There are several other options that the `qq` and `manhattan` functions take, refer to the specific documentation for each function via the `?` command to see the option names. Current options include arguments for qq line color, maximum x and y values, dpi, significance line y-value, significance line color, and title. 

### Output files

`qq` outputs a .png file of the QQ plot. By default, it will be named qqplot.png. Use the keyword argument 'outfile' to change the output file name.

`manhattan` outputs a .png file of the Manhattan plot. By default, it will be named manhattan.png. Use the keyword argument 'outfile' to change the output file name.
