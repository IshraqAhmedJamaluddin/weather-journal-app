/* Global Variables */
const base_url = 'http://api.openweathermap.org/data/2.5/'
const key = '99a1f40074046bff230a9390fda562f2'
const to_do = 'weather'

const getWeather = async (zip) => {
    let url = `${base_url}${to_do}?zip=${zip},us&appid=${key}&units=imperial`
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
        // Create a new date instance dynamically with JS
        let d = new Date();
        let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();
        let info = {}
        info['temperature'] = data['main']['temp']
        info['date'] = newDate
        info['user_response'] = document.getElementById('feelings').value
        update_server('/weather', info)
        .then(update_UI('/weather'))
    })
    .catch((error) => {console.log(error)})
}
document.getElementById('generate').addEventListener('click', () => {
    const zip = document.getElementById('zip').value
    getWeather(zip)
})

const update_server = async (path, data) => {
    fetch(path, {
        method: 'post',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(data)
    })
}

const update_UI = async (path) => {
    fetch(path)
    .then((resp) => resp.json())
    .then((data) => {
        document.getElementById('temp').innerHTML = data['temperature']
        document.getElementById('date').innerHTML = data['date']
        document.getElementById('content').innerHTML = data['user_response']
    })
}