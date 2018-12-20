#Contains the plot functions for GWAS studies 

#uses these libraries:
#using Gadfly, Compose, Statistics, DataFrames, Distributions
#import Cairo, Fontconfig

#base functions for useful things 

#creates evenly spaced points for qqplots
ppoints(n) = (collect(1:n) .- 0.5) ./ n

#finds closest even number above or at current number
function nearestEven(num::Union{Float64, Int64})
    return (num % 2 == 0) ? num : (num + 1);
end


"""

    qq(pvalues::AbstractArray)

# Position arguments

- `pvalues::AbstractArray`: pvalues. A one dimensional array containing pvalues to be used in the qqplot.

# Keyword arguments

- `titles::AbstractString`: Title for the plot. Default is "QQ Plot of GWAS p-values".
 To have blank enter "". 

- `outfile::AbstractString`: output name to save for qqplot as a png. Default is "qqplot.png"

- `dpi::Union{Float64, Int64}`: dots per inch to save the png file. Higher DPI results in larger file with 
higher resolution. Default dpi is 350.

- `xlabel::AsbtractString`: option to replace x-label text

- `ylabel::AsbtractString`: option to replace y-label text

- `xmin::Union{Float64, Int64}`: Specified minimum x value to represent on the plot

- `xmax::Union{Float64, Int64}`: Specified maximum x value to represent on the plot

- `ymin::Union{Float64, Int64}`: Specified minimum y value to represent on the plot

- `ymax::Union{Float64, Int64}`: Specified maximum y value to represent on the plot

- `linecolor::AbstractString`: Color of "normal" line. Default color is 'red'. 

"""
function qq(pvalues::AbstractArray; 
    titles::AbstractString = "QQ Plot of GWAS p-values", 
    outfile::AbstractString = "qqplot.png",
    dpi::Int64 = 350, xlabel::AbstractString = "Expected -log<sub>10</sub>(p)", 
    ylabel::AbstractString = "Observed -log<sub>10</sub>(p)", 
    xmin::Union{Float64, Int64} = 0.0, ymin::Union{Float64, Int64} = 0.0, 
    xmax::Union{Float64, Int64} = 0.0, ymax::Union{Float64, Int64} = 0.0,
    linecolor::AbstractString = "red", kwargs...)

    obs = -log10.(sort(pvalues))
    expect = -log10.(ppoints(length(pvalues)))
    if xmax == 0.0
        xmax = ceil(maximum(expect))
    end
    if ymax == 0.0
        ymax = ceil(maximum(obs))
    end
    xticks = collect(xmin:xmax)
    yticks = collect(ymin:2:nearestEven(ymax))
    xλ = xmax - 1.0
    #calculate genomic inflation factor
    λ = median(quantile.(Chisq(1), 1 .- pvalues) ./ quantile(Chisq(1), 0.5))
    plt1 = plot(x = expect, y = obs, Geom.point, intercept=[0], slope = [1],
        Guide.title(titles), Geom.abline(color = linecolor, style = :dash),
        Scale.x_continuous(minvalue = xmin, maxvalue = xmax),
        Scale.y_continuous(minvalue = ymin, maxvalue = ymax),
        Guide.xlabel(xlabel), Guide.ylabel(ylabel),
        Guide.xticks(ticks = xticks), Guide.yticks(ticks = yticks),
        Theme(panel_fill = nothing, highlight_width = 0mm, point_size = 0.5mm,
        key_position = :none, grid_line_width = 0mm, panel_stroke = colorant"black"),
        Guide.annotation(compose(context(), text(xλ, 0, "λ = " * string(round(λ, sigdigits = 4))))); 
        kwargs...);
    draw(PNG(outfile, 5inch, 5inch, dpi = dpi), plt1);
end


"""
    qq(df::DataFrame)

# Position arguments

- `df::DataFrame`: DataFrame containing pvalues to be used in the qqplot. Note: The column of the dataframe
that indicates pvalues must be named pval (df[:pval] must exist)

# Keyword arguments

- `titles::AbstractString`: Title for the plot. Default is "QQ Plot of GWAS p-values".
 To have blank enter "". 

- `outfile::AbstractString`: output name to save for qqplot as a png. Default is "qqplot.png"

- `dpi::Int64`: dots per inch to save the png file. Higher DPI results in larger file with 
higher resolution. Default dpi is 350.

- `xlabel::AsbtractString`: option to replace x-label text

- `ylabel::AsbtractString`: option to replace y-label text

- `xmin::Union{Float64, Int64}`: Specified minimum x value to represent on the plot

- `xmax::Union{Float64, Int64}`: Specified maximum x value to represent on the plot

- `ymin::Float64`: Specified minimum y value to represent on the plot

- `ymax::Float64`: Specified maximum y value to represent on the plot

- `linecolor::AbstractString`: Color of "normal" line. Default color is 'red'. 
"""
function qq(df::DataFrame; kwargs...)
    qq(df[:pval]; kwargs...)
end




"""
    manhattan(df::DataFrame)

# Position arguments

- `df::DataFrame`: A DataFrame containing information to be used in the Manhattan Plot. Note, DataFrame must have the
following values saved under the corresponding names. pvalues:pval, chromosome:chr. Additionally, the DataFrame must be
in order of basepairs going from first to last. 

# Keyword arguments

- `titles::AbstractString`: Title for the plot. Default is "Manhattan Plot".
 To have blank enter "". 

- `outfile::AbstractString`: output name to save for qqplot as a png. Default is "manhattan.png"

- `dpi::Int64`: dots per inch to save the png file. Higher DPI results in larger file with 
higher resolution. Default dpi is 350.

- `xlabel::AsbtractString`: option to replace x-label text

- `ylabel::AsbtractString`: option to replace y-label text

- `ymax::Union{Float64, Int64}`: Specified maximum y value to represent on the plot

- `signifline::Union{Float64, Int64}`: Line to draw significance at. Default in Bonferonni corrected p-value for α = 0.05. 

- `linecolor::AbstractString`: Color for significance line. Default is 'deepskyblue1'. 
"""
function manhattan(df::DataFrame, titles::AbstractString = "Manhattan Plot",
    outfile::AbstractString = "manhattan.png",
    dpi::Int64 = 350, xlabel::AsbtractString = "Chromosome",
    ylabel::AsbtractString = "-log<sub>10</sub>(p)", ymax::Union{Float64, Int64} = nothing,
    signifline::Union{Float64, Int64} = nothing, linecolor = "deepskyblue1"; kwargs...)

    df[:SNPnumber] = collect(1:size(df)[1])
    df[:log10pval] = -log10.(df[:pval])
    if typeof(ymax) == Nothing
        ymax = ceil(maximum(df[:log10pval])) + 2.5
    end
    yticks = collect(0:2.5:ymax)
    xlabs = string.(collect(1:2:length(unique(df[:chr]))))
    xticks = Vector{Float64}(undef, length(xlabs))
    if typeof(df[:chr][1]) != String
        df[:chr] = string.(df[:chr])
    end
    global counter = 1
    for i in collect(1:2:length(unique(df[:chr])))
        xticks[counter] = mean(df[:SNPnumber][df[:chr] .== string.(i)])
        global counter = counter + 1
    end

    if typeof(signifline) == Nothing
        signifline = -log10(0.05 / length(df[:chr]))
    end

    function convertlabs(i)
        return df[:chr][findfirst(df[:SNPnumber] .== round(i))]
    end
    
    #make the manhattan plot
    if length(unique(df[:chr])) == 22
        plt1 = plot(df, x = :SNPnumber, y = :log10pval, color = :chr, Geom.point,
            Guide.xticks(ticks = xticks), Guide.xlabel(xlabel), Scale.x_continuous(labels = convertlabs),
            Geom.abline(), intercept=[signifline], slope = [0], Guide.title(titles), 
            Geom.abline(color = linecolor), Guide.ylabel(ylabel),
            Theme(panel_fill = nothing, highlight_width = 0mm, point_size = 0.5mm,
            key_position = :none, grid_line_width = 0mm, panel_stroke = colorant"black"),
            Guide.yticks(ticks = yticks), Scale.color_discrete_manual("#d54359", "#5ab543", 
            "#a162dc", "#a9b245", "#5861cf", "#d89c39", "#6e8be3",
            "#c7522a", "#5ea1d5", "#dd418d", "#66b974", "#9c41a3",
            "#5a7936", "#df6cce", "#48b5a3", "#aa4584", "#997134", 
            "#655fa0", "#dd8a69", "#bf8cd3", "#a24b5e", "#df83a3"); kwargs...);
    else
        plt1 = plot(df, x = :SNPnumber, y = :log10pval, color = :chr, Geom.point,
            Guide.xticks(ticks = xticks), Guide.xlabel(xlabel), Scale.x_continuous(labels = convertlabs),
            Geom.abline(), intercept=[signifline], slope = [0], Guide.title(titles), 
            Geom.abline(color = linecolor), Guide.ylabel(ylabel),
            Theme(panel_fill = nothing, highlight_width = 0mm, point_size = 0.5mm, 
            key_position = :none, grid_line_width = 0mm, panel_stroke = colorant"black"),
            Guide.yticks(ticks = yticks), Scale.color_discrete; kwargs...);
    end
    draw(PNG(outfile, 6inch, 4inch, dpi = dpi), plt1);
end

"""
    manhattan(pvalues::AbstractArray, chr::AbstractArray)

# Position arguments

- `pvalues::AbstractArray`: pvalues for the associated GWAS. Must be in the order of the basepairs. 

- `chr::AbstractArray`: An array of chromosome identifiers for each pvalue. Must match order with pvalues. 

# Keyword arguments

- `titles::AbstractString`: Title for the plot. Default is "Manhattan Plot".
 To have blank enter "". 

- `outfile::AbstractString`: output name to save for qqplot as a png. Default is "manhattan.png"

- `dpi::Int64`: dots per inch to save the png file. Higher DPI results in larger file with 
higher resolution. Default dpi is 350.

- `xlabel::AsbtractString`: option to replace x-label text

- `ylabel::AsbtractString`: option to replace y-label text

- `ymax::Union{Float64, Int64}`: Specified maximum y value to represent on the plot

- `signifline::Union{Float64, Int64}`: Line to draw significance at. Default in Bonferonni corrected p-value for α = 0.05. 

- `linecolor::AbstractString`: Color for significance line. Default is 'deepskyblue1'. 
"""
function manhattan(pvalues::AbstractArray, chr::AbstractArray; kwargs...)
    df = DataFrame(pval = pvalues, chr = chr)
    manhattan(df; kwargs...)
end


