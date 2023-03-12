import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import { useState } from "react"

export default function SeatsPage() {
  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")
  const navigate = useNavigate()

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

  function form(e) {
    e.preventDefault()
    const urlPost = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"
    const formulario = { name, cpf }

    const promise = axios.post(urlPost, formulario)
    promise.then(res => navigate("/sucesso"))
    promise.catch(err => console.log(err.response.data))
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
        <form onSubmit={form}>
          <label htmlFor="name" >Nome do Comprador: </label>
          <input
            id="name"
            placeholder="Digite seu nome..."
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <label htmlFor="cpf"> CPF do Comprador: </label>
          <input
            id="cpf"
            placeholder="Digite seu CPF..."
            required
            value={cpf}
            onChange={e => setCpf(e.target.value)}
          />
          <Link to={"/sucesso"}>
          <button type="submit">Reservar Assento(s)</button>
          </Link>
        </form>
      </FormContainer>

      <FooterContainer>
        <div>
          <img src={seats.movie.posterURL} alt={seats.title} />
        </div>
        <div>
          <p>{seats.movie.title}</p>
          <p>{seats.day.weekday} - {seats.day.date}</p>
        </div>
      </FooterContainer>

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
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`