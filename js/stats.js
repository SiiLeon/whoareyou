export {initState}

let initState = function(what, solutionId) { 
    let respuesta=[];
    let s= JSON.parse(localStorage.getItem(what))
    respuesta[0]=s;
    respuesta[1]= function(guess){
        s.guesses.push(guess)
        localStorage.setItem(what,JSON.stringify(s))
    }
    return respuesta
    
}