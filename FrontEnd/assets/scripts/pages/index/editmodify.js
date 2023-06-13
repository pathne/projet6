
/*
<section id="portfolio">
    <h2 id="my-projects">Mes Projets

        <div id="modify-works">
            <i class="fa-regular fa-pen-to-square"></i>
            <p>modifier</p>
        </div>

    </h2>
*/

let editModify = {
    render: function(){
        // display modify button only if user is authenticated
        if (!authentication.isLogged()){
            return;
        }

        let div = document.createElement('div')
        div.id = 'modify-works';

        let i = document.createElement('i')
        i.className = 'fa-regular fa-pen-to-square'
        div.appendChild(i)

        let p = document.createElement('p')
        p.innerText = 'modifier'
        div.appendChild(p)

        var parent = document.getElementById('my-projects')
        parent.appendChild(div)

        div.addEventListener('click', (e)=>{
            e.preventDefault();
            notifier.notify({what:'editWorks'});
        });
    },

    onEvent: function(e){
        if (e.what === 'init'){
            this.render()
        }
    }
}

notifier.addListener(editModify);
