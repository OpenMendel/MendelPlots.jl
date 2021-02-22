# MendelPlots

| **Documentation** | **Build Status** | **Code Coverage**  |  **Citation**  |
|-------------------|------------------|--------------------|--------------------|
| [![](https://img.shields.io/badge/docs-stable-blue.svg)](https://OpenMendel.github.io/MendelPlots.jl/stable) [![](https://img.shields.io/badge/docs-latest-blue.svg)](https://OpenMendel.github.io/MendelPlots.jl/latest) | [![Build Status](https://travis-ci.org/OpenMendel/MendelPlots.jl.svg?branch=master)](https://travis-ci.org/OpenMendel/MendelPlots.jl) | [![Coverage Status](https://coveralls.io/repos/github/OpenMendel/MendelPlots.jl/badge.svg?branch=master)](https://coveralls.io/github/OpenMendel/MendelPlots.jl?branch=master) [![codecov](https://codecov.io/gh/OpenMendel/MendelPlots.jl/branch/master/graph/badge.svg)](https://codecov.io/gh/OpenMendel/MendelPlots.jl) |  [![DOI](https://zenodo.org/badge/161412002.svg)](https://zenodo.org/badge/latestdoi/161412002) |




MendelPlots.jl is a Julia package for generating common plots from results of genome-wide association studies (GWAS). It can currently create Manhattan Plots and QQ Plots. 

**MendelPlots** is a plotting and data visualization system written in [Julia](http://julialang.org/). It uses [Gadfly](https://github.com/GiovineItalia/Gadfly.jl) as the backend, which is influenced by Grammar of Graphics Style programming and Hadley Wickham's [ggplot2](http://ggplot2.org/)

*MendelPlots.jl* is not registered yet. To install the package run:
```{julia}
pkg> add https://github.com/OpenMendel/MendelPlots.jl.git
```

## Citation

If you use [OpenMendel](https://openmendel.github.io) analysis packages in your research, please cite the following reference in the resulting publications:

*Lange K, Papp JC, Sinsheimer JS, Sripracha R, Zhou H, Sobel EM (2013) Mendel: The Swiss army knife of genetic analysis programs. Bioinformatics 29:1568-1570.*


## Package features

- Creates publication quality plots in PNG format


## Contributing and Request Plots

The software is relatively new. [File an
issue](https://github.com/OpenMendel/MendelPlots.jl/issues/new) to report a
bug or request a feature.



<img src="docs/qqplot.png">
<img src="docs/manhattan.png">
<img src="docs/annotated_manhattan.png">
