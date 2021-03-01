import Login from "../components/login/login";
import { shallow } from "enzyme";

describe("Login Component tests", () => {
  it("Rendering without crashing", () => {
    shallow(<Login />);
  });
  it("Re-rendering when state object changed/updated and the value of respective input field", () => {
    const loginComponent = shallow(<Login />);
    loginComponent.setState({
      formData: {
        email: "test@gmail.com",
        password: "123456",
      },
      errors: {},
    });
    expect(loginComponent.state()).toEqual({
      formData: {
        email: "test@gmail.com",
        password: "123456",
      },
      errors: {},
    });
    expect(loginComponent.find("input[name='email']").props().value).toBe(
      "test@gmail.com"
    );
    expect(loginComponent.find("input[name='password']").props().value).toBe(
      "123456"
    );
  });
});
