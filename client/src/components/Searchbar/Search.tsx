import React, { FC } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Form } from './SearchStyles';

export interface SearchProps {}

export const Search: FC<SearchProps> = (props) => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <button type="submit">
        <FiSearch />
      </button>
      <input type="text" placeholder="Search" />
    </Form>
  );
};
