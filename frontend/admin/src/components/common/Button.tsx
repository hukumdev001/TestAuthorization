import React from 'react';

interface Props {
  title: string;
  classNames?: string;
  onClick: () => void;
  disabled?: Boolean;
  type: 'button' | 'submit' | 'reset' | undefined;
}

export function PrimaryButton({
  title,
  classNames,
  disabled,
  type,
  onClick,
}: Props) {
  return (
    <button
      className={` ${
        classNames ||
        'bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white lg:max-w-[144px] w-full'
      } `}
      onClick={() => onClick()}
      disabled={disabled ? true : false}
      type={type}
    >
      {title}
    </button>
  );
}

export function SecondaryButton({
  title,
  classNames,
  disabled,
  type,
  onClick,
}: Props) {
  return (
    <button
      className={`bg-white border-indigo-700 rounded hover:bg-gray-50 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-indigo-700 border lg:max-w-[95px]  w-full ${
        classNames || ''
      } `}
      onClick={() => onClick()}
      disabled={disabled ? true : false}
      type={type}
    >
      {title}
    </button>
  );
}
