// let url = "http://localhost:8080/ai/v1/user/completions";
let url = "https://openai-app-mukesh.onrender.com/ai/v1/user/completions";

let options = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

}
export const askQuestion = async (data) => {
    let response =""
    options.body = JSON.stringify(data)
    await fetch(url, options).then(async(data) => {
        let a = await data.json()
        response= a
    }).catch(e => {
        console.log(e);
        response= e
    });
return response
}



