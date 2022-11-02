let table = document.querySelector('table');
let tds   = document.querySelectorAll('td');
let box = document.getElementById('mensagem');
let strg = localStorage;

// Pontuação:
let o     = document.getElementById('o');
let x     = document.getElementById('x');
let velha = document.getElementById('velha');
let pntsX = 0;
let pntsO = 0;
let pntsV = 0;

if (strg.getItem('pontoo')) {

    pntsO = JSON.parse(strg.getItem('pontoo'));
    pntsV = JSON.parse(strg.getItem('pontov'));
    pntsX = JSON.parse(strg.getItem('pontox'));
    o.innerHTML     = pntsO;
    x.innerHTML     = pntsX; 
    velha.innerHTML = pntsV;
    
}

function limpaStrg () {
    if (strg.getItem('pontoo')) {

        strg.setItem('pontoo', JSON.stringify(0));
        strg.setItem('pontox', JSON.stringify(0));
        strg.setItem('pontov', JSON.stringify(0));
        pntsO = JSON.parse(strg.getItem('pontoo'));
        pntsV = JSON.parse(strg.getItem('pontov'));
        pntsX = JSON.parse(strg.getItem('pontox'));
        o.innerHTML     = pntsO;
        x.innerHTML     = pntsX; 
        velha.innerHTML = pntsV;
        
    }
}

function getTds() {
    let t1 = document.getElementById('1');
    let t2 = document.getElementById('2');
    let t3 = document.getElementById('3');
    let t4 = document.getElementById('4');
    let t5 = document.getElementById('5');
    let t6 = document.getElementById('6');
    let t7 = document.getElementById('7');
    let t8 = document.getElementById('8');
    let t9 = document.getElementById('9');

    return { t1, t2, t3, t4, t5, t6, t7, t8, t9 };
}

function validaVitória () {
    
    let { t1, t2, t3, t4, t5, t6, t7, t8, t9 } = getTds();

    if (t1.innerHTML == t2.innerHTML &&  t2.innerHTML == t3.innerHTML && t1.innerHTML != ""){
        return t1.innerHTML;
    }
    if (t4.innerHTML == t5.innerHTML &&  t6.innerHTML == t5.innerHTML && t4.innerHTML != ""){
        return t4.innerHTML;
    }
    if (t7.innerHTML == t8.innerHTML &&  t8.innerHTML == t9.innerHTML && t9.innerHTML != ""){
        return t7.innerHTML;
    }
    if (t1.innerHTML == t4.innerHTML &&  t4.innerHTML == t7.innerHTML && t7.innerHTML != ""){
        return t1.innerHTML;
    }
    if (t5.innerHTML == t2.innerHTML &&  t5.innerHTML == t8.innerHTML && t8.innerHTML != ""){
        return t5.innerHTML;
    }
    if (t3.innerHTML == t6.innerHTML &&  t6.innerHTML == t9.innerHTML && t9.innerHTML != ""){
        return t3.innerHTML;
    }
    if (t1.innerHTML == t5.innerHTML &&  t5.innerHTML == t9.innerHTML && t9.innerHTML != ""){
        return t1.innerHTML;
    }
    if (t5.innerHTML == t3.innerHTML &&  t3.innerHTML == t7.innerHTML && t7.innerHTML != ""){
        return t5.innerHTML;
    }
    if (t1.innerHTML != "" && t2.innerHTML != "" && t3.innerHTML != "" && t4.innerHTML != "" && t5.innerHTML != "" && t6.innerHTML != "" && t7.innerHTML != "" && t8.innerHTML != "" && t9.innerHTML != "") {
        return "velha";
    }
}

function finaliza (vencedor) {
  
    let mensagem = "";

    if (vencedor == "X" || vencedor == "O") {
         mensagem = `o jogador ${vencedor} venceu!`;
    } else {
         mensagem = 'Deu velha!';
    }

    box.setAttribute('style', 'display: block;');

    let text = document.getElementById('text');

    text.innerHTML = mensagem;

    setTimeout(() => {
        box.setAttribute('style', 'display: none;');
        text.innerHTML = "";
    }, 1000);

    for (let i = 0; i < 9; i++) {
        tds[i].innerHTML = null;
        tds[i].setAttribute('style', 'border-color: black;')
    }

    if (vencedor == "X") {
        pntsX++;
    } else if(vencedor == "O") {
        pntsO++;
    } else if(vencedor=="velha") {
        pntsV++;
    }

    o.innerHTML     = pntsO;
    x.innerHTML     = pntsX; 
    velha.innerHTML = pntsV;

    strg.setItem('pontoo', JSON.stringify(pntsO));
    strg.setItem('pontox', JSON.stringify(pntsX));
    strg.setItem('pontov', JSON.stringify(pntsV));
}

function limpaButton() {
    document.getElementById('divbtn').setAttribute('style', 'display: none;');
    document.getElementById('voltar').setAttribute('style', 'display: flex;');
}

function doisJogadores () {
    limpaButton();

    box.setAttribute('style', 'display: block;');
    let text = document.getElementById('text');
    text.innerHTML = "O jogador X começa jogando!";

    setTimeout(() => {
        box.setAttribute('style', 'display: none;');
        text.innerHTML = "";
    }, 1000);

    document.getElementById('voltar').addEventListener('click', ()=>{window.location.reload()});

    let jogador = true;

    table.addEventListener("click", function (e) {
       
        let td = e.target;

        if(td.innerHTML == "" || td.innerHTML == null){

            if(jogador == true) {

                td.innerHTML = "X";
                td.setAttribute('style', 'color: purple; border-color: purple;');

            } else if(jogador == false) {

                td.innerHTML = "O";
                td.setAttribute('style', 'color: green; border-color: green;');

            }

        } else {

            box.setAttribute('style', 'display: block;');

            let text = document.getElementById('text');

            text.innerHTML = "Posição ocupada!";

            setTimeout(() => {
                box.setAttribute('style', 'display: none;');
                text.innerHTML = "";
            }, 1000);
        }

        jogador = (jogador == true ? false : true);

        if(validaVitória()){
            finaliza(validaVitória());
        }
        
    });
};

function validaçãoIA(a, b, rg) {

    if (rg == 1) {
        a = "X";
        b = "O";
    } 
    
    if (rg == 0) {
        a = "O";
        b = "X";
    }

    let { t1, t2, t3, t4, t5, t6, t7, t8, t9 } = getTds();

    //valida possível oportunidade de vitória

    if (t2.innerHTML == a && t3.innerHTML == a || t5.innerHTML == a && t9.innerHTML == a || t4.innerHTML == a && t7.innerHTML == a) {
        if (t1.innerHTML == "") {            
            t1.innerHTML = a;
            return t1; 
        }
    } 
    if (t1.innerHTML == a && t3.innerHTML == a || t5.innerHTML == a && t8.innerHTML == a) {
        if (t2.innerHTML == "") {            
            t2.innerHTML = a;
            return t2; 
        }
    }
    if (t1.innerHTML == a && t2.innerHTML == a || t5.innerHTML == a && t7.innerHTML  == a || t6.innerHTML == a && t9.innerHTML == a) {
        if (t3.innerHTML == "") {            
            t3.innerHTML = a;
            return t3; 
        }
    } 
    if (t1.innerHTML == a && t7.innerHTML == a || t5.innerHTML == a && t6.innerHTML == a) {
        if (t4.innerHTML == "") {            
            t4.innerHTML = a;
            return t4; 
        }
    } 
    if (t1.innerHTML == a && t9.innerHTML == a || t2.innerHTML == a && t8.innerHTML == a || t3.innerHTML == a && t7.innerHTML == a || t4.innerHTML == a && t6.innerHTML == a) {
        if (t5.innerHTML == "") {            
            t5.innerHTML = a;
            return t5; 
        }
    } 
    if (t3.innerHTML == a && t9.innerHTML == a || t4.innerHTML == a && t5.innerHTML == a) {
        if (t6.innerHTML == "") {            
            t6.innerHTML = a;
            return t6; 
        }
    } 
    if (t1.innerHTML == a && t4.innerHTML == a || t3.innerHTML == a && t5.innerHTML == a || t8.innerHTML == a && t9.innerHTML == a) {
        if (t7.innerHTML == "") {            
            t7.innerHTML = a;
            return t7; 
        }
    } 
    if (t2.innerHTML == a && t5.innerHTML == a || t7.innerHTML == a && t9.innerHTML == a) {
        if (t8.innerHTML == "") {            
            t8.innerHTML = a;
            return t8; 
        }
    } 
    if (t1.innerHTML == a && t5.innerHTML == a || t3.innerHTML == a && t6.innerHTML == a || t7.innerHTML == a && t8.innerHTML == a) {
        if (t9.innerHTML == "") {            
            t9.innerHTML = a;
            return t9; 
        }
    } 

    //valida possível derrota a ser evitada

    if (t2.innerHTML == b && t3.innerHTML == b || t5.innerHTML == b && t9.innerHTML == b || t4.innerHTML == b && t7.innerHTML == b) {
        if (t1.innerHTML == "") {            
            t1.innerHTML = a;
            return t1; 
        }
    } 
    if (t1.innerHTML == b && t3.innerHTML == b || t5.innerHTML == b && t8.innerHTML == b) {
        if (t2.innerHTML == "") {            
            t2.innerHTML = a;
            return t2; 
        }
    }
    if (t1.innerHTML == b && t2.innerHTML == b || t5.innerHTML == b && t7.innerHTML  == b || t6.innerHTML == b && t9.innerHTML == b) {
        if (t3.innerHTML == "") {            
            t3.innerHTML = a;
            return t3; 
        }
    } 
    if (t1.innerHTML == b && t7.innerHTML == b || t5.innerHTML == b && t6.innerHTML == b) {
        if (t4.innerHTML == "") {            
            t4.innerHTML = a;
            return t4; 
        }
    } 
    if (t1.innerHTML == b && t9.innerHTML == b || t2.innerHTML == b && t8.innerHTML == b || t3.innerHTML == b && t7.innerHTML == b || t4.innerHTML == b && t6.innerHTML == b) {
        if (t5.innerHTML == "") {            
            t5.innerHTML = a;
            return t5; 
        }
    } 
    if (t3.innerHTML == b && t9.innerHTML == b || t4.innerHTML == b && t5.innerHTML == b) {
        if (t6.innerHTML == "") {            
            t6.innerHTML = a;
            return t6; 
        }
    } 
    if (t1.innerHTML == b && t4.innerHTML == b || t3.innerHTML == b && t5.innerHTML == b || t8.innerHTML == b && t9.innerHTML == b) {
        if (t7.innerHTML == "") {            
            t7.innerHTML = a;
            return t7; 
        }
    } 
    if (t2.innerHTML == b && t5.innerHTML == b || t7.innerHTML == b && t9.innerHTML == b) {
        if (t8.innerHTML == "") {            
            t8.innerHTML = a;
            return t8; 
        }
    } 
    if (t1.innerHTML == b && t5.innerHTML == b || t3.innerHTML == b && t6.innerHTML == b || t7.innerHTML == b && t8.innerHTML == b) {
        if (t9.innerHTML == "") {            
            t9.innerHTML = a;
            return t9; 
        }
    }
}

function umJogador () {
    limpaButton();

    document.querySelector('.escolherSimbolo').setAttribute('style', 'display: flex; flex-direction: colunm;');

    document.getElementById('voltar').addEventListener('click', ()=>{window.location.reload()});

    let check1 = document.getElementById('check1');
    check1.checked = true;
    let check2 = document.getElementById('check2'); 

    document.getElementById('inputs').addEventListener('click', (e)=>{
         
        if (e.target == check1) {
            check2.checked = false;
            check1.checked = true;
        }

        if (e.target == check2) {
            check1.checked = false;
            check2.checked = true;
        }

    })

    table.addEventListener("click", function (e) {
        
        document.querySelector('.escolherSimbolo').setAttribute('style', 'display: none;');

        const rangeValue = (check1.checked == true ? 0 : 1)
        let td = e.target;

        if(td.innerHTML == "" || td.innerHTML == null){

            if (rangeValue == 0) {

                td.innerHTML = "X";
                td.setAttribute('style', 'color: purple; border-color: purple;');

            } else {

                td.innerHTML = "O";
                td.setAttribute('style', 'color: green; border-color: green;');

            }

        } else {
            
            box.setAttribute('style', 'display: block;');

            let text = document.getElementById('text');

            text.innerHTML = "Posição ocupada!";

            setTimeout(() => {
                box.setAttribute('style', 'display: none;');
                text.innerHTML = "";
            }, 1000);

            return;
        }

        if(validaVitória()){
            finaliza(validaVitória());
            return;
        }
        //
            function jogadaIA () {

                let a = "";
                let b = "";
        
                let valid = validaçãoIA(a, b, rangeValue)

                    if(valid) {
                        console.log(valid)
                        
                            let color = rangeValue == 0 ? 'green' : 'purple';
                            valid.setAttribute('style', `color: ${color}; border-color: ${color};`);
                            valid = '';
                        
                    } else {
                        
                        for (let index = 0; index < 50; index++) {

                            let posição = tds[parseInt(Math.random()*9)];
                        
                            if (posição.innerHTML == "") {

                                posição.innerHTML = rangeValue == 0 ? "O" : "X";
                                let color = rangeValue == 0 ? 'green' : 'purple';
                                posição.setAttribute('style', `color: ${color}; border-color:${color};`);
                                return;
                            }
                        } 
                    }
            }

            jogadaIA();
                 
               setTimeout(() => {

                if(validaVitória()){
                    finaliza(validaVitória());
                }

               }, 500);

    });
};  

document.getElementById('btn1').addEventListener("click", ()=>{ doisJogadores() });
document.getElementById('btn2').addEventListener("click", ()=>{ umJogador() });