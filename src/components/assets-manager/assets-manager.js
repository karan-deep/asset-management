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
    this.openAssetModalEditor = this.openAssetModalEditor.bind(this);
    this.closeModalEditor = this.closeModalEditor.bind(this);
    this.getAllAssets = this.getAllAssets.bind(this);
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
    return (
      <div className="container-fluid">
        <div className="row d-flex justify-content-center mt-5">
          <div className="col-sm-12">
            <div>
              <h1>Assets</h1>
            </div>
            <div className="table-responsive">
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Asset Type</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Purchase Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-sm-12 d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-warning mb-4"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AssetManager;