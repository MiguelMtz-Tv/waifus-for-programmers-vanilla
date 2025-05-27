const dialog = document.getElementById('dialog');
const imageDialog = document.getElementById('image-dialog');

const downloadButton = document.getElementById('download-button');

let selectedElementUrl = '';
let selectedIndex = '';

let dialogIsOpen = false;

function imageClickEvent(element, open = dialogIsOpen){
    dialogIsOpen = true;

    const src = open ? element.src : element.target.src;
    selectedIndex = open ? element.id : element.target.id;

   if(!open) dialog.showModal();

    imageDialog.src = src;
    selectedElementUrl = src;
}

function btnCloseDialog(){
    dialog.close();
    selectedElementUrl = '';
    dialogIsOpen = false;
}

async function btnDownload(){
    toggleDownloadButton(true);
    const blob = await fetch(selectedElementUrl).then(r => {
        toggleDownloadButton(false);
        return r.blob();
    })
    const fileName = String(selectedElementUrl).split('/').pop() || 'archivo.png';
    const anchor = document.createElement('a');
    
    anchor.href = URL.createObjectURL(blob);
    anchor.style.display = 'none';
    anchor.download = fileName;

    document.body.appendChild(anchor);

    anchor.click();
    anchor.target = 
    document.body.removeChild(anchor);
}

document.addEventListener('keydown', (event) => {
  if(dialogIsOpen && (event.key == 'ArrowLeft' || event.key =='ArrowRight')){
    let numberIndex = Number(selectedIndex.split('-')[1]);

    let nextIndex = 
        event.key == 'ArrowLeft' 
            ? 'img-' + String(numberIndex-1)
            : 'img-' + String(numberIndex+1);

    let nextImage = document.getElementById(nextIndex);

    if(nextImage){
        imageClickEvent(nextImage);
    }
  }else if(event.key === 'Escape'){
    btnCloseDialog()
  }
})

function toggleDownloadButton(loading){
    downloadButton.innerText =  loading ? 'Downloading...' : 'Download';
    downloadButton.disabled = loading;
}