import React, { Component } from "react";
import moment from "moment";
import { Modal, Button, Form, Col } from "react-bootstrap";
import validator from "validator";
import assetService from "../../../services/assets";

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
    this.isFormSubmitted = false;
    this.onSaveAsset = this.onSaveAsset.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.validatingInput = this.validatingInput.bind(this);
    this.resetFormValidation = this.resetFormValidation.bind(this);
    this.checkGetAssetOperationType = this.checkGetAssetOperationType.bind(
      this
    );
  }

  checkGetAssetOperationType() {
    if (this.props.type === "Edit") {
      this.getAssetById(this.props.selectedAssetId);
    }
  }

  onValueChange(event) {
    const { formData } = this.state;
    this.setState(
      {
        formData: {
          ...formData, // leaving other values unchanged
          [event.target.name]: event.target.value, // updating changed value
        },
      },
      () => {
        if (this.isFormSubmitted) {
          this.validatingInput();
        }
      }
    );
  }

  validatingInput() {
    let isValid = true;
    let { formData, errors } = this.state;
    const { name, assetTypeId, price, description, purchaseDate } = formData;
    if (validator.isEmpty(name)) {
      // validation for name required
      isValid = false;
      errors = {
        ...errors,
        name: true,
      };
    } else {
      errors = {
        ...errors,
        name: false,
      };
    }
    if (!assetTypeId) {
      // validation for assetTypeId required
      isValid = false;
      errors = {
        ...errors,
        assetTypeId: true,
      };
    } else {
      errors = {
        ...errors,
        assetTypeId: false,
      };
    }
    if (!price) {
      // validation for price required
      isValid = false;
      errors = {
        ...errors,
        price: true,
      };
    } else {
      errors = {
        ...errors,
        price: false,
      };
    }
    if (validator.isEmpty(description)) {
      // validation for description required
      isValid = false;
      errors = {
        ...errors,
        description: true,
      };
    } else {
      errors = {
        ...errors,
        description: false,
      };
    }
    if (validator.isEmpty(purchaseDate)) {
      // validation for purchaseDate required
      isValid = false;
      errors = {
        ...errors,
        purchaseDate: true,
      };
    } else {
      errors = {
        ...errors,
        purchaseDate: false,
      };
    }
    if (isValid) {
      errors = {
        name: false,
        assetTypeId: false,
        price: false,
        description: false,
        purchaseDate: false,
      };
    }
    this.setState({
      errors: errors,
    });
  }

  async getAssetById(id) {
    try {
      let asset = await assetService.getAsset(id);
      asset.data.purchaseDate = moment(asset.data.purchaseDate).format(
        "yyyy-MM-DD"
      );
      this.setState({
        formData: asset.data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async onSaveAsset(event) {
    this.isFormSubmitted = true;
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      this.validatingInput();
    } else {
      const requestBody = this.state.formData;
      if (this.props.type === "New") {
        await assetService.create(requestBody);
      } else {
        await assetService.update(this.props.selectedAssetId, requestBody);
      }
      this.props.closeAssetModalEditor(true);
      this.resetFormValidation();
    }
  }

  resetFormValidation() {
    this.isFormSubmitted = false;
    this.setState({
      formData: {
        name: "",
        assetTypeId: "",
        price: "",
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
    });
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        size="lg"
      >
        <Form noValidate onSubmit={this.onSaveAsset}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.type} Asset</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Asset Type</Form.Label>
                <Form.Control
                  as="select"
                  name="assetTypeId"
                  required
                >
                  <option value="" disabled>
                    Select a Asset Type
                  </option>
                  <option value="1">Hardware</option>
                  <option value="2">Software</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter description"
                required
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Purchase Date</Form.Label>
                <Form.Control
                  type="date"
                  name="purchaseDate"
                  required
                />
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                this.resetFormValidation();
                this.props.closeAssetModalEditor(false);
              }}
            >
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default AssetEditor;
