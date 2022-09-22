$(document).ready(() => {
    const apiKey = `6e8b2acac15a42fc99b75f6f8e92662f`;
    const baseUrl = `https://api.spoonacular.com`


    const findByIngredient = async () => {
        const ingredient = $('#ingredient').val();
        $('#ingredient').val('');
        const endPoint = `/recipes/findByIngredients`;
        const requestParams = `?apiKey=${apiKey}&ingredients=${ingredient}&number=5`;
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
    const renderTitle = (title) => {
        const titleEl = $('<h3>');
        titleEl.text(title);
        $('.output').append(titleEl);
    }
    const renderImg = (url) => {
        const img = $('<img>');
        img.attr({
            src: url,
            alt: 'recipe image'
        })
        $('.output').append(img)
    }

    const renderMissedIngredients = (missedArr) => {
        const missIngreList = $('<ul>');
        missIngreList.text(`other ingredient:`);
        for (let x = 0; x < missedArr.length; x++) {
            const missIngreItem = $('<li>')
            missIngreItem.text(missedArr[x].name);
            missIngreList.append(missIngreItem)
            $('.output').append(missIngreList);
        }
    }


    const renderIngredientResult = (result) => {
        for (let x = 0; x < result.length; x++) {
            renderTitle(result[x].title);
            renderImg(result[x].image);
            renderMissedIngredients(result[x].missedIngredients)
            $('.output').append('<hr>')

        }
    }

    const search = async () => {
        const result = await findByIngredient();
        renderIngredientResult(result);
    }

    $('.btn').on('click', (event) => {
        event.preventDefault();
        $('.output').text('')
        search();
    })


})
