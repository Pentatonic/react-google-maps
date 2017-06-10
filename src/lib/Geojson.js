/* global google */
import _ from "lodash";

import PropTypes from "prop-types";

import createReactClass from "create-react-class";

import {
  MAP,
  GEOJSON,
} from "./constants";

import {
  addDefaultPrefixToPropTypes,
  collectUncontrolledAndControlledProps,
  default as enhanceElement,
} from "./enhanceElement";

const controlledPropTypes = {
  // NOTICE!!!!!!
  //
  // Only expose those with getters & setters in the table as controlled props.
  //
  // [].map.call($0.querySelectorAll("tr>td>code", function(it){ return it.textContent; })
  //    .filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
  //
  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Data
};

const defaultUncontrolledPropTypes = addDefaultPrefixToPropTypes(controlledPropTypes);

const eventMap = {
  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Data
  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
};

const publicMethodMap = {
  // Public APIs
  //
  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Data
  //
  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
  //    .filter(function(it){ return it.match(/^get/) && !it.match(/Map$/); })
  // END - Public APIs
};

const controlledPropUpdaterMap = {
};

function getInstanceFromComponent(component) {
  return component.state[GEOJSON];
}

export default _.flowRight(
  createReactClass,
  enhanceElement(getInstanceFromComponent, publicMethodMap, eventMap, controlledPropUpdaterMap),
)({
  displayName: `Geojson`,

  propTypes: {
    ...controlledPropTypes,
    ...defaultUncontrolledPropTypes,
  },

  contextTypes: {
    [MAP]: PropTypes.object,
  },

  getInitialState() {
    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Data
    const Data = new google.maps.Data();
    Data.loadGeoJson(this.props.url);
    Data.setStyle(this.props.style);
    /*
    Data.loadGeoJson('https://raw.githubusercontent.com/Pentatonic/GoogleVisionOCR/master/TPE/code1.geojson');
    Data.setStyle({
      fillColor: 'green',
      strokeWeight: 1
    });
    */
    Data.setMap(this.context[MAP]);
    /*
    data1 = new google.maps.Data();
    data1.loadGeoJson(url1);
    // do the same for data2, data3 or whatever
    // create some layer control logic for turning on data1
    data1.setMap(map) // or restyle or whatever
    // hide off data1 and turn on data2
    data1.setMap(null) // hides it
    data2.setMap(map) // displays data2
    */
    return {
      [GEOJSON]: Data,
    };
  },

  componentWillUnmount() {
    const Data = getInstanceFromComponent(this);
    if (Data) {
      Data.setMap(null);
    }
  },

  render() {
    return false;
  },
});
