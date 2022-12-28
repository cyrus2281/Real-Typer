/**
 *   Real-Typer for React
 *
 *   A React component that gives the effect of typing for texts
 *
 *   author: Cyrus Mobini
 *
 *   Licensed under the MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 *   Copyright 2022 Cyrus Mobini (https://github.com/cyrus2281)
 *
 *
 */

import React from "react";
import { realType, RealTypeOptions, realTyperDefaultProps, StringTypeOptions 
} from "../utils/RealTyperUtils";

interface RealTyperProps extends StringTypeOptions, RealTypeOptions {
  classes?: string;
}

export default class RealTyper extends React.Component<RealTyperProps>{
  static defaultProps: RealTyperProps = realTyperDefaultProps

  state = {
    stringOutput: "",
  };

  componentDidMount() {
    realType(this.props, this.setOutput)
  }

  setOutput = (string: string) => {
    this.setState({
      stringOutput: string,
    });
  };

  render() {
    return <div className={this.props.classes}>{this.state.stringOutput}</div>;
  }
}
