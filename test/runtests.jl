using Test, MendelPlots, TextParse, DataFrames, Compose, Cairo


const datadir = joinpath(dirname(@__FILE__), "data")
const datafile = datadir * "/gwasresults.txt"
data, colnames = csvread(datafile, ',', header_exists = true)
df = DataFrame([i for i in data], Symbol.(colnames))

@testset "Basic Manhattan Plot" begin
    @time manhattan(df)
    @test isfile("manhattan.png")
    rm("manhattan.png")
end

@testset "Advanced Manhattan Plot" begin
    @time manhattan(df[:pval], df[:chr]; titles = "Manhattan Plot", dpi = 300, 
    ylabel = "expected", xlabel = "observed", outfile = "testmanhat.png",
    ymax = 20, linecolor = "green", signifline = 1e-7)
    @test isfile("testmanhat.png")
    rm("testmanhat.png")
end

@testset "Basic QQ Plot" begin
    @time qq(df; titles = "QQ Plot")
    @test isfile("qqplot.png")
    rm("qqplot.png")
end

@testset "Advanced QQ Plot" begin
    @time qq(df; titles = "QQ Plot", dpi = 300, outfile = "testqq.png", 
    xmax = 10, xmin = 0, ymin = 1, ymax = 20)
    @test isfile("testqq.png")
    rm("testqq.png")
end


#fieldnames(typeof(x.data))
#fieldnames(typeof(x.theme))


