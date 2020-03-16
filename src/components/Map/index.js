import React from 'react';
import { loadModules } from 'esri-loader';

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer'], { css: true })
    .then(([ArcGISMap, MapView, FeatureLayer]) => {
      const map = new ArcGISMap({
        basemap: 'topo-vector'
      });

      this.view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [-95.7129, 37.0902],
        zoom: 3
      })
      var cases = new FeatureLayer({
          url: "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1",
          opacity: .5
      })

      var deaths = new FeatureLayer({
        url: "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/0"
    })

      map.add(cases)
      map.add(deaths)
    });
  }

  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  render() {
    return (
      <div className="webmap" ref={this.mapRef} />
    );
  }
}