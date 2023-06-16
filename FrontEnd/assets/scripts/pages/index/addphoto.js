
/*
    ******** modal content *******
    <h2>Ajout photo</h2>
    <form action="#">
        <div id="add-file">
            ****** image displayed *******
            <img src="./assets/images/abajour-tahina.png" alt="ff">
            ****** add image file displayed *******
            <i class="fa-regular fa-image"></i>
            <input type="file" accept="*">
            <button>+ Ajouter photo</button>
            <p>jpg, png : 4 mo max</p>
            *******
        </div>
        <div class="inputs">
            <div class="add-photo-input">
                <label for="input-title">Titre</label>
                <input id="input-title" type="text">
            </div>
            <div class="add-photo-input">
                <label for="input-title">Catégorie</label>
                <select id="input-category">
                    <option value="1">Objets</option>
                    <option value="2">Appartements</option>
                </select>
            </div>
        </div>
        <div class="separator"></div>
        <button class="add-photo-validate">Valider</button>
    </form>

*/

let addPhoto = {
    renderModal: function(){
        let content = editModal.initModal({what:'showEditWorksModal'})

        let h2 = document.createElement('h2')
        h2.innerText = 'Ajout photo'
        content.appendChild(h2)

        let form = document.createElement('form')
        form.action = '#'

        let div = document.createElement('div')
        div.id = 'add-file'
        form.appendChild(div)

        let i = document.createElement('i')
        i.className = "fa-regular fa-image"
        div.appendChild(i)

        let input = document.createElement('input')
        input.type = 'file'
        input.accept = '.png,.jpg'
        div.appendChild(input)

        let button = document.createElement('button')
        button.innerText = '+ Ajouter photo'
        div.appendChild(button)

        let p = document.createElement('p')
        p.innerText = 'jpg, png : 4 mo max'
        div.appendChild(p)

        div = document.createElement('div')
        div.className = 'inputs'
        form.appendChild(div)

        let div2 = document.createElement('div')
        div2.className = 'add-photo-input'
        div.appendChild(div2)

        let label = document.createElement('label')
        label.for = 'input-title'
        label.innerText = 'Titre'
        div2.appendChild(label)

        input = document.createElement('input')
        input.id = 'input-title'
        input.type = 'text'
        div2.appendChild(input)

        div2 = document.createElement('div')
        div2.className = 'add-photo-input'
        div.appendChild(div2)

        label = document.createElement('label')
        label.for = 'input-category'
        label.innerText = 'Catégorie'
        div2.appendChild(label)

        let select = document.createElement('select')
        select.id = 'input-category'
        div2.appendChild(select)

        let option = document.createElement('option')
        option.value = 1
        option.innerText = 'Objets'
        select.appendChild(option)

        div = document.createElement('div')
        div.className = 'separator'
        form.appendChild(div)

        button = document.createElement('button')
        button.className = 'add-photo-validate'
        button.innerText = 'Valider'
        form.appendChild(button)

        content.appendChild(form)
    },

    onEvent: function(e){
        if (e.what === 'showAddPhotoModal'){
            this.renderModal()
        }
    }
}

notifier.addListener(addPhoto)
