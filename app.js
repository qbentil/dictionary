const ul = document.getElementById("example");

function get_req(link) {
  return new Promise(function (resolve, reject) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resolve(JSON.parse(this.responseText));
      }
    };
    xmlhttp.open("GET", link, true);
    xmlhttp.send();
  });
}

function show() {
  var word = document.getElementById("key").value;
  ul.innerHTML = "";
  if(word !== ''){
    var link = "https://api.datamuse.com/words?ml=" + word + "&md=d";
    get_req(link).then(function (response) {
        console.log(response);
        let output = ''
        output +=response[0].defs?.map((value, idx) => `${idx + 1}. ${value} \n\n`).join("")
        document.getElementById("definition").innerHTML = output;

        // get first 10 synonyms

        for (let i = 0; i < 10; i++) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(response[i].word));
            ul.appendChild(li);
        }
    });
  }
}

const search = document.getElementById("search");
search.addEventListener("click", show);
