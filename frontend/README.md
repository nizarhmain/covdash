# Components breakdown


<App /> is at the highest level

<Dashboard /> stateful, selectedProperty (filter: deceduti, morti, ...) selectedRegion (Lazio, Piemonte ...) and fetchs the region data when it mounts (class component)
    - <PropertyChooser /> stateless, sets a state of the selectedProperty. (functional component)
    - <Italy /> stateless, contains a map of italy. (must use hooks, because of the library)
    - <PropertyList /> stateless, shows the properties
        - <Property /> stateless
    - <Graph /> stateless shows the graph, is not affected by selectedRegion, only by selectedProperty
    - <DarkModeToggler /> toggles between dark mode


