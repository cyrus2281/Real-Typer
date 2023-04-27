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
  Emit,
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
type EmitRef = {
  current: { emit: Emit };
};

export const RealTyper = React.forwardRef((props: RealTyperProps, ref) => {
  const [stringOutput, setStringOutput] = useState("");

  useEffect(() => {
    const emit = realType(props, setStringOutput);
    if (ref && (ref as EmitRef).current) {
      (ref as EmitRef).current.emit = emit;
    }
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
});

RealTyper.defaultProps = realTyperDefaultProps;

export default RealTyper;
