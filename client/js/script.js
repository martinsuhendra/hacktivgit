function fetchUser() {
    $.ajax({
            url: 'http://localhost:3000/users',
            method: 'GET',
        })
        .done(function (response) {
            
            $(`#my-name`).html(`<h4 style="padding-left:30px; margin-top:20px"> Hello, ${response.name}! </h4><br>
            <div class="card" style="width: 18rem;">
            <img src="${response.avatar_url}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title" style="text-align:center">${response.login}</h5>
            </div>
          </div>`)
        })
        .fail(function (jqXHR, textStatus) {
            console.log(`request failed`, textStatus)
        })
}

function fetchStar() {
    $.ajax({
            url: 'http://localhost:3000/user/starred',
            method: 'GET'
        })
        .done(function (response) {
            let content = ``
            response.forEach(repo => {
                
                content += `
            <div class="card" style="width: 18rem;margin-bottom:10px">
  <div class="card-body">
    <h5 class="card-title">${repo.full_name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${repo.name}</h6>
    <p class="card-text">${repo.description}</p>
    <button type="button" class="btn btn-warning" data-id=${repo.full_name}>Unstar</button>
  </div>
</div>`
            });
            $(`#users-details`).append(content)
        })
        .fail(function (jqXHR, textStatus) {
            console.log(`request failed`, textStatus)
        })
}

function fetchPersonalRepo() {
    $.ajax({
            url: `http://localhost:3000/users/martinsuhendra/repos`,
            method: `GET`
        })
        .done((response) => {
            let content = ``
            response.forEach(repo => {
                content += `${repo.full_name}<br>`
            })
            $(`#personal-repo`).append(content)
        })
        .fail(function (jqXHR, textStatus) {
            console.log(`request failed`, textStatus)
        })
}

function searchByName() {
    $(`#search-user-result`).empty()
    let input = $(`#input-search`).val()
    if (input) {
        $.ajax({
            url: `http://localhost:3000/user/starred/search/?username=${input}`,
            method: `GET`
        })
        .done((response) => {
            console.log(response)
            let content = ``
            response.forEach(resp => {
                content += `<div class="card" style="width: 18rem;margin-bottom:10px">
                <div class="card-body">
                  <h5 class="card-title">${resp.full_name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${resp.name}</h6>
                  <p class="card-text">${resp.description}</p>
                </div>
              </div>`
            })
            $(`#users-details`).empty()
            $(`#search-user-result`).append(content)
        })
        .fail(function (jqXHR, textStatus) {
            console.log(`request failed`, textStatus)
        })
    } else {
        fetchStar()
    }
   
}

function createRepo() {

    event.preventDefault()
    let name = $(`#create-input`).val()
    
    $.ajax({
        url : `http://localhost:3000/users`,
        method: `POST`,
        data : {
            name
        }
    })
    .done((response)=> {
        console.log(response, 'ny APA YArs')
    })
    .fail(function (jqXHR, textStatus) {
        console.log(`request failed`, textStatus)
    })
}

function unstar() {
    
    // $.ajax({
    //     url: `http://localhost:3000/user/starred/${this.fu}/:repo`
    // })
}


$(document).ready(function () {
    fetchUser()
    fetchStar()
    fetchPersonalRepo()

    $(`#search-button`).on('click', function(){
        searchByName()
    })

    $(`#create-button`).on('click', function(){
        createRepo()
    })
    
    $(`#users-details`).on('click','.btn-warning', function(){
        unstar()
    })
})