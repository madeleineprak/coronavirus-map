import React from 'react';
import { loadModules } from 'esri-loader';

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/widgets/Locate', 'esri/widgets/Track', 'esri/Graphic', 'esri/widgets/Search', 'esri/widgets/Fullscreen', "esri/widgets/Home"], { css: true })
      .then(([ArcGISMap, MapView, FeatureLayer, Locate, Track, Graphic, Search, Fullscreen, Home]) => {
        const map = new ArcGISMap({
          basemap: 'dark-gray'
        });

        this.view = new MapView({
          container: this.mapRef.current,
          map: map,
          popup: {
            dockEnabled: true,

            dockOptions: {
              position: "bottom-right",
              // Disables the dock button from the popup
              buttonEnabled: false,
              // Ignore the default sizes that trigger responsive docking
              breakpoint: false
            }
          },
          center: [-75.5277, 38.9108],
          // center: [-95.7129, 37.0902], center on US
          zoom: 4
        })

        var popupCases = {
          "title": "{Province_State}",
          content: [{
            type: "media",
            mediaInfos: [{
              type: "column-chart",
              caption: "{Province_State} has <strong/>{Confirmed}</strong> confirmed cases, <strong>{Recovered}</strong> recovered and <strong>{Deaths}</strong> deaths.",
              value: {
                fields: ["Confirmed", "Recovered", "Deaths"],
                normalizeField: null,
                tooltipField: "Confirmed cases, recovered, and deaths"
              }
            }]
          }],

        }

        var casesRenderer = {
          type: "simple",  // autocasts as new SimpleRenderer()
          symbol: {
            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
            size: 20,
            color: "black",
            outline: {  // autocasts as new SimpleLineSymbol()
              width: 0.5,
              color: "white"
            }
          }
        };

        var casesLabels = {
          symbol: {
            type: "text",
            color: "white",
            haloColor: "black",
            haloSize: "1px",
            font: {
              size: "12px",
              family: "Noto Sans",
              style: "italic",
              weight: "bold"
            }
          },
          labelPlacement: "center-center",
          labelExpressionInfo: {
            expression: "$feature.Confirmed"
          }
        };

        var cases = new FeatureLayer({
          url: "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1",
          definitionExpression: "Country_Region = 'US'",
          opacity: .5,
          color: [0, 112, 255],
          outfields: ["Province_State", "Confirmed", "Recovered", "Deaths"],
          popupTemplate: popupCases,
          labelingInfo: [casesLabels],
          renderer: casesRenderer
        })

        var deaths = new FeatureLayer({
          url: "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/0",
          opacity: .5,
          color: [0, 112, 255],
        })

        

        // Search widget
        var search = new Search({
          view: this.view
        });

        this.view.ui.add(search, "top-right");

        var fullscreen = new Fullscreen({
          view: this.view
        });
        this.view.ui.add(fullscreen, "top-right");

        var locate = new Locate({
          view: this.view,
          useHeadingEnabled: false,
          goToOverride: function (view, options) {
            options.target.scale = 1500;  // Override the default map scale
            return view.goTo(options.target);
          }
        });

        this.view.ui.add(locate, "top-left");

        var homeBtn = new Home({
          view: this.view
        });

        // Add the home button to the top left corner of the view
        this.view.ui.add(homeBtn, "top-left");
      
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