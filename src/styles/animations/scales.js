
import { keyframes } from 'styled-components'

export const scaleUp = keyframes`
    from {
        scale   : 0;
    }
    to {
        scale: 1;
    }
`

export const scaleDown = keyframes`
    from {
        scale: 1;
    }
    to {
        scale: 0;
    }
`