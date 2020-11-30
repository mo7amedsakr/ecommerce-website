import React, { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-top: ${(props) => props.theme.border};
  padding-top: 3rem;
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
  margin-top: 3rem;

  @media ${(props) => props.theme.mediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export interface RecommendationProps {
  label: string;
}

export const Recommendation: FC<RecommendationProps> = (props) => {
  return (
    <Container>
      <h2>{props.label}</h2>
      <Cards>{props.children}</Cards>
    </Container>
  );
};
