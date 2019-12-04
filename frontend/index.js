const body = document.body 


fetch('http://localhost:3000/breeds')
    .then(handleResponse)
    .then(showDogs)



function handleResponse(response){
    return response.json()
}

const dogSection = document.querySelector('#dog-section')
const dogForm = document.querySelector('#dog-form')

function showDogs(dogs){

    dogForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const breedData = new FormData(event.target)
        const aDogsBreed = breedData.get('breed')
        const aDogsInfo = breedData.get('info')
        const aDogsPic = breedData.get('image_url')
        
        fetch('http://localhost:3000/breeds', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'breed': aDogsBreed,
                'info': aDogsInfo,
                'image_url': aDogsPic
            })
        })

    })

    dogs.forEach(dog => {
        const dogCard = document.createElement('div')
        const dogBreed = document.createElement('h2')
        const dogPic = document.createElement('img')
        const dogInfo = document.createElement('h5')
        dogCard.id = 'dog-div'

        dogBreed.innerText = dog.breed 
        dogPic.src = dog.image_url 
        dogInfo.innerHTML = `<a href=description.html?id=${dog.id}>This dog's Description</a>`

        dogCard.addEventListener('click', (event) => {
            fetch(`http://localhost:3000/breeds${dog.info}`, {
                method: 'VIEW' 
            }).then(window.location = `${dog.info}`)
        })
        dogSection.appendChild(dogCard)  
        dogCard.append(dogPic, dogBreed, dogInfo)
    })
}

// function dogFormFunction(dogs){

// }