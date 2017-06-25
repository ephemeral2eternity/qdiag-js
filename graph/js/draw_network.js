/**
 * Created by Chen Wang on 3/11/2017.
 */
function draw_network(graph_json_file)
{
    var width = 600,
        height = 600;
    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);
    var force = d3.layout.force()
        .gravity(0.05)
        .distance(120)
        .linkDistance(50)
        .charge(-120)
        .size([width, height]);
    d3.json(graph_json_file, function(error, json) {
        console.log(json);
        if (error) throw error;
        force
            .nodes(json.nodes)
            .links(json.edges)
            .start();
        var link = svg.selectAll(".link")
            .data(json.edges)
            .enter().append("line")
            .attr("class", "link");
        var node = svg.selectAll(".node")
            .data(json.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(force.drag);
        node.append("image")
            .attr("xlink:href", function(d) { return "static/" + d.type + "-router.png"; })
            .attr("x", "-20px")
            .attr("y", "-20px")
            .attr("width", "40px")
            .attr("height", "40px");
        node.append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function(d) { return d.name });
        force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });

        var legend = svg.selectAll(".legend")
            .data([{type: "in", name:"In network"}, {type:"out", name: "Out of network"}])
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 45 + ")"; });
        legend.append("image")
            .attr("xlink:href", function(d) { return "static/" + d.type + "-router.png"; })
            .attr("x", width - 36)
            .attr("width", 36)
            .attr("height", 36);
        legend.append("text")
            .attr("x", width - 40)
            .attr("y", 0)
            .attr("font-size","18px")
            .attr("dy", "1.5em")
            .style("text-anchor", "end")
            .text(function(d) { return d.name; });
    });
}