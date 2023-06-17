
/*
<body>
<div id="edit-header" class="edit-header edit-header-visible">
    <i class="fa-regular fa-pen-to-square"></i>
    <p>Mode édition</p>
    <div class="edit-header-publish">publier les changements</div>
</div>
...
*/

let editHeader = {
    render: function(){
        // display header only if user is authenticated
        if (!authentication.isLogged()){
            return
        }

        const div0 = document.createElement('div')
        div0.className = 'edit-header edit-header-visible'

        const i = document.createElement('i')
        i.className = "fa-regular fa-pen-to-square"
        div0.appendChild(i)

        const p = document.createElement('p')
        p.innerText = 'Mode édition'
        div0.appendChild(p)

        const div1 = document.createElement('div')
        div1.className = 'edit-header-publish'
        div1.innerText = 'publier les changements'
        div0.appendChild(div1)

        const body = document.body
        body.insertBefore(div0, body.children[0])
    },

    onEvent: function(e){
        if (e.what === 'init'){
            this.render()
        }
    }
};

notifier.addListener(editHeader)
