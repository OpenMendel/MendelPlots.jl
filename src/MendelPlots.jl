__precompile__()

module MendelPlots

using Gadfly, Compose, Statistics, DataFrames, Distributions, Reexport, DataFrames
@reexport Gadfly
import Fontconfig, Cairo

export
    # functions
    qq,
    manhattan,
    ppoints


include("gwasplots.jl")

end # module
