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
  async getAllAssets() {
    try {
      const assets = await assetService.getAssets();
      this.setState({
        assets: assets.data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAsset(id) {
    try {
      await assetService.delete(id);
      await this.getAllAssets();
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return <div></div>;
  }
}

export default AssetManager;
