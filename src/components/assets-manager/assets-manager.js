import React, { Component } from "react";

class AssetManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      assets: [],
      selectedAssetId: undefined,
      type: "",
    };
  }
  render() {
    return <div></div>;
  }
}

export default AssetManager;
