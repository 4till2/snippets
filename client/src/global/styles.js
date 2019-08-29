import styled from 'styled-components';

export const Button = styled.button`
    box-shadow: 0 0 2px 2px aliceblue;
    border: 1px solid #fffaf0; 
    border-radius: 4px;
    font-weight: 300;
    padding: 15px;
    margin: ${props => props.margin || 0};
    color: ${props => props.danger ? "#f74c4c" : props.warning ? "#f78b4c" : "" };
    
    :hover {
        box-shadow: 0 0 2px 2px rgb(182, 216, 247);
      }
`;

export const Title = styled.h2 `
`;

export const Container = styled.div `
    padding: 20px;
    background-color: ${props => props.bc || ''};
`;

export const Input = styled.input `
    padding: 15px;
    margin: 10px;
    box-shadow: 0 0 13px 1px aliceblue;
    border: none;
    outline: none;

    :focus{
        box-shadow: 0 0 2px 2px rgb(182, 216, 247);
    } 
`;

export const SnippetTag = styled.span `
    padding: 5px 10px;
    margin: 5px;
    background-color: #fffaf0;
    border-radius: 20px;
    display: inline-block;
    cursor: ${props => props.selectable ? 'crosshair' : 'inherit'}
    user-select: ${props => props.selectable ? 'none' : 'inherit'}

    &.active {
        background-color: rgb(218, 255, 196);
    }
`;