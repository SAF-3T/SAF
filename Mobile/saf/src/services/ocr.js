import axios from "axios";

export const LerConteudoDaImagem = async (formData) => {

    let resultado;

    await axios({
        method : "POST",
        url : "https://ocr-equipamentos-paulo.cognitiveservices.azure.com/vision/v3.2/ocr?language=pt&detectOrientation=true&model-version=latest",
        data : formData,
        headers : {
            "Content-Type" : "multipart/form-data",
            "Ocp-Apim-Subscription-Key" : "c3d4e190149044b585f84c6465dd2ac5"
        }
    })
    .then(response => {
        // console.log(response)
        resultado = FiltrarOBJ(response.data);
    })
    .catch(erro => console.log(erro))

    return resultado;
}


export const FiltrarOBJ = (obj) => {
    let resultado;
        let teste = JSON.parse(obj)
        // console.debug("foi aqui")
        // console.debug(teste.language)

        teste.regions.forEach(region => {
            region.lines.forEach(line => {
                line.words.forEach(word => {
                    if (word.text.length >= 7 && isNaN(Number(word.text.slice(-2))) !== true) {
                        resultado = word.text.slice(-7);
                    }
                });
            });
        });

        return resultado;
}