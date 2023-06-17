
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
            <!-- content -->
            <section id="edit-works-modal">
                <!-- back icon -->
                <i class="fa-solid fa-arrow-left edit-works-back"></i>
                <!-- close icon -->
                <i class="fa-solid fa-xmark edit-works-close"></i>

            </section>
        </div>
    </div>
<section>

*/

let editModal = {
    modalBackground: null,
    modal: null,
    content: null,

    initModal: function(backEvent){
        if (this.modalBackground === null){
            // modal background
            document.body.appendChild(this.modalBackground = this.renderModalBackground())
            // modal
            document.getElementById('portfolio').appendChild(this.modal = this.renderModal())
        }
        this.initContent(backEvent)
        return this.content
    },

    destroyModal: function(){
        document.getElementById('portfolio').removeChild(this.modal)
        document.body.removeChild(this.modalBackground)

        this.content = null
        this.modal = null
        this.modalBackground = null
    },

    renderModalBackground: function(){
        const div0 = document.createElement('div')
        div0.id = 'edit-works-modal-background'

        const div1 = document.createElement('div')
        div0.appendChild(div1)

        div0.addEventListener('click', (e)=>{
            e.preventDefault()
            this.destroyModal()
        })

        return div0
    },

    renderModal: function(){
        const container = document.createElement('div')
        container.id = 'edit-works-modal-container'

        const div = document.createElement('div')
        container.appendChild(div)

        const section = document.createElement('section')
        section.id = 'edit-works-modal'
        div.appendChild(section)

        this.content = section

        return container
    },

    initContent: function(backEvent){
        this.content.innerHTML = ''

        if (backEvent){
            const i = document.createElement('i')
            i.className = 'fa-solid fa-arrow-left edit-works-back'
            this.content.appendChild(i)

            i.addEventListener('click', (e)=>{
                e.preventDefault()
                notifier.notify(backEvent);
            })
        }

        const i = document.createElement('i')
        i.className = 'fa-solid fa-xmark edit-works-close'
        this.content.appendChild(i)

        i.addEventListener('click', (e)=>{
            e.preventDefault()
            this.destroyModal()
        })
    }
}
