using Test, MendelPlots, TextParse, DataFrames, Compose, Cairo


const datadir = joinpath(dirname(@__FILE__), "data")
const datafile = datadir * "/gwasresults.txt"
data, colnames = csvread(datafile, ',', header_exists = true)
df = DataFrame([i for i in data], Symbol.(colnames))

@testset "Basic Manhattan Plots (pdf and png)" begin
    @time manhattan(df)
    @time manhattan(df, outfile = "manhattan.pdf")
    @time manhattan(df, outfile = "manhattan.svg")
    @test isfile("manhattan.svg")
    @test isfile("manhattan.pdf")
    @test isfile("manhattan.png")
    rm("manhattan.png")
    rm("manhattan.svg")
    rm("manhattan.pdf")
end

@testset "Advanced Manhattan Plot" begin
    @time manhattan(df[!, :pval], df[!, :chr]; titles = "Manhattan Plot", dpi = 300, 
    ylabel = "expected", xlabel = "observed", outfile = "testmanhat.png",
    ymax = 20, linecolor = "green", signifline = 1e-7)
    @test isfile("testmanhat.png")
    rm("testmanhat.png")
end

@testset "Advanced Manhattan Plot 2" begin
    @time manhattan(df[!, :pval], df[!, :chr], df[!, :pos]; titles = "Manhattan Plot", dpi = 300, 
    ylabel = "expected", xlabel = "observed", outfile = "testmanhat2.png",
    ymax = 20, linecolor = "green", signifline = 1e-7, fontsize = 5pt)
    @test isfile("testmanhat2.png")
    rm("testmanhat2.png")
end

@testset "Manhattan Annotation" begin
    @time manhattan(df;  
    annotateinds = [4380
    5470
    6722
    7374
   12061
    4936
   14978
    7481],
    titles = "Manhattan Plot", dpi = 300, 
    outfile = "testmanhat2.png",
    linecolor = "red", signifline = -log10(1e-5), fontsize = 15pt)
    @test isfile("testmanhat2.png")
    rm("testmanhat2.png")
end

@testset "Basic QQ Plots" begin
    @time qq(df; titles = "QQ Plot", outfile = "qqplot.svg")
    @time qq(df; titles = "QQ Plot", outfile = "qqplot.pdf")
    @test isfile("qqplot.svg")
    @test isfile("qqplot.pdf")
    rm("qqplot.pdf")
    rm("qqplot.svg")
end

@testset "Advanced QQ Plot" begin
    @time qq(df; titles = "QQ Plot", dpi = 300, outfile = "testqq.png", 
    xmax = 10, xmin = 0, ymin = 1, ymax = 20)
    @test isfile("testqq.png")
    rm("testqq.png")
end

@testset "ArgumentErrors" begin
    @test_throws ArgumentError manhattan(df, pvalvar = "bad")
    @test_throws ArgumentError manhattan(df, chrvar = "chrs")
    @test_throws ArgumentError manhattan(df, outfile = "bad.jpeg")
    @test_throws ArgumentError qq(df, outfile = "bad.jpeg")
    @test_throws ArgumentError qq(df, pvalvar = "pvals", outfile = "bad.png")

end



