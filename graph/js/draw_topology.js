/**
 * Created by Chen Wang on 6/25/2017.
 */
function drawNetworkGraph(url) {
    var network = null;
    var EDGE_LENGTH_SUB = 50;

    console.log(url);

    $.getJSON(url, function(json) {
        console.log(json);
        var org_nodes = json['nodes'];
        var nodes = [];

        // Create a data table with links.
        var links = json['links'];
        var edges = [];

        var nodeNumber = org_nodes.length;
        console.log(nodeNumber);
        for (var i = 0; i < nodeNumber; i++) {
            nodes.push({
                id: i,
                // label: org_nodes[i]['name'],
                type: org_nodes[i]['type'],
                cid: org_nodes[i]['id'],
                // label: "QoE Score: " + org_nodes[i]["qs"] + "\nName: " + org_nodes[i]['name'],
                label: org_nodes[i]['name'],
                image: "static/" + org_nodes[i]['type'] + ".png",
                shape: 'image'
            });
        }

        var edgeNumber = links.length;
        for (var j = 0; j < edgeNumber; j++) {
            edges.push({from: links[j]['source'], to: links[j]['target'], length: EDGE_LENGTH_SUB})
        }

        // create a network
        var container = document.getElementById('mynetwork');
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {
            layout: {
                improvedLayout: true,
                hierarchical: {
                    enabled: false,
                    direction: "RL"
                }
            }
        };
        network = new vis.Network(container, data, options);
    });
}

/**
 * Created by Chen Wang on 6/25/2017.
 */
function drawAnomalyNetworkGraph(url) {
    var network = null;
    var EDGE_LENGTH_SUB = 50;

    console.log(url);

    $.getJSON(url, function(json) {
        console.log(json);
        var org_nodes = json['nodes'];
        var nodes = [];

        // Create a data table with links.
        var links = json['links'];
        var edges = [];

        var nodeNumber = org_nodes.length;
        console.log(nodeNumber);
        for (var i = 0; i < nodeNumber; i++) {
            if (org_nodes[i]['type'] == "network") {
                nodes.push({
                    id: i,
                    // label: org_nodes[i]['name'],
                    type: org_nodes[i]['type'],
                    cid: org_nodes[i]['id'],
                    // label: "QoE Score: " + org_nodes[i]["qs"] + "\nName: " + org_nodes[i]['name'],
                    label: org_nodes[i]['name'] + "\n(" + org_nodes[i]['latitude'] + "," + org_nodes[i]['longitude'] + ")",
                    image: "static/" + org_nodes[i]['group'] + "-" + org_nodes[i]['type'] + ".png",
                    shape: 'image'
                });
            }
            else {
                nodes.push({
                    id: i,
                    // label: org_nodes[i]['name'],
                    type: org_nodes[i]['type'],
                    cid: org_nodes[i]['id'],
                    // label: "QoE Score: " + org_nodes[i]["qs"] + "\nName: " + org_nodes[i]['name'],
                    label: org_nodes[i]['name'],
                    font: {
                        "size":40
                    },
                    image: "static/" + org_nodes[i]['group'] + "-" + org_nodes[i]['type'] + ".png",
                    shape: 'image'
                });
            }

        }

        var edgeNumber = links.length;
        for (var j = 0; j < edgeNumber; j++) {
            edges.push({from: links[j]['source'], to: links[j]['target'], length: EDGE_LENGTH_SUB})
        }

        // create a network
        var container = document.getElementById('mynetwork');
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {
            layout: {
                improvedLayout: true,
                hierarchical: {
                    enabled: false,
                    direction: "RL"
                }
            }
        };
        network = new vis.Network(container, data, options);
    });
}