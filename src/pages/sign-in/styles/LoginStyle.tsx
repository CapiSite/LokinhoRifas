import styled from "styled-components"

export const Background = styled.div`
display:flex;
@media (max-width: 800px) {
    flex-direction:column;
}
`

export const Left = styled.div`
background-color:#151515;
width:60%;
height:100vh;
color:white;
padding-top:33vh;
padding-left:15vh;
font-weight:700;
h1{
    font-size:106px;
    font-family: 'Passion One', cursive;
}
p{
    font-size:43px;
    font-family: 'Oswald', sans-serif;
    width:442px;
}
@media (max-width: 960px) {
    p{
    width:100%;
}
}
@media (max-width: 800px) {
    width:100%;
    height:25vh;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    padding:50px;
    text-align:center;
    h1{
        font-size:76px;
        height:100%;
    }
    p{
        font-size:23px;
    }
}

`

export const Right = styled.div`
background-color: #333333;
width:40%;
height:100vh;
padding-top:33vh;
display:flex;
justify-content:center;

form{
    display:flex;
    flex-direction:column;
    align-items:center;
    width:80%;
    height:${(props: any) => props.forms ? "400px" : "260px"};
    justify-content:space-between;
}
input, button:nth-child(3), button:nth-child(5){
    width:100%;
    height:65px;
    border-radius:6px;
    border:0px;
    font-size:27px;
    font-family: 'Oswald', sans-serif;
    font-weight:700;
    display:flex;
    align-items:center;
    padding-left:20px

}

input::placeholder{
    color:#9F9F9F;

}
button:nth-child(3), button:nth-child(5){
    background-color: #1877F2;
    justify-content:center;
    color:white;
}
button:nth-child(3):disabled, button:nth-child(5):disabled{
    background-color: #6cadfc;
}
button:nth-child(3):disabled:hover, button:nth-child(5):disabled:hover{
    background-color: #6cadfc;
}
button:last-child{
    background-color:#333333;
    color:white;
    font-size:20px;
    font-weight:400;
    font-family: 'Lato', sans-serif;
    text-decoration:underline;
    border:0;
}
button{
    cursor: pointer;
}
button:nth-child(3):hover, button:nth-child(5):hover{
    background-color: #1766F2;
}

@media (max-width: 800px) {
    width:100%;
    height:75vh;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    padding:0;
    text-align:center;
    input, button:nth-child(3), button:nth-child(5){
        width:330px;
        height:55px;
    }
}
@media (max-width: 600px) {
    form{
        width:80%;
    }
    input, button:nth-child(3), button:nth-child(5){
        width:100%;
        height:55px;
    }
}

`