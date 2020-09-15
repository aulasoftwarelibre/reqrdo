import useWindowSize from '@rehooks/window-size';
import React from 'react';
import { Arc, Circle, Layer, Stage, Text } from 'react-konva';

export interface Props {
  range: number;
  value: number;
  radius: number;
}

export const CircularProgressBar: React.FunctionComponent<Props> = ({
  range,
  value,
  radius = 400,
}) => {
  const limit = range <= 0 ? 1 : range;
  const counter = value < 0 ? 0 : value > limit ? limit : value;

  const windowSize = useWindowSize();
  const size = Math.min(windowSize.innerHeight, windowSize.innerWidth, radius);

  const angle = (360 * counter) / limit;

  return (
    <div data-testid="circular-progress-bar">
      <Stage width={size} height={size}>
        <Layer>
          <Circle
            x={size / 2}
            y={size / 2}
            stroke="#1B143F"
            radius={size * 0.4}
            strokeWidth={size * 0.08}
            shadowBlur={20}
          />
          <Arc
            x={size / 2}
            y={size / 2}
            innerRadius={size * 0.4}
            outerRadius={size * 0.4}
            angle={angle}
            lineCap="round"
            lineJoin="round"
            strokeWidth={size * 0.08}
            stroke={'#7012CE'}
            rotation={-90}
          />
          <Text
            text={counter.toString()}
            fill={'white'}
            fontSize={size * 0.2}
            fontStyle={'bold'}
            fontFamily={'Lato'}
            verticalAlign={'middle'}
            align={'center'}
            width={size}
            height={size}
          />
        </Layer>
      </Stage>
    </div>
  );
};
