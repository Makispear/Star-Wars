const all = 'all'
const resultsDiv = $('#results')
const resultsSection = $('.results-section')



const generateRandomChar = (e) => {
    e.preventDefault()
    $(resultsDiv).html('')
    const randomNumber = Math.ceil(Math.random() * 88)
    // Fetch all characters 
    $.get(`https://akabab.github.io/starwars-api/api/id/${randomNumber}.json`, (data) => {
        const getName = () => {
            if (data.name) {
                return `
                <li>
                    <h2 class="info-title">Name</h2>
                        <p>${data.name}</p>
                </li>
                
                `
            }
            return ''
        }

        const getGender = () => {
            if (data.gender) {
                return `
                <li class="info-list-item">
                    <h2 class="info-title">Gender</h2>
                    <ol class="content-list">
                        <li class="content-item">${data.gender}</li>
                    </ol>
                </li>
                `
            }
            return ''
        }

        const getImage = () => {
            if (data.image) {
                if (data.name === 'Mon Mothma') {
                    return `
                    <img src="./assets/images/Monmothma.jpg" alt="Mon Mothma's image">
                    `
                } else if (data.name === 'San Hill') {
                    return `
                    <img src="./assets/images/sanhills.jpg" alt="Mon Mothma's image">
                    `
                } else {
                    return `
                    <img src="${data.image}" alt="${data['name']}'s image">
                    `
                }
            }
            return ''
        }

        let loopAffiliations = () => {
            let affArr = data.affiliations
            const aff = affArr.map(element => {
                return `
                <li class="content-item affiliations line-height-third">${element}</li>
                `
            });
            return aff.join("")
        }

        const getAffiliations = () => {
            if (data.affiliations.length) {
                return `
                <li class="info-list-item">
                    <h2 class="info-title">Affiliations</h2>
                    <ol class="content-list">
                        ${loopAffiliations()}
                    </ol>
                </li>
                `
            } else {
                return `
                <li class="content-item affiliations line-height-third font-red">NO AFFILIATIONS</li>
                `
            }
        }

        const getWikiPage = () => {
            return `
            <p class="line-height-third wiki">
                * Visit character <a href="${data.wiki}" target="_blank">wiki</a> for more information!
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
                resultsDiv.append(singleCharacterDiv)
    })
}


let getAll = (e) => {
    e.preventDefault()
    $(resultsDiv).html('')
    // Fetch all characters 
    $.get(`https://akabab.github.io/starwars-api/api/${all}.json`, (data) => {
        // loop through the returned data 
        $.each(data, (index, obj) => {
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
                    if (obj.name === 'Mon Mothma') {
                        return `
                        <img src="./assets/images/Monmothma.jpg" alt="Mon Mothma's image">
                        `
                    } else if (obj.name === 'San Hill') {
                        return `
                        <img src="./assets/images/sanhills.jpg" alt="Mon Mothma's image">
                        `
                    } else {
                        return `
                        <img src="${obj.image}" alt="${obj['name']}'s image">
                        `
                    }
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
                if (obj.affiliations.length) {
                    return `
                    <li class="info-list-item">
                        <h2 class="info-title">Affiliations</h2>
                        <ol class="content-list">
                            ${loopAffiliations()}
                        </ol>
                    </li>
                    `
                } else {
                    return `
                    <li class="content-item affiliations line-height-third font-red">NO AFFILIATIONS</li>
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
            resultsDiv.append(singleCharacterDiv)
        })
    })
}


const filterCharacters = (e) => {
    e.preventDefault()
    $(resultsDiv).html('')

    let result = []
    let genderChosen = $('select[name="gender"]').val()

    // check for input and push accordingly 
        if (genderChosen) {
            result.push(genderChosen)
        } 
        if (!genderChosen) {
            return getAll(e)
        } 
        

    // check if user wants a filtered result 

    $.get(`https://akabab.github.io/starwars-api/api/${all}.json`, (data) => {
        let filteredData = data.filter(char => char.gender === genderChosen)
        $.each(filteredData, (index, obj) => {
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

            const getImage = () => {
                if (obj.image) {
                    if (obj.name === 'Mon Mothma') {
                        return `
                        <img src="./assets/images/Monmothma.jpg" alt="Mon Mothma's image">
                        `
                    } else if (obj.name === 'San Hill') {
                        return `
                        <img src="./assets/images/sanhills.jpg" alt="Mon Mothma's image">
                        `
                    } else {
                        return `
                        <img src="${obj.image}" alt="${obj['name']}'s image">
                        `
                    }
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
                if (obj.affiliations.length) {
                    return `
                    <li class="info-list-item">
                        <h2 class="info-title">Affiliations</h2>
                        <ol class="content-list">
                            ${loopAffiliations()}
                        </ol>
                    </li>
                    `
                } else {
                    return `
                    <li class="content-item affiliations line-height-third font-red">NO AFFILIATIONS</li>
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
                            ${getAffiliations()}
                            ${getWikiPage()}
                        </ul>
                    </div>
            </div>
            `
            resultsDiv.append(singleCharacterDiv)
        })
    })

}


const generateAll = $('button.generate')
generateAll.on('click', (e) => {
    e.preventDefault()
    return getAll(e)
})

const filterBtn = $('button.filter')
filterBtn.on('click', (e) => {
    e.preventDefault()
    return filterCharacters(e)
})

const clearBtn = $('button.clear')
clearBtn.click((e) => {
    e.preventDefault()
    return resultsDiv.html('')
})

const RandomBtn = $('button.random')
RandomBtn.on('click', (e) => {
    e.preventDefault()
    return generateRandomChar(e)
})
