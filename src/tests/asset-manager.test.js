import { shallow, mount } from "enzyme";
import AssetEditor from "../components/assets-manager/assets-editor/assets-editor";
import AssetManager from "../components/assets-manager/assets-manager";

describe("Asset-Manager Component tests", () => {
  it("Rendering without crashing", () => {
    shallow(<AssetManager />);
  });
  it("Checking values when sending props to the child component AssetEditor", () => {
    const props = {
      show: true,
      type: "",
      selectedAssetId: 3,
      closeAssetModalEditor: () => {},
    };
    const assetEditor = mount(
      <AssetEditor
        show={props.show}
        selectedAssetId={props.selectedAssetId}
        type={props.type}
        closeAssetModalEditor={props.closeAssetModalEditor}
      />
    );
    expect(assetEditor.props().show).toBe(true);
    expect(assetEditor.props().selectedAssetId).toBe(3);
  });
});
