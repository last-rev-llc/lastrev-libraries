import { keyframes } from 'styled-components';

export const fadeInUp = keyframes`
from {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
to {
  opacity: 1;
}
`;

export const fadeInDown = keyframes`
from {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
to {
  opacity: 1;
}
`;

export const scaling = keyframes`
  0%  {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100%{
    transform: scale(1);
  }
`;

export const fadeInRight = keyframes`
from {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

to {
  opacity: 1;
}
`;

export const fadeInLeft = keyframes`
from {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

to {
  opacity: 1;
}
`;
