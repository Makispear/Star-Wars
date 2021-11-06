const randomNumber = Math.ceil(Math.random() * 88)
const all = 'all'
const resultsSection = $('#results')

let helper = {
    0: "id",
    1: "name",
    2: "height",
    3: "mass",
    4: "gender",
    5: "homeworld",
    6: "wiki",
    7: "image",
    8: "born",
    9: "bornLocation",
    10: "died",
    11: "diedLocation",
    12: "species",
    13: "hairColor",
    14: "eyeColor",
    15: "skinColor",
    16: "cybernetics",
    17: "affiliations",
    18: "masters",
    19: "apprentices",
    20: "formerAffiliations"
}

 

$('button.generate').on('click', (e) => {
    e.preventDefault()
    $(resultsSection).html('')
    // Fetch all characters 
    $.get(`https://akabab.github.io/starwars-api/api/${all}.json`, (data) => {
        // loop through the returned data 
        console.log(data[1].affiliations)
        data.forEach(obj => {
            const getName = () => {
                if (obj.name) {
                    return `
                    <li>
                        <h2 class="info-title">Name</h2>
                            <p>${obj.name}</p>
                    </li>
                    
                    `
                }
                return ''
            }

            const getGender = () => {
                if (obj.gender) {
                    return `
                    <li class="info-list-item">
                        <h2 class="info-title">Gender</h2>
                        <ol class="content-list">
                            <li class="content-item">${obj.gender}</li>
                        </ol>
                    </li>
                    `
                }
                return ''
            }

            const getImage = () => {
                if (obj.image) {
                    return `
                    <img src="${obj.image}" alt="${obj['name']}'s image">
                    `
                }
                return ''
            }

            let loopAffiliations = () => {
                let affArr = obj.affiliations
                const aff = affArr.map(element => {
                    return `
                    <li class="content-item affiliations line-height-third">${element}</li>
                    `
                });
                return aff.join("")
            }

            const getAffiliations = () => {
                if (obj.affiliations) {
                    return `
                    <li class="info-list-item">
                        <h2 class="info-title">Affiliations</h2>
                        <ol class="content-list">
                            ${loopAffiliations()}
                        </ol>
                    </li>
                    `
                }
            }

            const getWikiPage = () => {
                return `
                <p class="line-height-third wiki">
                    * Visit character <a href="${obj.wiki}" target="_blank">wiki</a> for more information!
                </p>
                `
            }

            const singleCharacterDiv = `
            <div class="singleCharacter">
                    <div class="img-div">
                        ${getImage()}
                    </div>
                    <div class="info-div">
                        <ul class="info-ul">
                            ${getName()}
                            ${getGender()}
                            ${getAffiliations()}
                            ${getWikiPage()}
                        </ul>
                    </div>
            </div>
            `
            resultsSection.append(singleCharacterDiv)
            
        })
    })
})

$('button.filter').on('click', (e) => {
    e.preventDefault()
    $(resultsSection).html('')

    let result = []
    let genderChosen = $('select[name="gender"]').val().trim()
    let locationChosen = $('select[name="location"]').val().trim()
    console.log(genderChosen)
    console.log(locationChosen)
    $.get(`https://akabab.github.io/starwars-api/api/${all}.json`, (data) => {
        result.push(data.filter(element => element.bornLocation === locationChosen ))
        console.log(result)
    })


        // loop through the returned data 
        result.forEach(obj => {
            const getName = () => {
                if (obj.name) {
                    return `
                    <li>
                        <h2 class="info-title">Name</h2>
                            <p>${obj.name}</p>
                    </li>
                    
                    `
                }
                return ''
            }

            const getGender = () => {
                if (obj.gender) {
                    return `
                    <li class="info-list-item">
                        <h2 class="info-title">Gender</h2>
                        <ol class="content-list">
                            <li class="content-item">${obj.gender}</li>
                        </ol>
                    </li>
                    `
                }
                return ''
            }

            const getImage = () => {
                if (obj.image) {
                    return `
                    <img src="${obj.image}" alt="${obj['name']}'s image">
                    `
                }
                return ''
            }

            let loopAffiliations = () => {
                let affArr = obj.affiliations
                const aff = affArr.map(element => {
                    return `
                    <li class="content-item affiliations line-height-third">${element}</li>
                    `
                });
                return aff.join("")
            }

            const getAffiliations = () => {
                if (obj.affiliations) {
                    return `
                    <li class="info-list-item">
                        <h2 class="info-title">Affiliations</h2>
                        <ol class="content-list">
                            ${loopAffiliations()}
                        </ol>
                    </li>
                    `
                }
            }

            const getWikiPage = () => {
                return `
                <p class="line-height-third wiki">
                    * Visit character <a href="${obj.wiki}" target="_blank">wiki</a> for more information!
                </p>
                `
            }

            const singleCharacterDiv = `
            <div class="singleCharacter">
                    <div class="img-div">
                        ${getImage()}
                    </div>
                    <div class="info-div">
                        <ul class="info-ul">
                            ${getName()}
                            ${getGender()}
                            ${getAffiliations()}
                            ${getWikiPage()}
                        </ul>
                    </div>
            </div>
            `
            resultsSection.append(singleCharacterDiv)
            
        })
})