// YOUR CODE HERE :  
// .... stringToHTML ....
// .... setupRows .....
import {stringToHTML} from './fragments.js';
import { higher,lower } from "./fragments.js";


const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate']


let setupRows = function (game) {


    function leagueToFlag(leagueId) {
        //otra forma
        let res='';
        if(leagueId==564)
        {
            res='es1'
        }
        else if (leagueId==8)
        {
            res='en1';
        }
        else if (leagueId==82)
        {
            res='de1';
        }
        else if (leagueId==384)
        {
            res='it1';
        }
        else if (leagueId==301)
        {
            res='fr1';
        }
        return res;
    }


    function getAge(dateString) {
        let hoy = new Date();
        let fechaNacimiento = new Date(dateString);
    
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
    
    
        if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) 
        {
            edad--;
        }
    
    
        return edad;
    }
    
    let check = function (theKey, theValue) {
        let res='';

        let jugadorMisterioso=obtenerJugadorMisterioso();
    
        if(theValue==jugadorMisterioso[theKey])
        {
            res='correct';
        }
        //esta bien?
        else if(theKey=='birthDate')
        {
            let edadPropuesta=getAge(theValue);
            let edadJugador=getAge(jugadorMisterioso);
    
            if (edadPropuesta==edadJugador)
            {
                res='correct';
            }
            else if(edadJugador>edadPropuesta)
            {
                res='higher';
            }
            else
            {
                res='lower';
            }
            
    
        }
        else
        {
            res='incorrect';
        }
    
        return res;
    }
    //TERMINAR
    function obtenerJugadorMisterioso()
    {
        return game.solution;
    }

    function setContent(guess) {
        return [
            `<img src="https://playfootball.games/who-are-ya/media/nations/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
            `<img src="https://playfootball.games/media/competitions/${leagueToFlag(guess.leagueId)}.png" alt="" style="width: 60%;">`,
            `<img src="https://cdn.sportmonks.com/images/soccer/teams/${guess.teamId % 32}/${guess.teamId}.png" alt="" style="width: 60%;">`,
            `${guess.position}`,
            `${check('birthDate',getAge(guess.birthdate))}` /* YOUR CODE HERE */

        ]
    }

    function showContent(content, guess) {
        let fragments = '', s = '';
        for (let j = 0; j < content.length; j++) {
            s = "".concat(((j + 1) * delay).toString(), "ms")
            fragments += `<div class="w-1/5 shrink-0 flex justify-center ">
                            <div class="mx-1 overflow-hidden w-full max-w-2 shadowed font-bold text-xl flex aspect-square rounded-full justify-center items-center bg-slate-400 text-white ${check(attribs[j], guess[attribs[j]]) == 'correct' ? 'bg-green-500' : ''} opacity-0 fadeInDown" style="max-width: 60px; animation-delay: ${s};">
                                ${content[j]}
                            </div>
                         </div>`
        }

        let child = `<div class="flex w-full flex-wrap text-l py-2">
                        <div class=" w-full grow text-center pb-2">
                            <div class="mx-1 overflow-hidden h-full flex items-center justify-center sm:text-right px-4 uppercase font-bold text-lg opacity-0 fadeInDown " style="animation-delay: 0ms;">
                                ${guess.name}
                            </div>
                        </div>
                        ${fragments}`

        let playersNode = document.getElementById('players')
        playersNode.prepend(stringToHTML(child))
    }

    let getPlayer = function (playerId) {
        let jugadores=obtenerJugadores();
        let res = jugadores.filter(e => e.id==playerId);
        return res[0];  
    }

    function obtenerJugadores()
    {
        return game.players;
    }

    return /* addRow */ function (playerId) {

        let guess = getPlayer(playerId)
        console.log(guess)

        let content = setContent(guess)
        showContent(content, guess)
    }
}

export {setupRows}
