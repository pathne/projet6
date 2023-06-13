
/*
************ modalBackground ***********
...

<div id="edit-works-modal-background">
    <div></div>
</div>

</body>

*********** modal *********

<section id="portfolio">
    ...
    <div id="edit-works-modal-container">
        <div>
            <section id="edit-works-modal">
                <i class="fa-solid fa-xmark edit-works-close"></i>
                <h2>Galerie photo</h2>
                <div id="edit-works">

                    *********** work item ***********
                    <article class="edit-work-item">
                        <img src="./assets/images/abajour-tahina.png" alt="">
                        <i class="fa-solid fa-trash-can edit-work-trash-can"></i>
                        <p>éditer</p>
                    </article>

                </div>
                <div class="separator"></div>
                <button class="edit-work-add-button">Ajouter une photo</button>
                <button class="edit-work-delete-galery">Supprimer la galerie</button>
            </section>
        </div>
    </div>
<section>

*/

let editWorks = {
    modalBackground: null,
    modal: null,
    worksContainer: null,

    createModal: function(){
        // modal background
        document.body.appendChild(this.modalBackground = this.renderModalBackground())
        // modal
        document.getElementById('portfolio').appendChild(this.modal = this.renderModal())
    },

    destroyModal: function(){
        document.getElementById('portfolio').removeChild(this.modal)
        document.body.removeChild(this.modalBackground)

        this.worksContainer = null
        this.modal = null
        this.modalBackground = null
    },

    renderModalBackground: function(){
        var div0 = document.createElement('div')
        div0.id = 'edit-works-modal-background'

        var div1 = document.createElement('div')
        div0.appendChild(div1)

        div0.addEventListener('click', (e)=>{
            e.preventDefault()
            this.destroyModal()
        })

        return div0
    },

    renderModal: function(){
        var container = document.createElement('div')
        container.id = 'edit-works-modal-container'

        var div = document.createElement('div')
        container.appendChild(div)

        var section = document.createElement('section')
        section.id = 'edit-works-modal'
        div.appendChild(section)

        var i = document.createElement('i')
        i.className = 'fa-solid fa-xmark edit-works-close'
        section.appendChild(i)

        i.addEventListener('click', (e)=>{
            e.preventDefault()
            this.destroyModal()
        })

        var h2 = document.createElement('h2')
        h2.innerText = 'Galerie photo'
        section.appendChild(h2)

        var div = document.createElement('div')
        div.id = "edit-works"
        section.appendChild(div)

        this.worksContainer = div

        var div = document.createElement('div')
        div.className = 'separator'
        section.appendChild(div)

        var button = document.createElement('button')
        button.className = 'edit-work-add-button'
        button.innerText = 'Ajouter une photo'
        section.appendChild(button)

        var button = document.createElement('button')
        button.className = 'edit-work-delete-galery'
        button.innerText = 'Supprimer la galerie'
        section.appendChild(button)

        return container
    },

    renderWorks: async function(){
        let works = await data.works.getWorks()
        if (works === null){
            // in case of error, dont display anything
            return;
        }

        this.worksContainer.innerHTML = '';

        works.forEach(work => {
            this.worksContainer.appendChild(this.renderWork(work))
        })
    },

    renderWork: function(work){
        let article = document.createElement('article')
        article.className = "edit-work-item"

        let img = document.createElement('img')
        img.src = work.imageUrl
        img.alt = work.title
        article.appendChild(img)

        let i = document.createElement('i')
        i.className = 'fa-solid fa-trash-can edit-work-trash-can'
        article.appendChild(i)

        i.addEventListener('click', (e)=>{
            e.preventDefault()
            this.deleteWork(work.id)
        })

        let p = document.createElement('p')
        p.innerText = 'éditer'
        article.appendChild(p)

        return article
    },

    deleteWork: async function(workId){
        if (await data.works.deleteWork(workId)){
            notifier.notify({what:'worksChanged'})
        }
    },

    onEvent: function(e){
        if (e.what === 'editWorks'){
            this.createModal()
            this.renderWorks()
        }
        else if (e.what === 'worksChanged'){
            this.renderWorks()
        }
    }
}

notifier.addListener(editWorks)
