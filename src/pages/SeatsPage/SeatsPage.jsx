import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import Footer from "../../components/Footer"

export default function SeatsPage({ status, setStatus }) {
  const { idSessao } = useParams()
  const [seats, setSeats] = useState(undefined)
  const [selectedSeats, setSelectedSeats] = useState([])
  // const [reserved, setReserved] = useState([])
  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")
  const navigate = useNavigate()


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

  function seatState(seat) {
    if (!seat.isAvailable) {
      alert("Esse assento não está disponível")
    } else {
      const isSelected = selectedSeats.some((s) => s.id === seat.id)
      const updatedSeats = isSelected
        ? selectedSeats.filter((s) => s.id !== seat.id)
        : [...selectedSeats, seat]

      setSelectedSeats(updatedSeats)
    }
  }

  function form(e) {
    e.preventDefault()
    const urlPost = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"
    const ids = selectedSeats.map((s) => s.id)
   
    const formulario = { ids, name, cpf }
    console.log(formulario)

    const promise = axios.post(urlPost, formulario)

    promise.then((res) => {
      const info = {
        buyer: {
          name,
          cpf,
          ids,
        },
        movie: seats.movie.title,
        date: seats.day.date,
        hour: seats.name,
      }
      console.log(res.data)
      setStatus(info)
      navigate("/sucesso")
    })

    promise.catch((err) => {
      console.log(err.renponse.data)
    })
  }

  return (
    <PageContainer>
      Selecione o(s) assento(s)


      <SeatsContainer>
        {seats.seats.map((st) => (
          <SeatItem
            data-test="seat"
            key={st.id}
            onClick={() => seatState(st)}
            seatcolor={!st.isAvailable ? "indisponivel" : selectedSeats.some((s) => s.id === st.id) ? "selecionado" : "disponivel"}>
            {st.name}
          </SeatItem>
        ))}
      </SeatsContainer>

      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle seatcolor={"selecionado"} />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle seatcolor={"disponivel"} />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle seatcolor={"indisponivel"} />
          Indisponível
        </CaptionItem>
      </CaptionContainer>

      <FormContainer onSubmit={form}>
        <label htmlFor="name">Nome do Comprador:</label>
        <input data-test="client-name" 
        id="name" 
        placeholder="Digite seu nome..." 
        required
        value={name}
        onChange={e => setName(e.target.value)}
        />

        <label htmlFor="cpf">CPF do Comprador:</label>
        <input data-test="client-cpf"
        id="cpf" 
        placeholder="Digite seu CPF..." 
        required
        value={cpf}
        onChange={e => setCpf(e.target.value)}
        />

        <button data-test="book-seat-btn" type="submit">Reservar Assento(s)</button>
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
const FormContainer = styled.form`
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
    border: 1px solid ${(props) => {
    if (props.seatcolor === "disponivel") {
      return "#7B8B99"
    } else {
      if (props.seatcolor === "selecionado") {
        return "#0E7D71"
      } else {
        if (props.seatcolor === "indisponivel") {
          return "#F7C52B"
        }
      }
    }
  }};
    background-color: ${(props) => {
    if (props.seatcolor === "disponivel") {
      return "#C3CFD9"
    } else {
      if (props.seatcolor === "selecionado") {
        return "#1AAE9E"
      } else {
        if (props.seatcolor === "indisponivel") {
          return "#FBE192"
        }
      }
    }
  }};
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
     border: 1px solid ${(props) => {
    if (props.seatcolor === "disponivel") {
      return "#7B8B99"
    } else {
      if (props.seatcolor === "selecionado") {
        return "#0E7D71"
      } else {
        if (props.seatcolor === "indisponivel") {
          return "#F7C52B"
        }
      }
    }
  }};
    background-color: ${(props) => {
    if (props.seatcolor === "disponivel") {
      return "#C3CFD9"
    } else {
      if (props.seatcolor === "selecionado") {
        return "#1AAE9E"
      } else {
        if (props.seatcolor === "indisponivel") {
          return "#FBE192"
        }
      }
    }
  }};
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
