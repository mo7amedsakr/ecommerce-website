import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  * {
    text-transform: capitalize;
    font-size: 1.6rem;
  }
  h6 {
    font-weight: ${(props) => props.theme.fontWeight.main};
    margin-bottom: 1rem;
  }
  select {
    padding: 1rem;
    background-color: ${(props) => props.theme.colors.lightGray};
    border: none;
    @media ${(props) => props.theme.mediaQueries.canHover} {
      cursor: pointer;
    }
  }
`;

export interface SelectProps {
  options: string[];
  label: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    return (
      <Container>
        <h6>{props.label}</h6>
        <select ref={ref}>
          {props.options.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      </Container>
    );
  }
);
