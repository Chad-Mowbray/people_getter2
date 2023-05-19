window.onload = () => {
  const baseUrl ="http://127.0.0.1:8000" 

  const listBtn = document.querySelector("#listBtn")
  const userSelect = document.querySelector("#userSelect")
  const userContainer = document.querySelector("#userContainer")

  // Generate options for the user dropdown dynamically
  for (let i = 1; i <= 100; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.text = i;
      userSelect.appendChild(option);
  }

  const doFetch = async (url) => {
    const result = await fetch(url)
    const resultJson = await result.json()
    return resultJson
  }

  const getPeople = async () => {
    const url = `${baseUrl}/all`
    const fetchResult = await doFetch(url)
    const people = fetchResult.people
    people.forEach( p => createHtmlPerson(p))
  }

  const getPerson = async (id) => {
    const url = `${baseUrl}/${id}` 
    const fetchResult = await doFetch(url)
    const person = fetchResult.person
    createHtmlPerson(person)
  }

  const removeUsers = () => {
    while(userContainer.firstChild) {
      userContainer.removeChild(userContainer.firstChild)
    }
  }

  const createHtmlPerson = (person) => {
    const div = document.createElement("div")
    const h3 = document.createElement("h3")
    const p1 = document.createElement("p")
    const p2 = document.createElement("p")

    h3.innerText = `name: ${person[1]}`
    p1.innerText = `email: ${person[2]}`
    p2.innerText = `favorite animal: ${person[3]}`

    div.appendChild(h3)
    div.appendChild(p1)
    div.appendChild(p2)

    div.className = "item"

    userContainer.appendChild(div)
  }


  userSelect.addEventListener("change" ,(e) => {
      removeUsers()
      getPerson(e.target.value)
    })
  
  listBtn.addEventListener("click" ,() => {
      removeUsers()
      getPeople()
    })
}