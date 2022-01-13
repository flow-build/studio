import styled from 'styled-components'

export const Dropdown = styled.div`
    position: relative;
`

export const Content = styled.div`
    background: #fff;
    border-radius: 5px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    max-width: 320px;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: calc(100% + 5px);
    transform-origin: top right;
    transform: scale(0);
    transition: 0.3s ease 0s;
    width: max-content;
    z-index: 9999;

    &.active {
        transform: scale(1);
        transition: transform .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
`

export const Button = styled.button`
    background-color: unset;
    border: 0;
    color: #455560;
    cursor: pointer;
    outline: 0;

    & > svg {
        font-size: 2rem;
    }
`

export const Badge = styled.span`
    align-items: center;
    background-color: #2D77EF;
    border-radius: 50%;
    color: #fff;
    display: flex;
    font-size: 0.8rem;
    height: 25px;
    justify-content: center;
    position: absolute;
    right: -10px;
    top: -12px;
    width: 25px;
`