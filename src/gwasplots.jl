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

- `xlabel::AbstractString`: option to replace x-label text

- `ylabel::AbstractString`: option to replace y-label text

- `xmin::Union{Float64, Int64}`: Specified minimum x value to represent on the plot

- `xmax::Union{Float64, Int64}`: Specified maximum x value to represent on the plot

- `ymin::Union{Float64, Int64}`: Specified minimum y value to represent on the plot

- `ymax::Union{Float64, Int64}`: Specified maximum y value to represent on the plot

- `linecolor::AbstractString`: Color of "normal" line. Default color is "red". 

- `dotcolor::AbstractString`: Color of the dots. Default color is "black". 

"""
function qq(pvalues::AbstractArray; 
    titles::AbstractString = "QQ Plot of GWAS p-values", 
    outfile::AbstractString = "qqplot.png",
    dpi::Int64 = 350, xlabel::AbstractString = "Expected -log<sub>10</sub>(p)", 
    ylabel::AbstractString = "Observed -log<sub>10</sub>(p)", 
    xmin::Union{Float64, Int64} = 0.0, ymin::Union{Float64, Int64} = 0.0, 
    xmax::Union{Float64, Int64} = 0.0, ymax::Union{Float64, Int64} = 0.0,
    linecolor::AbstractString = "red", dotcolor::AbstractString = "black", kwargs...)

    N = length(pvalues)
    up = Array{Float64}(undef, N)
    low = Array{Float64}(undef, N)
    for i in 1:N
        low[i] = -log10(quantile(Beta(i, N - i + 1), 0.975))
        up[i] = -log10(quantile(Beta(i, N - i + 1), 0.025))
    end
    up = sort!(up)
    obs = -log10.(sort(pvalues))
    expect = -log10.(ppoints(length(pvalues)))

    civals = [low expect; up sort(expect)]
    
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
    
    pCI = layer(x = civals[:, 2], y = civals[:, 1], Geom.polygon(fill = true,
        preserve_order = true), Theme(default_color = Colors.RGBA(0, 0, 0, 0.2),
        panel_fill = nothing, grid_line_width = 0mm));

    pmain = layer(x = expect, y = obs, Geom.point, intercept=[0], slope = [1],
        Geom.abline(color = linecolor, style = :dash),
        Theme(panel_fill = nothing, highlight_width = 0mm, point_size = 0.5mm,
        key_position = :none, grid_line_width = 0mm, panel_stroke = colorant"black", 
        default_color = dotcolor); kwargs..., order = 1);

    plt1 = plot(pCI, pmain, Scale.x_continuous(minvalue = xmin, maxvalue = xmax),
        Scale.y_continuous(minvalue = ymin, maxvalue = ymax), Guide.title(titles), 
        Guide.xlabel(xlabel), Guide.ylabel(ylabel), Guide.xticks(ticks = xticks), 
        Guide.yticks(ticks = yticks), 
        Guide.annotation(compose(context(), text(xλ, 0, "λ = " * string(round(λ, sigdigits = 4))))),
        Theme(panel_fill = nothing, highlight_width = 0mm, point_size = 0.5mm,
        key_position = :none, grid_line_width = 0mm, panel_stroke = colorant"black"));

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

- `xlabel::AbstractString`: option to replace x-label text

- `ylabel::AbstractString`: option to replace y-label text

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
in order of basepairs going from first to last if there's no position arguement. Optionally, if there is 
basepair information, then the position variable must be named `pos`. 

# Keyword arguments

- `titles::AbstractString`: Title for the plot. Default is "Manhattan Plot".
 To have blank enter "". 

- `outfile::AbstractString`: output name to save for qqplot as a png. Default is "manhattan.png"

- `dpi::Int64`: dots per inch to save the png file. Higher DPI results in larger file with 
higher resolution. Default dpi is 350.

- `xlabel::AbstractString`: option to replace x-label text

- `ylabel::AbstractString`: option to replace y-label text

- `ymax::Union{Float64, Int64}`: Specified maximum y value to represent on the plot

- `signifline::Union{Float64, Int64}`: Line to draw significance at. Default in Bonferonni corrected p-value for α = 0.05. 

- `linecolor::AbstractString`: Color for significance line. Default is 'deepskyblue1'. 
"""
function manhattan(df::DataFrame; titles::AbstractString = "Manhattan Plot",
    outfile::AbstractString = "manhattan.png",
    dpi::Int64 = 350, xlabel::AbstractString = "Chromosome",
    ylabel::AbstractString = "-log<sub>10</sub>(p)", ymax::Union{Float64, Int64} = 0,
    signifline::Union{Float64, Int64} = -1, linecolor = "deepskyblue1", kwargs...)

    using_basepairs = :pos in names(df)

    df[:log10pval] = -log10.(df[:pval])
    if ymax == 0
        ymax = ceil(maximum(df[:log10pval])) + 2.5
    end
    yticks = collect(0:2.5:ymax)

    if typeof(df[:chr][1]) != String
        df[:chr] = string.(df[:chr])
        xlabs = unique(df[:chr])[1:2:end]
    else
        xlabs = unique(df[:chr])[1:2:end]
    end

    if signifline == -1
        signifline = -log10(0.05 / length(df[:chr]))
    end

    if using_basepairs
        a = by(df, :chr, max_pos = :pos => maximum)
        a[:bp_add] = cumsum(a[:max_pos]) - a[:max_pos]
        df = join(df, a, on  = :chr)
        df[:adj_bp] = df[:pos] .+ df[:bp_add]
        xticks = by(df, :chr, :adj_bp => d -> (maximum(d) + minimum(d))/2)[2][1:2:end]

        function convertlabsBP(i)
            return string.(xlabs)[findfirst(xticks .== i)]
        end
    else
        xticks = Vector{Float64}(undef, length(xlabs))
        df[:SNPnumber] = collect(1:size(df)[1])
        global counter = 1
        for i in parse.(Int64, unique(df[:chr]))[1:2:end]
            xticks[counter] = mean(df[:SNPnumber][df[:chr] .== string.(i)])
            global counter = counter + 1
        end
        function convertlabs(i)
            return df[:chr][findfirst(df[:SNPnumber] .== round(i))]
        end
    end


    
    #make the manhattan plot
    if using_basepairs
        if length(unique(df[:chr])) == 22
            plt1 = plot(df, x = :adj_bp, y = :log10pval, color = :chr, Geom.point,
                Guide.xticks(ticks = xticks), Guide.xlabel(xlabel), Scale.x_continuous(labels = convertlabsBP),
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
            plt1 = plot(df, x = :adj_bp, y = :log10pval, color = :chr, Geom.point,
                Guide.xticks(ticks = xticks), Guide.xlabel(xlabel), Scale.x_continuous(labels = convertlabsBP),
                Geom.abline(), intercept=[signifline], slope = [0], Guide.title(titles), 
                Geom.abline(color = linecolor), Guide.ylabel(ylabel),
                Theme(panel_fill = nothing, highlight_width = 0mm, point_size = 0.5mm, 
                key_position = :none, grid_line_width = 0mm, panel_stroke = colorant"black"),
                Guide.yticks(ticks = yticks), Scale.color_discrete; kwargs...);
        end
    else
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
    end
    draw(PNG(outfile, 6inch, 4inch, dpi = dpi), plt1);
end

"""
    manhattan(pvalues::AbstractArray, chr::AbstractArray)

# Position arguments

- `pvalues::AbstractArray`: pvalues for the associated GWAS. Must be in the order of the basepairs. 

- `chr::AbstractArray`: An array of chromosome identifiers for each pvalue. Must match order with pvalues. 
"""
function manhattan(pvalues::AbstractArray, chr::AbstractArray; kwargs...)
    df = DataFrame(pval = pvalues, chr = chr)
    manhattan(df; kwargs...)
end


"""
    manhattan(pvalues::AbstractArray, chr::AbstractArray, pos::AbstractArray)

# Position arguments

- `pvalues::AbstractArray`: pvalues for the associated GWAS. Must be in the order of the basepairs. 

- `chr::AbstractArray`: An array of chromosome identifiers for each pvalue. Must match order with pvalues and positions. 

- `pos::AbstractArray`: An array of basepair positions for each pvalue/chromosome. Must match order with pvalues and chromosomes. 
"""
function manhattan(pvalues::AbstractArray, chr::AbstractArray, pos::AbstractArray; kwargs...)
    df = DataFrame(pval = pvalues, chr = chr, pos = pos)
    manhattan(df; kwargs...)
end


