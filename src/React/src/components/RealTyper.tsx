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

import React, {useState, useEffect } from "react";
import { realType, RealTypeOptions, realTyperDefaultProps, StringTypeOptions 
} from "../utils/RealTyperUtils";

interface RealTyperProps extends StringTypeOptions, RealTypeOptions {
  classes?: string;
}

export const RealTyper = (props: RealTyperProps) => { 
  const [stringOutput, setStringOutput] = useState("");

  useEffect(() => {
    realType(props, setStringOutput);
  }, []);

  return <div className={props.classes}>{stringOutput}</div>;
}

RealTyper.defaultProps = realTyperDefaultProps;

export default RealTyper;