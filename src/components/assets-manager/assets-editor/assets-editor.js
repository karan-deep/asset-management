import React, { Component } from "react";

class AssetEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      formData: {
        name: "",
        assetTypeId: undefined,
        price: undefined,
        description: "",
        purchaseDate: "",
      },
      errors: {
        name: false,
        assetTypeId: false,
        price: false,
        description: false,
        purchaseDate: false,
      },
    };
  render() {
    return <div></div>;
  }
}

export default AssetEditor;
