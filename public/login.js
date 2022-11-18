const formDOM = document.querySelector('button')
const emailInputDOM = document.querySelector('.email-input')
const passwordInputDOM = document.querySelector('.password-input')
const formAlertDOM = document.querySelector('.form-alert')
const resultDOM = document.querySelector('.result')
const btnDOM = document.querySelector('#data')
const tokenDOM = document.querySelector('.token')

formDOM.addEventListener('click', async (e) => {
    e.preventDefault()
    const email = emailInputDOM.value
    const password = passwordInputDOM.value
    try {
        const {data}  = await axios.post('/api/v1/auth/login', {email, password}) 
        console.log(data)
        if (data) {
            location.replace('./home.html')
        }
    } catch (error) {
        console.log(error)
    }
})

