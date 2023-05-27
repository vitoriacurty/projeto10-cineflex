import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Footer from "../../components/Footer"

export default function SeatsPage() {
  const { idSessao } = useParams()
  const [seats, setSeats] = useState(undefined)

  useEffect(() => {
    const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
    const promise = axios.get(url)

    promise.then((res) => {
      setSeats(res.data)
      console.log(res.data)
    })
    promise.catch((err) => {
      console.log(err.response.data)
    })
  }, [])

  if (seats === undefined) {
    return <div>Carregando...</div>
  }

  return (
    <PageContainer>
      Selecione o(s) assento(s)


      <SeatsContainer>
        {seats.seats.map((s) => (
          <SeatItem key={s.id}>{s.name}</SeatItem>
        ))}
      </SeatsContainer>

      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle />
          Indisponível
        </CaptionItem>
      </CaptionContainer>

      <FormContainer>
        Nome do Comprador:
        <input placeholder="Digite seu nome..." />

        CPF do Comprador:
        <input placeholder="Digite seu CPF..." />

        <button>Reservar Assento(s)</button>
      </FormContainer>

      <Footer posterURL={seats.movie.posterURL} title={seats.movie.title}>
        <p>{seats.movie.title}</p>
        <p>{seats.day.weekday} - {seats.name}</p>
      </Footer>

    </PageContainer>
  )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
