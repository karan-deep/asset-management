import React, { Component } from "react";
import moment from "moment";
import AssetEditor from "./assets-editor/assets-editor";
import assetService from "../../services/assets";
import authService from "../../services/auth";

// Class component AssetManager inheriting React.Component gives the component access to React.Component's functions
class AssetManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      assets: [],
      selectedAssetId: undefined,
      type: "",
    };

    //Binding functions to access the state of the component
    this.openAssetModalEditor = this.openAssetModalEditor.bind(this);
    this.closeAssetModalEditor = this.closeAssetModalEditor.bind(this);
    this.getAllAssets = this.getAllAssets.bind(this);
  }

  // React hook that will call getAllAssets function
  componentDidMount() {
    this.getAllAssets();
  }

  // Function for making api call to get all assets
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

  // Function for making api call to delete asset taking 'id' as a parameter
  async deleteAsset(id) {
    try {
      await assetService.delete(id);
      await this.getAllAssets();
    } catch (error) {
      console.error(error);
    }
  }

  // Function for opening modal for asset editor and updating the state object
  openAssetModalEditor(type, selectedAssetId) {
    this.setState({
      show: true,
      type: type,
      selectedAssetId: selectedAssetId,
    });
  }

  // Function for closing modal for asset editor, updating the state object and refreshing assets list by calling getAllAssets function when user saves any asset in the asset editor
  closeAssetModalEditor(refresh) {
    this.setState({
      show: false,
    });
    if (refresh) {
      this.getAllAssets();
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
                  {(this.state.assets || []).length
                    ? this.state.assets.map((asset) => {
                        return (
                          <tr key={asset.id}>
                            <td>{asset.id}</td>
                            <td>{asset.name}</td>
                            <td>
                              {asset.assetTypeId === 1
                                ? "Hardware"
                                : "Software"}
                            </td>
                            <td>{asset.description}</td>
                            <td>${asset.price}</td>
                            <td>
                              {moment(asset.purchaseDate).format("DD MMM,YYYY")}
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() =>
                                  this.openAssetModalEditor("Edit", asset.id)
                                }
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => this.deleteAsset(asset.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
            {!(this.state.assets || []).length && (
              <div className="alert alert-warning" role="alert">
                No Assets Found!
              </div>
            )}
            <div className="row">
              <div className="col-sm-12 d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-warning mb-4"
                  onClick={() => this.openAssetModalEditor("New")}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-secondary mb-4"
                  onClick={() => {
                    authService.isLogin = false;
                    localStorage.clear();
                    this.props.history.push("/login");
                  }}
                >
                  Log Out
                </button>
              </div>
            </div>
            <AssetEditor
              show={this.state.show}
              selectedAssetId={this.state.selectedAssetId}
              type={this.state.type}
              closeAssetModalEditor={this.closeAssetModalEditor}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AssetManager;
