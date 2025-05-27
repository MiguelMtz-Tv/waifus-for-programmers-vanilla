const WAIFUS_ENDPOINT = 'https://api.github.com/repos/cat-milk/Anime-Girls-Holding-Programming-Books/contents/'; 
let lang = 'Javascript';

const container = document.getElementById('main-layout');
const sidebarList = document.getElementById('sidebar-list');
const toggleSidebar = document.getElementById('toggle-sidebar-button');

let isOpen = true;



const getImgs = () =>{
    let req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let data = JSON.parse(this.responseText); 
            data.forEach((element, imageIndex) => {
                let eachImg = document.createElement('img');
                eachImg.className = 'waifu-pic';
                eachImg.src= element.download_url;
                eachImg.id = 'img-' + String(imageIndex);
                eachImg.addEventListener('click', (img) => imageClickEvent(img))
                container.appendChild(eachImg);
            });
        }
    }
    let path = lang.replace('#', '%23');
    req.open('GET', WAIFUS_ENDPOINT+path);
    req.send();  
}

const selectLang = (l) =>{
    lang = l;
    container.innerHTML = null;
    getImgs();
} 

function getLangs(){
    let req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let = data = JSON.parse(this.responseText);
            data.forEach(e => {
                if(e.name === '.DS_Store' || e.name === 'README.md' || e.name === 'CONTRIBUTING.md'){
                    return null;
                }else{
                    var li = document.createElement('div');
                    li.classList.add('lang')
                    li.innerText = e.name;
                    li.addEventListener('click', function(){
                        selectLang(e.name);
                    })
                    sidebarList.appendChild(li);
                }
            })
        }
    }
    req.open('GET', WAIFUS_ENDPOINT);
    req.send();
}

toggleSidebar.addEventListener('click', function(){
    isOpen = !isOpen; 
    isOpen ? sidebarList.style.width='300px' : sidebarList.style.width ='0px';
    isOpen ? sidebarList.style.padding='10px' : sidebarList.style.padding='0px';
});

//calling initial functions
getLangs();
getImgs();