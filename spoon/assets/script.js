$(document).ready(() => {
    const apiKey = `6e8b2acac15a42fc99b75f6f8e92662f`;
    const baseUrl = `https://api.spoonacular.com`

    const findByIngredient = async () => {
        const ingredient = $('#ingredient').val();

        const endPoint = `/recipes/findByIngredients`;
        const requestParams = `?apiKey=${apiKey}&ingredients=${ingredient}&number=6`;
        const urlToFetch = `${baseUrl}${endPoint}${requestParams}`;
        try {
            const response = await fetch(urlToFetch);
            if (response.ok) {
                const result = await response.json();
                console.log(result)
                return result;
            }
        } catch (error) {
            console.log(error.message);
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
            titleEl.text(result[index].title).css({ 'fontSize': '1.5rem', 'text-align': 'center' })
            const img = $('<img>');
            img.attr({
                src: result[index].image,
                alt: 'recipe image',
                style: 'width: 200px; height: 200px'
            })
            const missIngreList = $('<ul>');
            missIngreList.text(`other ingredient:`).css('fontSize', '1.2rem');
            const missedArr = result[index].missedIngredients;
            for (let x = 0; x < missedArr.length; x++) {
                const missIngreItem = $('<li>')
                missIngreItem.text(missedArr[x].name);
                missIngreList.append(missIngreItem)
            }
            $(`#card${x + 1}`).append(titleEl).append(img).append(missIngreList);
            index += 1;
        }
    }
    const search = async (index) => {
        const result = await findByIngredient();
        console.log(result);
        if (result.length == 0) {
           return ''
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
})
