
# eClinicalForceGraph

eClinicalForceGraph is a visualization tool designed to highlight relationships between different clinical technologies such as IRT/RTSM, eCOA/ePRO, and others. Using this tool, companies can explore the overlaps and connections between various systems and determine where expanding or developing capabilities might be valuable. The visualization is built using D3.js and is tailored for clinical technology domains.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Interactive Visualization:** Displays the relationships between various clinical technologies.
- **Customizable Graphs:** Easily adjust the graph parameters to fit specific clinical domains.
- **Dynamic Updates:** Real-time updates when data is changed.
- **Tooltips & Labels:** Hover over nodes and edges for additional information.

## Installation

To use this project locally, clone the repository and install the dependencies:

```bash
git clone https://github.com/TubadoG/eClinicalForceGraph.git
cd eClinicalForceGraph
npm install
```

Ensure you have Node.js and npm installed on your system. You can verify your installation with:

```bash
node -v
npm -v
```

## Usage

1. After installing the dependencies, start the development server:

```bash
npm start
```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

3. To build the project for production, use:

```bash
npm run build
```

The production build will be optimized and outputted to the `dist` folder.

## Configuration

The application allows for customization of the clinical technology nodes and their relationships. You can modify the data used in the visualization by editing the `normalizedTech.json` file in the `data` folder. The file structure should look like this:

```json
{
 "nodes": [
        {"id": "RTSM/IRT", "category": "Technology"},
        {"id": "eCOA/ePRO", "category": "Technology"},
    ...
  ],
  "links": [
        {"source": "Wearables", "target": "SDTM"},
        {"source": "eCOA/ePRO", "target": "Client-Side"},
    ...
  ]
}
```

- **Nodes:** Define the clinical technologies (e.g., IRT, eCOA).
- **Links:** Define relationships between these technologies with a `source` and `target`.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to your fork (`git push origin feature-branch`).
5. Open a pull request.

Please ensure your code adheres to the existing coding style and passes all tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Special thanks to all contributors who helped build this tool and provide insights into clinical technology visualization.
