
import { keyframes } from 'styled-components'

export const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

export const fadeOut = keyframes`
    from {
        top: var(--header-height);
        opacity: 1;
    }
    to {
        top: 0;
        opacity: 0;
    }
`