using Documenter, MendelPlots

ENV["DOCUMENTER_DEBUG"] = "true"

makedocs(
    format = Documenter.HTML(),
    sitename = "MendelPlots",
    modules = [MendelPlots]
)

deploydocs(
    repo   = "github.com/OpenMendel/MendelPlots.jl.git",
    target = "build"
)