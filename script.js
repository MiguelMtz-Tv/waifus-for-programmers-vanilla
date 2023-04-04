const req = new XMLHttpRequest();
const req2 = new XMLHttpRequest();
const WAIFUS_ENDPOINT = 'https://api.github.com/repos/cat-milk/Anime-Girls-Holding-Programming-Books/contents/';
const IMG_ENDPOINT = 'https://raw.githubusercontent.com/cat-milk/Anime-Girls-Holding-Programming-Books/master/' 
var lang = 'Javascript';

const container = document.getElementById('container');
const sidebar = document.getElementById('sidebar');
const sidebarList = document.getElementById('sidebar-list');

const getImgs = () =>{
    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let data = JSON.parse(this.responseText); 
            data.forEach(element => {
                var eachImg =document.createElement('img');
                eachImg.src= IMG_ENDPOINT+element.path;
                eachImg.width = 300;
                container.appendChild(eachImg);
            });
        }
    }
    
    req.open('GET', WAIFUS_ENDPOINT+lang);
    req.send();
    
}

const selectLang = (l) =>{
    lang = l;
    container.innerHTML = null;
    getImgs();
} 

function getLang(){
    req2.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let = data = JSON.parse(this.responseText);
            data.forEach(e => {
                if(e.name === '.DS_Store' || e.name === 'README.md'){
                    return null;
                }else{
                    var li = document.createElement('li');
                    li.innerText = e.name;
                    li.addEventListener('click', function(){
                        selectLang(e.name);
                    })
                    sidebarList.appendChild(li);
                }
            })
        }
    }
    req2.open('GET', WAIFUS_ENDPOINT);
    req2.send();
}
//calling initial functions
getLang();
getImgs();