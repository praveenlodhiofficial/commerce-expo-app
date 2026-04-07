import React from "react";
import { Text, View } from "react-native";
import Svg, {
  ClipPath,
  Defs,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Image as SvgImage,
} from "react-native-svg";

type Props = {
  uri: string;
  width?: number;
  height?: number;
  title?: string;
};

export default function HexagonCard({
  uri,
  width = 250,
  height = 275,
  title,
}: Props) {
  const pathData = `M118.907 5.73846C131.081 -1.24628 146.047 -1.24629 158.221 5.73846L256.786 62.2892C269.059 69.3311 276.628 82.4 276.629 96.55V209.218C276.628 223.368 269.059 236.437 256.786 243.479L158.221 300.029C146.047 307.014 131.081 307.014 118.907 300.029L20.3424 243.479C8.06915 236.437 0.499737 223.368 0.499619 209.218V96.55C0.499739 82.4 8.06915 69.3311 20.3424 62.2892L118.907 5.73846Z`;

  return (
    <View className="items-center justify-center">
      <Svg width={width} height={height} viewBox="0 0 278 306">
        <Defs>
          <ClipPath id="clip">
            <Path d={pathData} />
          </ClipPath>

          {/* Gradient overlay */}
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="transparent" />
            <Stop offset="60%" stopColor="rgba(0,0,0,0.2)" />
            <Stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
          </LinearGradient>
        </Defs>

        {/* Image */}
        <SvgImage
          href={{ uri }}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#clip)"
        />

        {/* Gradient overlay */}
        <Rect
          width="100%"
          height="100%"
          fill="url(#grad)"
          clipPath="url(#clip)"
        />

        {/* Border */}
        <Path d={pathData} stroke="rgba(0,0,0,0.08)" fill="none" />
      </Svg>

      {/* TEXT OVERLAY */}
      {title && (
        <Text className="absolute bottom-10 h-fit w-40 items-center px-4 text-center text-lg font-bold text-white">
          {title?.split(" ").map((word, index) => (
            <Text key={index}>
              {word}
              {"\n"}
            </Text>
          ))}
        </Text>
      )}
    </View>
  );
}
