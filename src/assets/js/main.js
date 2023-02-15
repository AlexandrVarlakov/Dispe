/*
    1.Форма поиска
    2. hamburger-menu
    3. Меню каталог
    4. Модальные окна
    5. header
    6.Мобильная строка поиска
*/



//1.Форма поиска
const searchInputs = document.querySelectorAll('.search-form > input');

if ( searchInputs.length ){
    searchInputs.forEach( inp => {
        const parent = inp.closest('.search-form');
        if ( inp.value.length ){
            parent.classList.add('active');
        } else{
            parent.classList.remove('active');
        }
        inp.addEventListener('input', function(e){
            if ( this.value.length ){
                parent.classList.add('active');
            } else{
                parent.classList.remove('active');
            }
        })
    } )
}

//1.КОНЕЦ: Форма поиска

//2. hamburger-menu

const hamburger = document.querySelector('.hamburger');
const hamburgerMenu = document.querySelector('.hm-container');
const closeHamburgerMenu = document.querySelector('.hamburger-menu__close-btn')

function closeHamMenu(){
    anime({
        targets: '.hamburger-menu',
        translate: '120%',
        duration: 500,
        delay: 200,
        easing: 'easeInOutQuint',
        
        complete: function(anim) {
            hamburgerMenu.classList.remove('show');
            this.animatables[0].target.removeAttribute('style');
            document.body.classList.remove('no-scroll');
        }
    });
}

hamburger.addEventListener('click', function(){
    hamburgerMenu.classList.add('show');
    document.body.classList.add('no-scroll');
});



hamburgerMenu.addEventListener('click', function(event){
    if ( event.target.classList.contains('hm-container') ){
        closeHamMenu();        
    }
});

closeHamburgerMenu.addEventListener('click', function(){
    closeHamMenu();    
})

//КОНЕЦ: 2. hamburger-menu


//3. Меню каталог

const openCatalog = document.querySelector('.catalog-btn');
const catalogContainer = document.querySelector('.catalog-menu-container');
const closeCatalogMenu = document.querySelector('.catalog-menu__close-btn');

function closeCatMenu(){
    anime({
        targets: '.catalog-menu-container',
        translate: '-120%',
        duration: 500,
        delay: 200,
        easing: 'easeInOutQuint',
        
        complete: function(anim) {
            catalogContainer.classList.remove('show');
            this.animatables[0].target.removeAttribute('style');
            document.body.classList.remove('no-scroll');
        }
    });
}

const categoriesCols = document.querySelector('.catalog-menu__categories-col');
const catalogMenuHeader = document.querySelector('.catalog-menu__header');

function setMaxHeightForCategoriesMenu(bottomOffset = 0){
    let vh = document.documentElement.clientHeight;
    let headerHeight = catalogMenuHeader.offsetHeight;
    categoriesCols.style.maxHeight = (vh - headerHeight - bottomOffset) + 'px';
    
}

window.addEventListener('resize', function(){
    setMaxHeightForCategoriesMenu(30);
})


openCatalog.addEventListener('click', function(){
    catalogContainer.classList.add('show');
    document.body.classList.add('no-scroll');
    setMaxHeightForCategoriesMenu(30);
})
closeCatalogMenu.addEventListener('click', function(){
    closeCatMenu()
})

catalogContainer.addEventListener('click', function(event){
    if ( event.target.classList.contains('catalog-menu-container') ){
        closeCatMenu()        
    }
});

const spoilerHeader = document.querySelectorAll('.spoiler-header');


function deploySpoiler(header, content, h){
    anime({
        targets: content,
        height: h,
        duration: 500,
        delay: 0,
        easing: 'easeInOutQuint',
        begin: function(anim) {
            header.classList.add('opened')
        },
        complete: function(anim) {
            header.classList.add('open');
            header.classList.remove('opened');
            content.style.height = 'auto';
        }
    });
}

function rollSpoiler(header, content){
    anime({
        targets: content,
        height: 0,
        duration: 500,
        delay: 0,
        easing: 'easeInOutQuint',
        begin: function(anim) {
            header.classList.add('closed');            
        },
        complete: function(anim) {
            header.classList.remove('open');
            header.classList.remove('closed');
            
        }
    });
}


if ( spoilerHeader.length ){

    

    window.addEventListener('resize', function(){
        let spoilerBodyStyled = document.querySelectorAll('.spoiler-body[style]');
        spoilerBodyStyled.forEach( sp => {
            sp.removeAttribute('style');
        });
        let openHeaders = document.querySelectorAll('.spoiler-header.open');
        openHeaders.forEach( oh => {
            oh.classList.remove('open');
        } )
    });



    spoilerHeader.forEach( tb => {
        tb.addEventListener('click', function(){
            
            const parentContainer = this.closest('.accordion');
            const isMenuAccrodion = ( parentContainer.getAttribute('data-place') === 'menu') ? true : false;     
        
            function openSpoilerBody(clickedHeader){
                const targetLink = clickedHeader.getAttribute('data-target');
                const target = document.querySelector(targetLink);
                

                if ( !clickedHeader.classList.contains('open') ){                    
                    const heightListContainer  = target.querySelector('* > [data-measure]').offsetHeight;
                    deploySpoiler(tb, target, heightListContainer);
                } else{
                    const heightListContainer  = target.querySelector('* > [data-measure]').offsetHeight;
                    target.style.height = target.offsetHeight + 'px';
                    rollSpoiler(tb, target);
                }
            }

            
            if ( isMenuAccrodion ){
                
                if (!this.classList.contains('opened') && !this.classList.contains('closed')){
                    let vw = document.documentElement.clientWidth;
                    const smBreakpoint = Number(getComputedStyle(document.documentElement).getPropertyValue('--bp-sm'));
                    
                    if (vw < smBreakpoint){
                        openSpoilerBody(this)
                    }
                    
                }
                  
            } else{
                if (!this.classList.contains('opened') && !this.classList.contains('closed')){
                    openSpoilerBody(this)
                    
                    
                }
            }


            
            
            

             
    
        })
    } )
}


const tabs = document.querySelectorAll('.tab');

if (tabs.length){

    tabs.forEach( tab => {
        tab.addEventListener('click', function(){
            if ( !this.classList.contains('active') ){
                const family = this.getAttribute('data-family');
                
                const activeTab = document.querySelector('.tab.active[data-family="menu-categories"]');
                console.log(activeTab);
                if ( activeTab ){
                    const activeSheetLink = activeTab.getAttribute('data-target');
                    const activeSheet  =  document.querySelector(activeSheetLink);

                    if ( activeSheet ) activeSheet.classList.remove('active');
                    
                    activeTab.classList.remove('active');
                }

                const newActiveSheetLink = this.getAttribute('data-target');
                const newActiveSheet = document.querySelector(newActiveSheetLink);
                if ( newActiveSheet )  newActiveSheet.classList.add('active');
                this.classList.add('active')
            }
        });
    } )

    
}
//3. КОНЕЦ: Меню каталог


//4. Модальные окна
let options = {
    zIndex: 1000, 
    //background: 'rgba(12, 130, 121, 0.5)', 
    displayModalContainer: 'flex', 
    displayModal: 'block', 

    closeSelectors: ['.close-btn'], 
    closeModalOnFogClick: true, 
    showModalAnimation: 'fadeIn', 
    closeModalAnimation: 'fadeOut',  
    showModalDuration: '300ms',
    closeModalDuration: '500ms',

    showFogAnimation: 'fadeInTop',
    closeFogAnimation: 'fadeOut',
    showFogDuration: '300ms',
    closeFogDuration: '500ms',
    documentCanScroll: false, 

    // 'modal-first' - сначала скрывается модальное окно - затем туман
    // 'along' - анимации закрытия тумана и окна происходят параллельно
    closeMode: 'modal-first',
    beforeClose: function(){console.log('before modal close');},
    afterClose: function(){console.log('close modal close');},
    beforeAppendModal: function(){console.log('before append modal');},
    afterShow: function(){console.log('after show modal');}

}





const modalCallBtns = document.querySelectorAll('[data-role="call-modal"]');

let calledModal;
modalCallBtns.forEach( btn => {
    btn.addEventListener('click', function(){
        const modalLink = this.getAttribute('data-target');
        
        calledModal = new easyModal(modalLink, options);
    });
} )

//4. КОНЕЦ: Модальные окна

//5. header

const header = document.querySelector('.header');
window.addEventListener('scroll', function(){
    let halfHeaderHeight = header.offsetHeight / 3;

    if (window.pageYOffset > halfHeaderHeight ){
        header.classList.add('scrolled');
    } else{
        header.classList.remove('scrolled');
    }
    
})
//5. КОНЕЦ: header

//6. Мобильная строка поиска
const mobSearchBtn = document.querySelector('.mob-search-btn');
const mobSearchContainer = document.querySelector('.bottom-menu__search-container'); 

mobSearchBtn.addEventListener('click', function(){
    if ( !this.classList.contains('active') ){
        this.classList.add('active');
        anime({
            targets: mobSearchContainer,            
            duration: 300,  
            opacity: 1,
            translateX: '0%',         
            easing: 'easeInOutQuint',
            begin: function(anim) {
                mobSearchContainer.style.display = 'block';
            },
        });
    } else{
        const self = this;
        anime({
            targets: mobSearchContainer,            
            duration: 300,  
            opacity: .5,
            translateX: '-150%',         
            easing: 'easeInOutQuint',
            complete: function(anim) {
                mobSearchContainer.style.display = 'none';
                
                self.classList.remove('active');
            },
        });
        
    }
})
//6. Конец: Мобильная строка поиска

//7. Faq-форма


let thanksOptions = {
    zIndex: 1000, 
    //background: 'rgba(12, 130, 121, 0.5)', 
    displayModalContainer: 'flex', 
    displayModal: 'flex', 

    closeSelectors: ['.close-btn'], 
    closeModalOnFogClick: true, 
    showModalAnimation: 'fadeInBottom', 
    closeModalAnimation: 'fadeOutTop',  
    showModalDuration: '300ms',
    closeModalDuration: '500ms',

    showFogAnimation: 'fadeIn',
    closeFogAnimation: 'fadeOut',
    showFogDuration: '300ms',
    closeFogDuration: '500ms',
    documentCanScroll: false, 

    // 'modal-first' - сначала скрывается модальное окно - затем туман
    // 'along' - анимации закрытия тумана и окна происходят параллельно
    closeMode: 'modal-first',
    beforeClose: function(){console.log('before modal close');},
    afterClose: function(){console.log('close modal close');},
    beforeAppendModal: function(){
        if ( calledModal ) calledModal.closeModal();
    },
    afterShow: function(){console.log('after show modal');}

}

const faqForms = document.querySelectorAll('.faq-from');

if ( faqForms.length ){
    faqForms.forEach( form => {
        form.onsubmit = function(event){
            event.preventDefault();
            
            
            let data_body = "name=" + this.name.value + '&phone=' +  this.phone.value + '&email=' +  this.email.value + '&theme=' +  this.theme.value + '&text=' +  this.text.value; 
            fetch("script-name.php", {
                method: "POST",
                body: data_body,
                headers:{"content-type": "application/x-www-form-urlencoded"} 
            })
            .then( (response) => {
                if (response.status !== 200) {
                    return Promise.reject();
                }
                
                this.name.value = "";
                this.phone.value = "";
                this.email.value = "";
                this.theme.value = "";
                this.text.value = "";

                return response.text()
            })
            .then(i => console.log(i))
            .catch(() => {
                console.log('ошибка')

                this.name.value = "";
                this.phone.value = "";
                this.email.value = "";
                this.theme.value = "";
                this.text.value = "";

                const thanksModal = new easyModal('.thanks-modal', thanksOptions);

                setTimeout(()=>{
                    thanksModal.closeModal();
                }, 2000)
            });
        }
    } )
}
//7. КОНЕЦ: Faq-форма

//8. Маски
let phoneMasks = document.querySelectorAll("input[name='phone']");

phoneMasks.forEach( (input) => {
    IMask(
        input, {
          mask: '+{7}(000)000-00-00'
      });
})
//8. КОНЕЦ: Маски
