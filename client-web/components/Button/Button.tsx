import React from 'react';

export interface Props {
  text: string;
  onClick: () => void;
}

export const Button: React.FunctionComponent<Props> = ({ text, onClick }) => {
  return (
    <button
      className="w-full bg-purple-regular hover:bg-purple-dark focus:outline-none text-white font-bold py-4 px-6 text-sm rounded-md shadow-md"
      onClick={onClick}
      data-testid="button"
    >
      {text}
    </button>
  );
};
