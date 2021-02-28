import React, { Component } from "react";
import moment from "moment";
import assetService from "../../services/assets";
import authService from "../../services/auth";

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
    this.closeAssetModalEditor = this.closeAssetModalEditor.bind(this);
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

  openAssetModalEditor(type, selectedAssetId) {
    this.setState({
      show: true,
      type: type,
      selectedAssetId: selectedAssetId,
    });
  }

  closeAssetModalEditor(refresh) {
    this.setState({
      show: false,
    });
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
                  {this.state.assets &&
                    this.state.assets.length &&
                    this.state.assets.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>
                            {item.assetTypeId === 1 ? "Hardware" : "Software"}
                          </td>
                          <td>{item.description}</td>
                          <td>{item.price}</td>
                          <td>
                            {moment(item.purchaseDate).format("DD MMM,YYYY")}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
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
