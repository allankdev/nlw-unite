
let participantes = [
  {
  nome:'Myke brito ',
  email: 'mayk@gmail.com',
  dataInscricao: new Date(2024, 2, 22, 19, 20),
  dataCheckIn: new Date(2024, 2, 25, 22, 00)
},
 {
  nome:'Lucas lima ',
  email: 'Lucas@gmail.com',
  dataInscricao: new Date(2024, 3, 22, 19, 20),
  dataCheckIn: null 
},
 {
  nome:'Graça ',
  email: 'graça@gmail.com',
  dataInscricao: new Date(2024, 2, 22, 19, 20),
  dataCheckIn: null
},



]

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to
 (participante.dataInscricao)
 let dataCheckIn = dayjs(Date.now()).to
 (participante.dataCheckIn)
 
//condicional 
 if(participante.dataCheckIn == null ) {
  dataCheckIn = `
  <button
  data-email="${participante.email}" 
  onclick="fazerCheckIn(event)"
  >
    
  Confirmar check-in
  </button>
  
  ` 

 }


  return `
  <tr>
    <td>
    <strong>
    ${participante.nome}
    </strong>
    <br>
    <small>
    ${participante.email}
    </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
    </tr>
  
  `
  
}

const atualizarLista = (participantes) =>  {
  let output = ' '
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)

  }

  document.querySelector('tbody').innerHTML = output 
} 

atualizarLista(participantes)

const adicionarParticipante = (event) => {
event.preventDefault()

const dadosDoformulario = new FormData(event.target)

const participante = {
  nome: dadosDoformulario.get('nome'),
  email: dadosDoformulario.get("email"),
  dataInscricao: new Date(),
  dataCheckIn: null

}

//verificar se o participante já existe 
const participanteExiste = participantes.find(
  (p) => {
return p.email == participante.email

  }
)

if(participanteExiste){
  alert("Email já cadastrado!")
  return
}


participantes = [participante, ...participantes]
atualizarLista(participantes)

// limpar o formulario 
event.target.querySelector('[name="nome"]').value = ""
event.target.querySelector('[name="email"]').value = ""


}
const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in"

  if(confirm(mensagemConfirmacao)==false) {
    return 
  }

 // alert(resultado) //true ou false boolean
  //encontrar o participante dentro da lista // 
  const participante = participantes.find((p) =>{
    return p.email == event.target.dataset.email
  })
// atualizar o check-in do participante 
participante.dataCheckIn = new Date()

// atualizar a lista de participantes
atualizarLista(participantes)
}


