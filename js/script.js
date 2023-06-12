
//funcion para crear icono menu hamburguesa
const activeMenu = () => {
    const $lines = document.querySelectorAll('.hamburger-line');

    $lines.forEach((line) => line.classList.toggle('hamburger-line--active'));

}
//funcion para hacer visible el submenu selecionado
const viewSubmenu = () => {

}
//====================================================//==============================

//funcion para detectar que elemento genero el evento
const elementClicked = (element) => {
    if (element.getAttribute("href") || element.tagName.toLowerCase() =='i' || element.tagName.toLowerCase() == 'span') {
        validateChildUl(element.closest('li'));
        
    } else {
        
        validateChildUl(element)
    }
}

//funcion para resetaar los items 
const resetItems = (element, back) =>{
 

    element.forEach((element) =>{
        if(back){
            element.classList.remove('main-menu__list--inactive');
            element.classList.add('main-menu__item--active');
        }else if(!back){
            element.classList.add('main-menu__list--inactive');
            element.classList.remove('main-menu__item--active');
        }
        

    });
}

//funcion para limpiar li y eleimar el boton atras
const resetLi = (element) => {
    const $buttonBack = document.querySelector('.back');
    $buttonBack ? $buttonBack.remove() : "";

    const  $parentElement = element.closest('.main-menu__item').parentNode,
    $childs = Array.from($parentElement.children).filter((child)=>child != element);
  
    resetItems($childs);
        
}


//funcion para pintar los li indicados
const paintLi = (element) =>{
    const $subMenuSelected = element.querySelectorAll('.main-menu__item:nth-child(n)');


    element.firstElementChild.classList.add('main-menu__hidden-title');
    element.lastElementChild.style.setProperty('display', 'flex');

    $subMenuSelected.forEach(element => {
        element.classList.remove('main-menu__list--inactive');
        element.classList.add('main-menu__item--active');
    });

}

//funcion para validar todas las listas
const viewElement = (element) =>{

   let currentElement = element;
   
    while (currentElement.tagName.toLowerCase() !== "ul") {
        currentElement.classList.remove('main-menu__list--inactive');
     currentElement = currentElement.closest("ul");
  
  if (!currentElement) {
    break; // No se encontró el elemento <ul> padre
  }
}
}
  




//funcion para crear item volver a tras en el menu
const toBack = (href) => {
    const $aToBack = document.createElement('a'),
        $liToBack = document.createElement('li');
    $aToBack.classList.add('anchorback');
    $aToBack.setAttribute('id', 'anchor');
    $aToBack.textContent = 'Atras';
    $aToBack.setAttribute('href', href);
    $liToBack.classList.add('main-menu__item--active', 'back');
    $liToBack.appendChild($aToBack);
      
    return $liToBack;
}

//funcion para resetear el paddin de las listas
const resetPaddin = () =>{
    
    const $allLis = document.querySelectorAll('li'),
          $ul = document.querySelectorAll('.main-menu__sublist');
          $ul.forEach((element)=>element.style.padding = 'initial')
       
    $allLis.forEach(function(elementoLi) {
        elementoLi.style.padding = 'initial';
      });
}


const validateChildUl = (element) => {
  
    if (element.lastElementChild.tagName.toLowerCase() === 'ul') {
        element.style.padding='0';
        element.lastElementChild.style.padding='0';
//console.log('first',element.closest(".main-menu__item").classList)
//viewElement(element);

resetLi(element);
        element.classList.remove('main-menu__list--inactive');
        
        element.parentNode.parentNode.classList.remove('main-menu__list--inactive');
        
        element.lastElementChild.insertAdjacentElement('afterbegin', toBack(element.firstElementChild.getAttribute("href")));
        
     paintLi(element);
       

    }
}


//funcion para volver un nivel atras
const returnBack = (element) => {
    const $buttonBack = document.querySelector('.back'),
        $submenu = element.closest('.back').parentNode.parentNode.parentNode.querySelectorAll('.main-menu__item');
        element.parentNode.parentNode.firstElementChild.classList.remove('main-menu__hidden-title');
        element.parentNode.parentNode.lastElementChild.style.setProperty('display', 'none');
        element.parentNode.parentNode.style.setProperty('padding', '16px');
        let $ulContainer =element.parentNode;
        
       // resetPaddin();
         
        if(element.closest('.back').parentNode.parentNode.parentNode.parentNode.firstElementChild.href){
            $buttonBack ? $buttonBack.remove() : "";
            $ulContainer.parentNode.parentNode.insertAdjacentElement('afterbegin', toBack('gffg'));
        }
        resetItems($submenu, true);
    
}

//funcion con nuevo enfoque para hir bajando de nivel
const nextItem = (element) =>{
   const  $parentElement = element.parentNode,
   $childs = Array.from($parentElement.children).filter((child)=>child != element);
   resetItem($childs, false);
   
}

//funcion para escuchar todos los clicks de documento
const listenerClicks = () => {
    document.addEventListener('click', (event) => {
        event.preventDefault();
   
        switch (true) {
            case event.target.matches('.hamburger'):
                activeMenu();
                break;

            case event.target.matches('.main-menu__sublist'):
                viewSubmenu(event.target);
                break;

            case event.target.matches('.main-menu__item') || event.target.matches('.main-menu__anchor') || event.target.matches('.fa-caret-right') || event.target.matches('span'):
                //nextItem(event.target.closest('.main-menu__item'));
                elementClicked(event.target);
                break;

          
            //case event.target.matches('.back') || event.target.matches('.anchor-back'):
            case  event.target.matches('.main-menu__item--active .back')  || event.target.matches('.anchorback'):
                returnBack(event.target.closest('.back'));
                break;

        }



    });

}


listenerClicks();