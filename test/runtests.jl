using Test, MendelPlots, TextParse, DataFrames, Compose, Cairo


const datadir = joinpath(dirname(@__FILE__), "data")
const datafile = datadir * "/gwasresults.txt"
data, colnames = csvread(datafile, ',', header_exists = true)
df = DataFrame([i for i in data], Symbol.(colnames))

@testset "Basic Manhattan Plots (pdf and png)" begin
    @time manhattan(df)
    @time manhattan(df, outfile = "manhattan.pdf")
    @test isfile("manhattan.pdf")
    @test isfile("manhattan.png")
    rm("manhattan.png")
    rm("manhattan.pdf")
end

@testset "Advanced Manhattan Plot" begin
    @time manhattan(df[:pval], df[:chr]; titles = "Manhattan Plot", dpi = 300, 
    ylabel = "expected", xlabel = "observed", outfile = "testmanhat.png",
    ymax = 20, linecolor = "green", signifline = 1e-7)
    @test isfile("testmanhat.png")
    rm("testmanhat.png")
end

@testset "Advanced Manhattan Plot 2" begin
    @time manhattan(df[:pval], df[:chr], df[:pos]; titles = "Manhattan Plot", dpi = 300, 
    ylabel = "expected", xlabel = "observed", outfile = "testmanhat2.png",
    ymax = 20, linecolor = "green", signifline = 1e-7, fontsize = 5pt)
    @test isfile("testmanhat2.png")
    rm("testmanhat2.png")
end

@testset "Basic QQ SVG Plot" begin
    @time qq(df; titles = "QQ Plot", outfile = "qqplot.svg")
    @test isfile("qqplot.svg")
    rm("qqplot.svg")
end

@testset "Advanced QQ Plot" begin
    @time qq(df; titles = "QQ Plot", dpi = 300, outfile = "testqq.png", 
    xmax = 10, xmin = 0, ymin = 1, ymax = 20)
    @test isfile("testqq.png")
    rm("testqq.png")
end



