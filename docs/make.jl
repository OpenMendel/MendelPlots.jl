using Documenter, MendelPlots

ENV["DOCUMENTER_DEBUG"] = "true"

makedocs(
    format = :html,
    sitename = "MendelPlots",
    modules = [MendelPlots]
)

deploydocs(
    repo   = "github.com/OpenMendel/MendelPlots.jl.git",
    target = "build"
)