import styled from 'styled-components'

export const ContainerAdsTemplate = styled.div`
  width: 100vw;
  min-height: 100vh;

  padding: 20px;

  .buttons {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;

    button {
      padding: 20px 30px;
      border-radius: 5px;
      border: none;
      background-color: lightblue;
      color: black;
      font-size: 16px;
      /* radius */
      border-radius: 5px;

      :hover {
        background-color: lightblue;
        cursor: pointer;
        color: black;
      }
    }
  }
  .filter {
    width: 60%;
    margin: auto;
    margin-bottom: 80px;
  }
`
