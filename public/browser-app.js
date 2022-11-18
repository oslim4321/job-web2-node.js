const formDOM = document.querySelector('button')
const usernameInputDOM = document.querySelector('.username-input')
const emailInputDOM = document.querySelector('.email-input')
const passwordInputDOM = document.querySelector('.password-input')
const formAlertDOM = document.querySelector('.form-alert')
const resultDOM = document.querySelector('.result')
const btnDOM = document.querySelector('#data')
const tokenDOM = document.querySelector('.token')
const EditPop=document.querySelector('.EditPop')


formDOM.addEventListener('click', async (e) => {
    e.preventDefault()
    const name = usernameInputDOM.value
    const email = emailInputDOM.value
    const password = passwordInputDOM.value

    try {
        const {data} = await axios.post('/api/v1/auth/register', { name, email, password })
        console.log(data)
      
            location.replace('./home.html')
      
    } catch (error) {
        console.log(error)
    }
})

        /* Edit Job Button Navigate*/
        allJob.addEventListener('click',async(e)=>{
            const el = e.target
            if (el.classList.contains('edit')) {
                const id = el.dataset.id
                console.log(id)
                
                try {
                  const data =  await axios.get(`/api/v1/job/${id}`)
                  
                    // const { company, position, status } = data.data.jobs;
                    let EditList = {dataEdit:data.data.jobs}
                    // console.log(EditList)
                    localStorage.setItem('EditTask', JSON.stringify(EditList))
                    location.replace('./EditJob.html')
                } catch (error) {
                    console.log(error)
                 }
            } else if (el.classList.contains('delete')) {
                const idDel = el.dataset.id
                try {
                    const data =  await axios.delete(`/api/v1/job/${idDel}`)
                    console.log(data);
                    location.reload()
                  } catch (error) {
                      console.log(error)
                   }
            }
        })
          /* Edit Job Button Navigate end*/
        
          
console.log(form, 'mee')