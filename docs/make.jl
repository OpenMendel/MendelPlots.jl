using Documenter, MendelPlots

ENV["DOCUMENTER_DEBUG"] = "true"

makedocs(
    format = :html,
    modules = [MendelPlots],
    clean = false,
    sitename = "MendelPlots.jl",
)

deploydocs(
    repo   = "github.com/OpenMendel/MendelPlots.jl.git",
    target = "build"
)
