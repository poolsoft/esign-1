import * as React from "react";
import { lic, License } from "../../module/license";
import LicenseInfoField from "./LicenseInfoField";

class LicenseStatus extends React.Component<any, any> {
  static contextTypes = {
    locale: React.PropTypes.string,
    localize: React.PropTypes.func,
  };

  constructor(props: any) {
    super(props);
    this.change = this.change.bind(this);
  }

  componentDidMount() {
    lic.on(License.CHANGE, this.change);
  }

  componentWillUnmount() {
    lic.removeListener(License.CHANGE, this.change);
  }

  change() {
    this.setState({});
  }

  getInfoText(status): string {
    const { localize, locale } = this.context;

    return status.unlimited ? localize("License.lic_unlimited", locale) : status.message;
  }

  render() {
    const { localize, locale } = this.context;
    const status = lic.getStatus;
    const settings = {
      draggable: false,
    };

    let style: any;
    let styleRow: any;

    if (status.type) {
      style = { color: "red" };
      styleRow = { border: "2px solid red", padding: "5px" };

      if (status.type === "ok") {
        style = { color: "green" };
        styleRow = { border: "2px solid green", padding: "5px" };
      }
    }

    return (
      <div className="row leftshifter">
        <LicenseInfoField title={localize("License.lic_status", locale)} info={this.getInfoText(status)} style={style} styleRow={styleRow} />
        <div className="col s6">
          <a className="waves-effect waves-light btn add-licence-modal-btn" href="#add-licence-key" {...settings}>
            {localize("License.Enter_Key", locale)}
          </a>
        </div>
      </div>
    );
  }
}

export default LicenseStatus;
