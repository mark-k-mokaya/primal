import styled from 'styled-components';

export const BackgroundImage = styled.div`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-image: ${({imageUrl}) => `url(${imageUrl})`};
    position: absolute;
    top: 0;
    z-index: 0;
`;

export const Body = styled.div`
    z-index: 5;
    margin-top: 100%;

    h2{
        background-color: rgba(0,0,0,1);
        color: #fff;
        margin-bottom: 0;
        padding: 30px;
    }

    p{
        margin: 20px;
        padding: 10px;
        background-color: black;
        color: #fff;
    }
`;

export const DirectoryItemContainer = styled.div`
    min-width: 28%;
    height: 100%;
    text-align: center;
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    grid-template-columns: 1fr;
    box-shadow: 0 0 5px #000;
    position: relative;

    &:hover{
        cursor: pointer;

        & ${BackgroundImage}{
            transform: scale(1.01);
            transition: all 0.5s;
        }
        
        & ${Body}{
            opacity: 0.9;
        }
    }
`;


