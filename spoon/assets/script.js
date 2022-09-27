$(document).ready(() => {
    const apiKey = `6e8b2acac15a42fc99b75f6f8e92662f`;
    const apiKey2 = `0abc5e5eba504379adc2ea1c904d41f2`
    const baseUrl = `https://api.spoonacular.com`

    const findByIngredient = async () => {
        const ingredient = $('#ingredient').val();
        const endPoint = `/recipes/findByIngredients`;
        const requestParams = `?apiKey=${apiKey2}&ingredients=${ingredient}&number=6`;
        const urlToFetch = `${baseUrl}${endPoint}${requestParams}`;
        try {
            const response = await fetch(urlToFetch);
            if (response.ok) {
                const result = await response.json();
                console.log(result)
                saveRecipeId(result)
                return result;
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const saveRecipeId = (result) => {
        for (let x = 0; x < result.length; x++) {
            const idKey = result[x].title;
            const idValue = result[x].id;
            localStorage.setItem(idKey, idValue);
        }
    }

    const createCards = () => {
        const left = $('<i class="before fa fa-angle-left" style="font-size:24px"></i>')
        $('.output').append(left)
        for (let x = 0; x < 3; x++) {

            const card = $("<div class='card'>")
            card.attr('id', `card${x + 1}`)
            $('.output').append(card)
        }
        const right = $('<i class="after fa fa-angle-right" style="font-size:24px"></i>')
        $('.output').append(right)
    }

    const renderIngredientResult = (result, index) => {
        for (let x = 0; x < 3; x++) {
            const titleEl = $(`<h3>`);
            titleEl.text(result[index].title).addClass('card-title')
            const img = $('<img>');
            img.attr({
                src: result[index].image,
                alt: 'recipe image',
                style: 'width: 200px; height: 200px;'
            }).addClass('card-img');
            $(`#card${x + 1}`).append(titleEl).append(img);
            index += 1;
        }
    }

    const renderDetailLink = (event) => {
        if (event.target.className == 'card') {
            // console.log('click card ' + $(event.currentTarget).find('.card-title').text())
        } else if (event.target.className == 'card-title') {
            // console.log('click title ' + $(event.currentTarget).text())
        } else {
            // console.log('click img ' + $(event.currentTarget).siblings('.card-title').text())
        }
        const idKey = $(event.currentTarget).find('.card-title').text() || $(event.currentTarget).text() || $(event.currentTarget).siblings('.card-title').text()
        const idValue = localStorage.getItem(idKey);
        const url = `https://spoonacular.com/recipes/${idKey.split(' ').join('-')}-${idValue}`;
        window.location.assign(url);

    }

    const search = async (index) => {
        const result = await findByIngredient();
        if (result == undefined || result.length == 0) {
            $('.modal').show();
            $('#ingredient').val('')
        } else {
            createCards();
            renderIngredientResult(result, index);
        }
    }

    $('.search').on('click', (event) => {
        event.preventDefault();
        $('.output').text('')
        search(0);
    })

    $('.output').on('click', '.before', () => {
        $('.output').text('');
        search(0);
    })
    $('.output').on('click', '.after', () => {
        $('.output').text('');
        search(3);
    })

    $('.delete').on('click', () => {
        $('.modal').hide();
    })

    $('.output').on('click', '.card', (event) => {
        renderDetailLink(event);
    })

})
