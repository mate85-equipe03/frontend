/* eslint-disable react/no-unknown-property */

import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import Grid from "@mui/material/Grid";

interface IProps {
  color?: "primary" | "secondary";
}

const getFillColor = (color: string | undefined): string => {
  switch (color) {
    case "primary": {
      return "#00297a";
    }
    case "secondary": {
      return "#ffffff";
    }
    default: {
      return "#00297a";
    }
  }
};

function Loading({ color }: IProps) {
  const fillColor = getFillColor(color);

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <SvgIcon viewBox="0 0 100 100">
        <g transform="translate(80,50)">
          <g transform="rotate(0)">
            <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="1">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.875s"
                values="1.5 1.5;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.875s"
              />
            </circle>
          </g>
        </g>
        <g transform="translate(71.21320343559643,71.21320343559643)">
          <g transform="rotate(45)">
            <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.875">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.75s"
                values="1.5 1.5;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.75s"
              />
            </circle>
          </g>
        </g>
        <g transform="translate(50,80)">
          <g transform="rotate(90)">
            <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.75">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.625s"
                values="1.5 1.5;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.625s"
              />
            </circle>
          </g>
        </g>
        <g transform="translate(28.786796564403577,71.21320343559643)">
          <g transform="rotate(135)">
            <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.625">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.5s"
                values="1.5 1.5;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.5s"
              />
            </circle>
          </g>
        </g>
        <g transform="translate(20,50.00000000000001)">
          <g transform="rotate(180)">
            <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.5">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.375s"
                values="1.5 1.5;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.375s"
              />
            </circle>
          </g>
        </g>
        <g transform="translate(28.78679656440357,28.786796564403577)">
          <g transform="rotate(225)">
            <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.375">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.25s"
                values="1.5 1.5;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.25s"
              />
            </circle>
          </g>
        </g>
        <g transform="translate(49.99999999999999,20)">
          <g transform="rotate(270)">
            <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.25">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.125s"
                values="1.5 1.5;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.125s"
              />
            </circle>
          </g>
        </g>
        <g transform="translate(71.21320343559643,28.78679656440357)">
          <g transform="rotate(315)">
            <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.125">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="0s"
                values="1.5 1.5;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="0s"
              />
            </circle>
          </g>
        </g>
      </SvgIcon>
    </Grid>
  );
}

Loading.defaultProps = {
  color: "primary",
};

export default Loading;
