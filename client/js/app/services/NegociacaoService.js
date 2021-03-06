class NegociacaoService{

    //cb: Call Back
    obterNegociacoesSemana(cb){
        //xhr = XML HTTP Request
        //Não utilizaremos JQuery. Será Ajax puro
        let xhr = new XMLHttpRequest();
        xhr.open('GET','negociacoes/semana');
        /* configurações */
        /*
        Toda vez que o estado do xhr mudar a função onreadystatechange será chamada
        estados:
        0 - requisição ainda não chamada
        1 - conexão com o servidor estabelecida
        2 - requisição recebida
        3 - processando requisição
        4 - requisição concluída e a resposta está pronta
        */
        xhr.onreadystatechange = () => {

            if (xhr.readyState == 4){
                //Foi processado e a resposta é ok
                if (xhr.status == 200){
                    cb(null,JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
        
                } else {
                    console.log(xhr.responseText);
                    cb("Não foi possível obter as negociações",null);
                }
            }
        };

        xhr.send();
    }
}