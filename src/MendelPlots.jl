__precompile__()

module MendelPlots

using Compose, Statistics, DataFrames, Distributions, Reexport, DataFrames, TextParse
@reexport using Gadfly
import Fontconfig, Cairo

export
    qq,
    manhattan,
    ppoints
    
include("gwasplots.jl")

end
