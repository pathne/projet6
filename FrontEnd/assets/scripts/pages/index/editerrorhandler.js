
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
    isDisplayed: {},

    displayError: function(message, actionText, action){
        if (this.isDisplayed[message]){
            return
        }
        this.isDisplayed[message] = true

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
            this.isDisplayed[message] = false;
            if (action){
                action()
            }
        });

        document.body.appendChild(div)
    },

    onEvent: function(e){
        if (e.what === 'editFetchError'){
            this.displayError(strings.editFetchError, strings.ok, null)
        }
        else if (e.what === 'authorizationExpired'){
            this.displayError(strings.authorizationExpired, strings.relog, ()=>{
                window.location.href = "./login.html"
            })
        }
        else if (e.what === 'addPhotoFieldsRequiredError'){
            this.displayError(strings.editAddPhotoFieldsRequired, strings.ok, null)
        }
    }
}

notifier.addListener(editErrorHandler)
