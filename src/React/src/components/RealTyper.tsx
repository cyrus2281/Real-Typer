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
 *   Copyright 2023 Cyrus Mobini (https://github.com/cyrus2281)
 *
 *
 */

import React, { useState, useEffect } from "react";
import {
  CurserOptions,
  cursorBlinkingAnimation,
  cursorBlinkingStyle,
  realType,
  RealTypeOptions,
  realTyperDefaultProps,
  StringTypeOptions,
} from "../utils/RealTyperUtils";

interface RealTyperProps
  extends StringTypeOptions,
    RealTypeOptions,
    CurserOptions {
  classes?: string;
}

export const RealTyper = (props: RealTyperProps) => {
  const [stringOutput, setStringOutput] = useState("");

  useEffect(() => {
    realType(props, setStringOutput);
  }, []);

  return (
    <div className={props.classes}>
      {props.cursorBlink && <style>{cursorBlinkingAnimation}</style>}
      {stringOutput}
      <span style={{ animation: props.cursorBlink ? cursorBlinkingStyle : "" }}>
        {props.cursorCharacter}
      </span>
    </div>
  );
};

RealTyper.defaultProps = realTyperDefaultProps;

export default RealTyper;
