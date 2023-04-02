
/*Um objeto que contém outros objetos, a primeira key representa em que
'passo' o usuario está, se é no cadastro, se é na consulta etc (passo1, passo2...)
A segunda key do objeto representa a 
escolha do usuario (botao 1 ou 2), e o Valor da key é uma função será executada,
-A função respostaChat será explicada mais abaixo-
*/
const Passos =
{
    passo1:
    {
        1: function () {
            respostaChat('agendar')
        },
        2: function () {
            respostaChat('horario')
        }
    },

    passo2:
    {
        1: function () {
            respostaChat('agendarDia')
        },
        2: function () {
            respostaChat('agendarDia')
        },
        3: function () {
            respostaChat('agendarDia')
        },
        4: function () {
            respostaChat('agendarDia')
        },
        5: function () {
            respostaChat('agendarDia')
        }
    },
    passo3:
    {
        1: function () {
            respostaChat('Sucesso')
        },
        2: function () {
            respostaChat('agendar')
        }

    },
    passo4:
    {
        1: function () {
            respostaChat('horario')
        },
        2: function () {
            respostaChat('finalizar')
        }
    },
    reiniciar: {
        1: function () {
            respostaChat('iniciar')
        }
    }
}



//Variavel de saida das respostas do usuario / chat - Cod html
const output = document.querySelector('.textos')

//Variavel que vai armazenar o dia da consulta, será usada mais em baixo
var consultaZ;

//Função que detecta o click dos botões e vê qual opção foi escolhida
function escolha(passo) {
    //variavel com métodos do DOM
    var botao = document.querySelectorAll('.chatbot button')

    //Função que percorre todos os botoes que tenham a classe '.chatbot'
    botao.forEach(e => {
        //ADICIONA UM EVENTO DE CLIQUE
        e.addEventListener('click', event => {
            //PEGA O 'ID' DO BOTAO QUE FOI CLICADO
            const botaoClicado = event.target.id;

            //VARIAVEL GLOBAL QUE SERA USADA DEPOIS
            data = e.textContent

            //FUNÇÃO QUE MOSTRA O BALAO DE MENSAGEM DO USUARIO NO CHAT
            inputUsuario(botaoClicado)
            //EXPLICO ESSA FUNÇÃO MAIS EM BAIXO
            percorrePassos(passo, botaoClicado)
        })
    })
}

//Executa a função acima, com o parametro mostrando em qual passo estamos, como é a primeira mensagem do chat logo passo 1
escolha('passo1')

//Essa função percorre o objeto 'Passos' lá em cima e retorna o resultado, o primeiro parametro 'pergunta' é o Passo que devemos ir,
//A 'Escolha' é a opção que o usuário escolheu
function percorrePassos(pergunta, escolha) {
    return Passos[pergunta][escolha]()
}

//VARIAVEL GLOBAL QUE SERA USADA PARA DEFINIR UM 'ID' UNICO PARA CADA 'verificada de código', pois estava tendo um bug
//em que por ser gerado sempre um 'chat' com id 'codUser' lá em baixo estava dando conflito, esta foi a solução que achei para solucionar esse problema
//Gambiarra? talvez, mas funciona
geraId = 0

/*Essa função contém um código js/html para mostrar na tela as possiveis respostas do chat, dependendo da resposta do usuario..
Essa função é executada pelo objeto 'Passos' que temos no começo do algoritmo */
function respostaChat(assunto) {

    //Verifica se o parametro recebido é igual ao escrito e executa o 'chat' do bot 
    if (assunto == 'iniciar') {
        output.innerHTML += `<div class="bot">
        <img src="./img/bot.png">
        <div class="chatbot">
            <p>Bem vindo ao canal de comunicações da clinica tal, eu sou o chatbot e irei auxilia-ló, para
                começar, escolha uma das opções abaixo:
            </p>
            <ul>
                <li><button id="1">01</button> Agendar uma consulta</li>
                <li><button id="2">02</button>Ver horário da consulta</li>
            </ul>
        </div>

    </div>`

        geraId++
        //Após a 'fala' do chat sempre executamos a função de escolha dizendo para qual passo devemos ir, pois cada passo as opções são diferentes
        //E assim são todos os 'Ifs' abaixo..
        escolha('passo1')
    }

    else if (assunto == 'agendar') {
        output.innerHTML += `
        <div class="bot">
            <img src="./img/bot.png">
            <div class="chatbot">
                <p>Muito bem, os dias disponíveis para consulta são:
                </p>
                <ul>
                    <li><button id="1">04/04/2023 - 14hrs</button></li>
                    <li><button id="2">04/04/2023 - 16hrs</button> </li>
                    <li><button id="3"> 05/04/2023 - 08hrs</button></li>
                    <li><button id="4">05/04/2023 - 10hrs</button> </li>
                    <li><button id="5"> 05/04/2023 - 14hrs</button></li>
                </ul>
                <p>Escolha o dia que deseja agendar..
                </p>
            </div>
        </div>
        `


        escolha('passo2')
    }

    else if (assunto == 'horario') {

        output.innerHTML += `
        <div class="bot">
            <img src="./img/bot.png">
            <div class="chatbot">
                <p>Muito bem, para verificarmos os detalhes da sua consulta precisaremos que você
                insira o código aqui:
                </p>
                <ul>
                    <input type='text' placeholder = 'Seu código' id='codUser`+ geraId + `' required>
                    <button id='codigo`+ geraId + `'>Enviar</button>
                </ul>
                
            </div>
        </div>
        `

        console.log(document.querySelector(`#codUser` + geraId + ``));
        //função a ser explicada embaixo
        verificaCódigo()

    }

    else if (assunto == 'agendarDia') {
        output.innerHTML += `
        <div class="bot">
            <img src="./img/bot.png">
            <div class="chatbot">
                <p>A data escolhida foi ${data}, Confima essa escolha?
                </p>
                <ul>
                    <li><button id="1">Sim</button></li>
                    <li><button id="2">Não</button></li>
                </ul>
                
            </div>
        </div>
        `
        consultaZ = data
        escolha('passo3')
    }

    else if (assunto == 'Sucesso') {
        output.innerHTML += `
        <div class="bot">
            <img src="./img/bot.png">
            <div class="chatbot">
                <p>Muito bem! Consulta marcada com sucesso, o código da sua consulta
                é '12345'
                </p>
                <ul>
                    <li>Para ver detalhes da consulta clique <button id="1">AQUI</button> Ou</li>
                    <li><button id="2">Encerrar atendimento</button></li>
                </ul>
                
            </div>
        </div>`

        escolha('passo4')
    }

    else if (assunto == 'finalizar') {
        output.innerHTML += `
        <div class="bot">
            <img src="./img/bot.png">
            <div class="chatbot">
                <p>Estaremos encerrando seu atendimento, porfavor se tiver qualquer dúvida não
                hesite entrar em contato clicando
                </p>
                <ul>
                    <li><button id="1">AQUI</button></li>
                    
                </ul>
                
            </div>
        </div>`
        escolha('reiniciar')
    }
}

//Função que mostra o 'balao de chat' do usuario
function inputUsuario(escolha) {
    output.innerHTML += `
    <div class="usuario">
        <div>
            <p> ${escolha}<p>
        </div>
    </div>`
}

function verificaCódigo() {

    //Add um evento de clique no botão de verificar código
    document.querySelector(`#codigo` + geraId + ``).addEventListener('click', () => {
        //Jogamos o que esta escrito no campo de input pra essa variavel
        let codigo = document.querySelector(`#codUser` + geraId + ``);

        //se a var consultaZ (que armazena o dia da consulta) estiver vazia ou o códgo for diferente de 12345 o chat mostra uma mensagem de erro
        //com duas opções, consultar novamente ou marcar uma consulta
        if (consultaZ == undefined || codigo.value != '12345') {
            output.innerHTML += `
            <div class="bot">
                <img src="./img/bot.png">
                <div class="chatbot">
                    <p>Parece que você ainda não marcou nenhuma consulta ou seu código está incorreto
                    </p>
                    <ul>
                    <li><button id="1">01</button>Marque uma consulta aqui</li>
                    <li><button id="2">02</button>Ou verifique novamente o código aqui</li>
                    </ul>
                    
                </div>
            </div>
            `
            console.log(geraId);
            geraId++
            console.log(geraId);
            //voltamos para o passo 1
            escolha('passo1')

            //Se o código for 12345 mostra o dia da consulta armazenado na var 'consultaZ'
        } else if (codigo.value == '12345') {

            output.innerHTML += `
        <div class="bot">
            <img src="./img/bot.png">
            <div class="chatbot">
                <p>Sua consulta está marcada para: ${consultaZ}</p>
                <p>Estaremos encerrando seu atendimento, porfavor se tiver qualquer dúvida não
                hesite entrar em contato clicando
                </p>
                <ul>
                    <li><button id="1">AQUI</button></li>
                    
                </ul>
                </p>
                <ul>
                </ul>
                
            </div>
        </div>
        `
            //voltamos ao inicio do chat
            escolha('reiniciar')
        }
    })


}