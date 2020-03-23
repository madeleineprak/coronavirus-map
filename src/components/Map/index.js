import React from 'react';
import { loadModules } from 'esri-loader';

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/widgets/Locate', 'esri/widgets/Track', 'esri/Graphic', 'esri/widgets/Search'], { css: true })
      .then(([ArcGISMap, MapView, FeatureLayer, Locate, Track, Graphic, Search]) => {
        const map = new ArcGISMap({
          basemap: 'gray'
        });

        this.view = new MapView({
          container: this.mapRef.current,
          map: map,
          center: [-95.7129, 37.0902],
          zoom: 4
        })

        var popupCases = {
          "title": "{Province_State}",
          content: [{
            type: "media",
            mediaInfos: [{
              type: "column-chart",
              caption: "",
              value: {
                fields: ["Confirmed", "Recovered", "Deaths"],
                normalizeField: null,
                tooltipField: "Confirmed cases, recovered cases, and deaths"
              }
            }]
          }]
        }

        var cases = new FeatureLayer({
          url: "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1",
          opacity: .5,
          color: [0, 112, 255],
          outfields: ["Province_State", "Confirmed", "Recovered", "Deaths"],
          popupTemplate: popupCases
        })

        var deaths = new FeatureLayer({
          url: "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/0",
          opacity: .5,
          color: [0, 112, 255],
        })

        var locate = new Locate({
          view: this.view,
          useHeadingEnabled: false,
          goToOverride: function (view, options) {
            options.target.scale = 1500;  // Override the default map scale
            return view.goTo(options.target);
          }
        });

        this.view.ui.add(locate, "top-left");

        // Search widget
        var search = new Search({
          view: this.view
        });

        this.view.ui.add(search, "top-right");

        map.add(cases)
        // map.add(deaths)
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