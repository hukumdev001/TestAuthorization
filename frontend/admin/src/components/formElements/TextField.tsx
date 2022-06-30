import React from 'react';

interface Props {
  desc: string;
  title: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'email' | 'text' | 'password';
  errors?: boolean | string;
}

export default function TextField({
  desc,
  title,
  value,
  name,
  type,
  errors,
  onChange,
}: Props) {
  return (
    <div>
      <p className='text-base font-medium leading-none text-gray-800 capitalize'>
        {title}
      </p>
      <input
        type={type || 'text'}
        className='w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50'
        name={name}
        value={value}
        onChange={(val) => onChange(val)}
      />
      <p className='mt-3 text-xs leading-3 text-red-600'>{errors}</p>
      <p className='mt-3 text-xs leading-3 text-gray-600'>{desc}</p>
    </div>
  );
}
