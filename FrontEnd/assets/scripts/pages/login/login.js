
var login = {
    pending: false,
    error: null,

    init: function(){
        const form = document.getElementById('login-form')
        form.addEventListener('submit', (e)=>{
            e.preventDefault()
            this.doLogin()
        })
    },

    render: function(){
        document.getElementById('login-submit').disabled = this.pending
        const error = document.getElementById('login-error')
        error.style.display = this.error?'block':'none'
        error.innerText = this.error || ''
    },

    onEvent: function(e){
        if (e.what === 'init'){
            this.init()
        }
        else if (e.what === 'loginFailed'){
            this.error = strings[e.reason]
            this.render()
        }
    },

    doLogin: async function(){
        if (this.pending){
            return
        }

        const email = document.getElementById('login-email').value.trim()
        const password = document.getElementById('login-password').value.trim()

        if (email === '' || password === ''){
            this.error = strings.emailAndPasswordAreRequired
            this.render()
            return
        }

        this.error = null
        this.render()

        this.pending = true;
        if (await authentication.login(email, password)){
            window.location.href = 'index.html'
        }
        this.pending = false;
        this.render()
    }
}

notifier.addListener(login)
