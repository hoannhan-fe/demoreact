import styled, { css } from 'styled-components';

export const Root = styled.span<{
  $useCurrentColor?: boolean;
  $altAlignment?: boolean;
}>(
  ({ $useCurrentColor, $altAlignment }) => css`
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    & svg {
      height: 1em;
      line-height: inherit;
      vertical-align: middle;
      width: 1em;
    }

    ${$altAlignment &&
    css`
      height: 1em;
      line-height: 1em;

      & svg {
        vertical-align: unset;
      }
    `}

    ${$useCurrentColor &&
    css`
      svg,
      svg * {
        fill: currentcolor;
      }
    `}
  `,
);
