let baseURL = "https://www.boredapi.com/api/activity/"
// Get random activity
// fetch(baseURL)
// Get activity by participant count
// fetch(baseURL + '?participants=1&?price=0.0')
// Get activity by cost 
// fetch(baseURL + '?price=0.0')

let activityTypes = [
    "education", "recreational", "social",
    "diy", "charity", "cooking",
    "relaxation", "music", "busywork"
]

// Populate Header Section with Random Activity
getRandom()
populateForm()

getRandomForTypes()

let activityTypes = [
    "education",
    "recreational",
    "social",
    "diy",
    "charity",
    "cooking",
    "relaxation",
    "music",
    "busywork"
]

for (let activity of activityTypes){
    fetch(baseURL + `?type=${activity}`)
        .then(res => res.json())
        .then(json => console.log(json.activity, json.type))

function populateForm(){
    formTypeField = document.getElementById('type')
    for (let activity of activityTypes){
        //<option value="any">Any</option>
        let type = document.createElement("option")
        type.value = activity
        type.innerText = activity[0].toUpperCase() + activity.slice(1)
        formTypeField.appendChild(type)
    }
}


function getRandomForTypes(){

    let results = []
    for (let activity of activityTypes){
        results.push(fetch(baseURL + `?type=${activity}`)
            .then(res => res.json())
            .then(json => {
                return json 
            })
        )
    }

    Promise.all(results)
        .then(displayTypes)

}

function displayTypes(activities){
    let sorted = [...activities]
    sorted.sort((a, b) => {
         return a.type.toUpperCase() > b.type.toUpperCase() ? 1 : -1
    })

    for (let idea of sorted){
        console.log(idea)
        let entry = document.createElement('div')
        entry.innerHTML = `<h2>${idea.type[0].toUpperCase() + idea.type.slice(1)} </h2>
        <p> ${idea.activity} </p>
        `
        document.getElementById('activity-types').appendChild(entry)
    }
}



function getRandom(){
    fetch(baseURL)
        .then(res => res.json())
        .then(json => displayRandom(json))
}
    
function displayRandom(json){
    document.getElementById('activity-data').innerText = json.activity
}