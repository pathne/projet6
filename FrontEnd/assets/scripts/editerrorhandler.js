
/*
    ...
    <div class="edit-error-modal-background">
        <div class="edit-error-modal">
            <p>Désolé serveur</p>
            <div class="edit-error-modal-button">Réessayer</div>
        </div>
    </div>
</body>
*/

let editErrorHandler = {
    displayError: function(message, actionText, action){
        var div = document.createElement('div')
        div.className = 'edit-error-modal-background'

        var div2 = document.createElement('div')
        div2.className = 'edit-error-modal'
        div.appendChild(div2)

        var p = document.createElement('p')
        p.innerText = message
        div2.appendChild(p)

        var div3 = document.createElement('div')
        div3.className = 'edit-error-modal-button'
        div3.innerText = actionText
        div2.appendChild(div3)

        div3.addEventListener('click', (e)=>{
            e.preventDefault()
            document.body.removeChild(div)
            if (action){
                action();
            }
        });

        document.body.appendChild(div)
    },

    onEvent: function(e){
        if (e.what === 'editFetchError'){
            this.displayError(strings.editFetchError, strings.ok, null);
        }
        else if (e.what === 'authorizationExpired'){
            this.displayError(strings.authorizationExpired, strings.relog, ()=>{
                window.location.href = "./login.html"
            });
        }
    }
}

notifier.addListener(editErrorHandler)
