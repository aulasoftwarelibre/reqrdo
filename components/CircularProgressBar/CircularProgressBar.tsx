import React from 'react';
import { Arc, Circle, Layer, Stage, Text } from 'react-konva';

export interface Props {
  range: number;
  value: number;
}

export const CircularProgressBar: React.FunctionComponent<Props> = ({
  range,
  value,
}) => {
  const limit = range <= 0 ? 1 : range;
  const counter = value < 0 ? 0 : value > limit ? limit : value;

  const angle = (360 * counter) / limit;

  return (
    <Stage width={400} height={400}>
      <Layer>
        <Circle
          x={200}
          y={200}
          stroke="#1B143F"
          radius={180}
          strokeWidth={30}
        />
        <Arc
          x={200}
          y={200}
          innerRadius={180}
          outerRadius={180}
          angle={angle}
          lineCap="round"
          lineJoin="round"
          strokeWidth={32}
          stroke={'#7012CE'}
          rotation={-90}
        />
        <Text
          x={180}
          y={160}
          text={counter.toString()}
          fill={'white'}
          fontSize={80}
          fontStyle={'bold'}
          fontFamily={'Lato'}
          verticalAlign={'middle'}
          align={'center'}
        />
      </Layer>
    </Stage>
  );
};

export default CircularProgressBar;
