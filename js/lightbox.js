import {disableBodyScroll, enableBodyScroll} from "./body-scroll-lock.js";


/**
 * @author HOUNSI Madouvi antoine-sebastien 
 * @networks {github: @Totorino02, gmail:antoinehounsi3@gmail.com}
 * @param{string url}
 * @param{string[] images}
 */
class Lightbox{

    static init(){
        let images = document.querySelector('.lightbox-img').querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".webp"]');
        images = Array.from(images)

        let imgUrls = images.map(link => link.getAttribute('href'));

        images.forEach(link => link.addEventListener('click', (e)=>{
            e.preventDefault();
            new Lightbox(e.currentTarget.getAttribute('href'), imgUrls);
        }));
    }

    /**
     * @param {string} url 
     * @param {string[]} images 
     */
    constructor (url, images){
        this.images = images;
        this.element = this.buildDOM();
        document.body.appendChild(this.element);
        this.loadImage(url);
        disableBodyScroll(this.element);
    }

    /**
     * @param {string} url 
     */
    loadImage(url){
        this.url = url;
        const image = new Image();
        image.src= this.url;

        const image_loader = document.createElement('div');
        image_loader.classList.add('image_loader');
        let container = this.element.querySelector('.lightbox-container');
        container.innerHTML = ``;
        container.appendChild(image_loader);

        image.onload = () =>{
            container.removeChild(image_loader);
            container.appendChild(image);
        }
    }

    /**
     * @param {MouseEvent|KeyEvent} e 
    */
    close(e){
        e.preventDefault();
        this.element.classList.add('fadeOut');
        setTimeout(() => {
            this.element.parentElement.removeChild(this.element);
        }, 500);
        enableBodyScroll(this.element);
    }

    /**
     * @param {MouseEvent|KeyEvent} e 
    */
    next(e){
        e.preventDefault();
        let index = this.images.findIndex(url => url == this.url);
        if(index == (this.images.length - 1)){
            index = -1;
        }

        this.loadImage(this.images[index+1]);

    }

    /**
     * @param {MouseEvent|KeyEvent} e 
    */
    prev(e){
        e.preventDefault();
        let index = this.images.findIndex(url => url == this.url);
        if(index == 0){
            index = this.images.length;
        }

        this.loadImage(this.images[index-1]);
    }

    /**
     * @returns{HTMLElement} dom
     */
    buildDOM(){
        const dom = document.createElement('div');
        dom.classList.add('lightbox');
        dom.innerHTML = `
            <button class="lightbox-cancel"></button>
            <button class="lightbox-prev"></button>
            <button class="lightbox-next"></button>
            <div class="lightbox-container"></div>
        `
        dom.querySelector('.lightbox-cancel').addEventListener('click', this.close.bind(this));
        dom.querySelector('.lightbox-prev').addEventListener('click', this.prev.bind(this));
        dom.querySelector('.lightbox-next').addEventListener('click', this.next.bind(this));
        return dom;
    }
}

Lightbox.init();