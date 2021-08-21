import React from "react";
import { withStyles } from "@ui-kitten/components";
import Slider from "../../../lib/Slider";

const BaseSlider: React.FC = (props: any) => {
  const { eva, style, ...restProps } = props;

  return (
    <Slider
      {...restProps}
      thumbTintColor={eva.style.slider.thumbTintColor}
      minimumTrackTintColor={eva.style.slider.minimumTrackTintColor}
      maximumTrackTintColor="#E1E6EA"
      style={[eva.style.slider, style]}
    />
  );
};

const ThemedSlider = withStyles(BaseSlider, (theme) => ({
  slider: {
    thumbTintColor: theme["color-primary-500"],
    minimumTrackTintColor: theme["color-primary-500"],
  },
}));

export default ThemedSlider;
