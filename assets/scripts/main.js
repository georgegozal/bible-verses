let inputField = document.querySelector("#inputField");
const apiUrl = 'https://davidchincharashvii.pythonanywhere.com/api/search/ka/geo/'
let resultDiv = document.querySelector("#result")

function getBibleVerses(){
    if (inputField.value.trim().length > 0){
        fetchBibleApi();
    }

};

function fetchBibleApi() {
    fetch(`${apiUrl}${inputField.value}`, {
    }).then(
        response => {
            if (response.ok){
                return response.json();
            } else {
                return;
            }
        }
    ).then(
        data => {
            console.log(data);
            showResult(data);
        }
    )
};

function showResult(data){
    resultDiv.innerHTML = '';
    let header = document.createElement("h3");
    header.textContent = data.book;
    header.classList.add("result-header")
    let chapter = document.createElement("h4");
    chapter.textContent = ` თავი ${data.chapter}`;
    resultDiv.append(header, chapter);


    let list = document.createElement("ul");
    if (typeof data.verses === "object"){
        for (let key in data.verses){
            let liElement = document.createElement("li");
            liElement.textContent = data.verses[key];
            list.append(liElement);
        }
    } else{
        let liElement = document.createElement("li");
        liElement.textContent = data.verses;
        list.append(liElement);
    }
    resultDiv.append(list);

}

inputField.addEventListener("input", getBibleVerses);