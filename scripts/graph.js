const graphElement = document.getElementById('graph');
let width = graphElement.offsetWidth || window.innerWidth;  // Fallback for proper initialization
let height = graphElement.offsetHeight || window.innerHeight;  // Fallback for proper initialization

// Create the SVG element with 100% width and height
const svg = d3.select("#graph")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");  // Ensures proper scaling

// Define the simulation with forces
const simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(d => d.id).distance(200))  // Increased link distance
    .force("charge", d3.forceManyBody().strength(-500))  // Stronger negative to spread nodes further apart
    .force("center", d3.forceCenter(width / 2, height / 2))  // Centering force
    .force("collide", d3.forceCollide().radius(d => (d.category === "Technology" ? 60 : 30)));  // Larger collision radius for "Technology" nodes

// Define colors for node categories
const color = d3.scaleOrdinal()
    .domain(["Technology", "System Type", "Data Type", "Standard", "Vendor"])
    .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"]);

// Load data and create the graph
d3.json("data/normalizedTech.json").then(function(data) {
    // Filter out "Vendor" nodes
    const filteredNodes = data.nodes.filter(d => d.category !== "Vendor");

    // Filter out links that connect to "Vendor" nodes
    const filteredLinks = data.links.filter(d => 
        filteredNodes.find(node => node.id === d.source) &&
        filteredNodes.find(node => node.id === d.target)
    );

    // Create links (edges)
    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(filteredLinks)
        .enter()
        .append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "#999");

    // Create nodes (circles)
    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(filteredNodes)
        .enter()
        .append("circle")
        .attr("r", d => d.category === "Technology" ? 30 : 15)  // Larger radius for "Technology"
        .attr("fill", d => color(d.category))
        .call(d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded));

    // Add labels to nodes
    const label = svg.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(filteredNodes)
        .enter()
        .append("text")
        .attr("dy", 0)
        .attr("dx", 30)
        .style("font-size", "18px")  // Adjust font size here
        .text(d => d.id);

    // Tooltip on nodes
    node.append("title")
        .text(d => `${d.id} (${d.category})`);

    // Update simulation on each tick (to redraw the layout)
    simulation.nodes(filteredNodes).on("tick", () => {
        link
            .attr("x1", d => Math.max(50, Math.min(width - 50, d.source.x)))
            .attr("y1", d => Math.max(50, Math.min(height - 50, d.source.y)))
            .attr("x2", d => Math.max(50, Math.min(width - 50, d.target.x)))
            .attr("y2", d => Math.max(50, Math.min(height - 50, d.target.y)));

        node
            .attr("cx", d => Math.max(50, Math.min(width - 50, d.x)))
            .attr("cy", d => Math.max(50, Math.min(height - 50, d.y)));

        label
            .attr("x", d => Math.max(50, Math.min(width - 50, d.x)))
            .attr("y", d => Math.max(50, Math.min(height - 50, d.y)));
    });

    simulation.force("link").links(filteredLinks);

    // Drag functionality
    function dragStarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragEnded(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
});

// Ensure graph resizes properly
window.addEventListener('resize', () => {
    width = graphElement.offsetWidth || window.innerWidth;
    height = graphElement.offsetHeight || window.innerHeight;
    svg.attr("viewBox", `0 0 ${width} ${height}`);
    simulation.force("center", d3.forceCenter(width / 2, height / 2)).restart();
});

// Trigger resize event immediately after loading
window.dispatchEvent(new Event('resize'));