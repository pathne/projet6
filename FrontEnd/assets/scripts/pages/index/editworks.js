
/*
<section id="portfolio">
    ...
    <div id="edit-works-modal-container">
        <div>
            <section id="edit-works-modal">
                ...

                *********** edit works modal content *********
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
    worksContainer: null,

    deletePendings: {},

    renderModal: function(){
        let content = editModal.initModal(false)

        var h2 = document.createElement('h2')
        h2.innerText = 'Galerie photo'
        content.appendChild(h2)

        var div = document.createElement('div')
        div.id = "edit-works"
        content.appendChild(div)

        this.worksContainer = div

        var div = document.createElement('div')
        div.className = 'separator'
        content.appendChild(div)

        var button = document.createElement('button')
        button.className = 'edit-work-add-button'
        button.innerText = 'Ajouter une photo'
        content.appendChild(button)

        button.addEventListener('click', (e)=>{
            e.preventDefault()
            notifier.notify({what: 'showAddPhotoModal'})
        });

        var button = document.createElement('button')
        button.className = 'edit-work-delete-galery'
        button.innerText = 'Supprimer la galerie'
        content.appendChild(button)
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
        if (this.deletePendings[workId]){
            return
        }
        this.deletePendings[workId] = true
        if (await data.works.deleteWork(workId)){
            notifier.notify({what:'worksChanged'})
        }
        delete this.deletePendings[workId]
    },

    onEvent: function(e){
        if (e.what === 'showEditWorksModal'){
            this.renderModal()
            this.renderWorks()
        }
        else if (e.what === 'worksChanged'){
            this.renderWorks()
        }
    }
}

notifier.addListener(editWorks)
