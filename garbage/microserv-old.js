
$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
    ajaxStop: function() { $body.removeClass("loading"); }
});

var getGraphData = function(callback) {

    $.getJSON("scripts/data/data.json", function(data) {
        callback(data);
    });
};

(function() {

    var url = 'data.json'
    var r = 10;
    var graph, layout, zoom, nodes, links, data;
    var linkedByIndex = {};
    var graphWidth, graphHeight;

    // Helpers
    function formatClassName(prefix, object) {
        return prefix + '-' + object.id.replace(/(\.|\/)/gi, '-');
    }

    function findElementByNode(prefix, node) {
        var selector = '.' + formatClassName(prefix, node);
        return graph.select(selector);
    }

    function isConnected(a, b) {
        return linkedByIndex[a.index + "," + b.index]
            || linkedByIndex[b.index + "," + a.index]
            || a.index == b.index;
    }

    function fadeRelatedNodes(d, opacity, nodes, links) {

        // Clean
        $('path.link').removeAttr('data-show');

        nodes.style("stroke-opacity", function(o) {

            if (isConnected(d, o)) {
                thisOpacity = 1;
            } else {
                thisOpacity = opacity;
            }

            this.setAttribute('fill-opacity', thisOpacity);
            this.setAttribute('stroke-opacity', thisOpacity);

            if (thisOpacity == 1) {
                this.classList.remove('dimmed');
            } else {
                this.classList.add('dimmed');
            }

            return thisOpacity;
        });

        links.style("stroke-opacity", function(o) {

            if (o.source === d) {

                // Highlight target/sources of the link
                var elmNodes = graph.selectAll('.'
                    + formatClassName('node', o.target));
                elmNodes.attr('fill-opacity', 1);
                elmNodes.attr('stroke-opacity', 1);

                elmNodes.classed('dimmed', false);

                // Highlight arrows
                var elmCurrentLink = $('path.link[data-source='
                    + o.source.index + ']');
                elmCurrentLink.attr('data-show', true);
                elmCurrentLink.attr('marker-end', 'url(#regular)');

                return 1;

            } else {

                var elmAllLinks = $('path.link:not([data-show])');

                if (opacity == 1) {
                    elmAllLinks.attr('marker-end', 'url(#regular)');
                } else {
                    elmAllLinks.attr('marker-end', '');
                }

                return opacity;
            }

        });
    }

    function render() {

        // Constructs a new zoom behavior. You can apply the behavior to selected elements using selection.call
        zoom = d3.behavior.zoom();
        zoom.on("zoom", onZoomChanged);

        // Setup layout
        layout = d3.layout.force().gravity(.05).charge(-300)
            .linkDistance(100);

        // Setup graph
        graph = d3.select(".graph")             //A selection is an array of elements pulled from the current document. D3 uses CSS3 to select elements.
            .append("svg:svg")                  //Appends a new element with the specified name as the last child of each element in the current selection, returning a new selection containing the appended elements.
            .attr("pointer-events", "all")      //If value is specified, sets the attribute with the specified name to the specified value on all selected elements.
                                                //The ‘pointer-events’ property specifies under what circumstances a given graphics element can be the target element for a pointer event.
                                                //The given element can be the target element for pointer events whenever the pointer is over either the interior (i.e., fill) or the perimeter (i.e., stroke) of the element.
            .call(zoom)
            .append('svg:g')
            .attr('width', graphWidth)
            .attr('height', graphHeight);

        d3.select(window).on("resize", resize); //Adds or removes an event listener to each element in the current selection, for the specified type.

        // Load graph data
        window.getGraphData(function(graphData) {

            renderGraph(graphData);
            data = graphData;

            // Resize
            resize();
            centerGraph();

            // Controlers
            $('.control-zoom a').on('click', onControlZoomClicked);

        });

    }

    function resize() {
        graphWidth = window.innerWidth,
            graphHeight = window.innerHeight;
        graph.attr("width", graphWidth).attr("height", graphHeight);

        layout.size([ graphWidth, graphHeight ]).resume();
    }

    function centerGraph() {

        var centerTranslate = [
            (graphWidth / 2) - (graphWidth * 0.2 / 2),
            (graphHeight / 2) - (graphHeight * 0.2 / 2), ];

        zoom.translate(centerTranslate);

        // Render transition
        graph.transition().duration(500).attr(
            "transform",
            "translate(" + zoom.translate() + ")" + " scale("
            + zoom.scale() + ")");
    }

    function renderGraph(data) {

        // Markers
        graph.append("svg:defs")
            .selectAll("marker")
            .data([ 'regular' ])                //Joins the specified array of data with the current selection.The specified values is an array of data values
            .enter()                            //Returns the enter selection: placeholder nodes for each data element for which no corresponding existing DOM element was found in the current selection.
            .append("svg:marker")
              .attr("id", String)
              .attr("viewBox", "0 -5 10 10")
              .attr("refX", 15)
              .attr("refY", -1.5)
              .attr("markerWidth", 6)
              .attr("markerHeight", 6)
              .attr("orient", "auto")
            .append("svg:path")
              .attr("d", "M0,-5L10,0L0,5");     //The <path> element is used to define a path.
                                                //
                                                //The following commands are available for path data:
                                                //
                                                //M = moveto
                                                //L = lineto
                                                //H = horizontal lineto
                                                //V = vertical lineto
                                                //C = curveto
                                                //S = smooth curveto
                                                //Q = quadratic Bézier curve
                                                //T = smooth quadratic Bézier curveto
                                                //A = elliptical Arc
                                                //Z = closepath

        // Lines
        links = graph.append('svg:g')
            .selectAll("line")
            .data(data.links)
            .enter()
            .append("svg:path")
              .attr('class', 'link')
              .attr("data-target",
                function(o) {
                    return o.target
                }).attr("data-source", function(o) {
                    return o.source
                }).attr("marker-end", function(d) {
                    return "url(#regular)";
                });

        // Nodes
        nodes = graph.append('svg:g')
            .selectAll("node")
            .data(data.nodes)
            .enter()
            .append("svg:g")
              .attr("class", "node")
              .call(layout.drag)
              .on("mousedown", onNodeMouseDown);

        // Circles
        nodes.attr("class", function(d) {
            return formatClassName('node', d)
        })
        nodes.append("svg:circle")
            .attr("class", function(d) {
                return formatClassName('circle', d)
            })
            .attr("r", 6)
            .on("mouseover", _.bind(onNodeMouseOver, this, nodes, links))
            .on("mouseout", _.bind(onNodeMouseOut, this, nodes, links));

        // A copy of the text with a thick white stroke for legibility.
        nodes.append("svg:text")
            .attr("x", 15)
            .attr("y", ".31em")
            .attr("class", function(d) {
                return 'shadow ' + formatClassName('text', d)
            }).text(function(d) {
                return d.id;
            });

        nodes.append("svg:text")
            .attr("class", function(d) {
                return formatClassName('text', d)
            })
            .attr("x", 15)
            .attr("y", ".31em")
            .text(function(d) {
                return d.id;
            });

        // Build linked index
        data.
            links
            .forEach(function(d) {
                linkedByIndex[d.source.index + "," + d.target.index] = 1;
            });

        // Draw the
        layout.nodes(data.nodes);
        layout.links(data.links);
        layout.on("tick", onTick);
        layout.start();

        zoom.scale(0.75);

        // Render transition
        graph.transition()
            .duration(500)
            .attr("transform", "scale(" + zoom.scale() + ")");

    }

    function onNodeMouseOver(nodes, links, d) {

        // Highlight circle
        var elm = findElementByNode('circle', d);
        elm.style("fill", '#b94431');

        // Highlight related nodes
        fadeRelatedNodes(d, .05, nodes, links);
    }

    function onNodeMouseOut(nodes, links, d) {

        // Highlight circle
        var elm = findElementByNode('circle', d);
        elm.style("fill", '#ccc');

        // Highlight related nodes
        fadeRelatedNodes(d, 1, nodes, links);
    }

    function onTick(e) {

        links
            .attr("d", function(d) {
                var dx = d.target.x - d.source.x,
                    dy = d.target.y - d.source.y,
                    dr = Math.sqrt(dx * dx + dy * dy);
                return "M" + d.source.x + "," + d.source.y + "A" + dr + ","
                    + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
            });

        nodes.attr("cx", function(d) {
            return d.x;
        }).attr("cy", function(d) {
            return d.y;
        }).attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    }

    function onControlZoomClicked(e) {
        var elmTarget = $(this)
        var scaleProcentile = 0.20;

        // Scale
        var currentScale = zoom.scale();
        var newScale;
        if (elmTarget.hasClass('control-zoom-in')) {
            newScale = currentScale * (1 + scaleProcentile);
        } else {
            newScale = currentScale * (1 - scaleProcentile);
        }
        newScale = Math.max(newScale, 0);

        // Translate
        var centerTranslate = [
            (graphWidth / 2) - (graphWidth * newScale / 2),
            (graphHeight / 2) - (graphHeight * newScale / 2) ];

        // Store values
        zoom.translate(centerTranslate).scale(newScale);

        // Render transition
        graph.transition().duration(500).attr(
            "transform",
            "translate(" + zoom.translate() + ")" + " scale("
            + zoom.scale() + ")");

    }

    function onZoomChanged() {
        graph.attr("transform", "translate(" + d3.event.translate + ")"
            + " scale(" + d3.event.scale + ")");
    }

    function onNodeMouseDown(d) {
        d.fixed = true;
        d3.select(this).classed("sticky", true);
    }

    render();

})();