class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getFullList () {
    $.ajax({
      url: `https://ih-api.herokuapp.com/characters`,
      method: 'GET',
      success: (data)=>{
        console.log(`Character list retrieval successfull`);
        console.log(data);
        const characters = data;
        characters.forEach((character, i)=>{
          let characterHtml = `<div class="name">${character.name}</div>
          <div class="occupation">${character.occupation}</div>
          <div class="debt">${character.debt}</div>
          <div class="weapon">${character.weapon}</div>`;
          $('.character-info').append(`<div id="character-${i}"></div>`);
          $(`#character-${i}`).append(characterHtml);
        });
      },
      error: (err) => {
        console.log('GET error');
        console.log(err);
      }
    });
  }

  getOneRegister () {
    const id = $('input[name="character-id"]').val();

    $.ajax({
      url: `https://ih-api.herokuapp.com/characters/${id}`,
      method: 'GET',
      success: (data)=>{
        console.log(`Get ${data.name} success`);
        console.log(data);
        let character = data;
        $('.character-info').empty();
        let characterHtml = `<div class="name">${character.name}</div>
        <div class="occupation">${character.occupation}</div>
        <div class="debt">${character.debt}</div>
        <div class="weapon">${character.weapon}</div>`;
        $('.character-info').append(`<div id="character-${id}"></div>`);
        $(`#character-${id}`).append(characterHtml);
      },
      error: (err) => {
        console.log('PUT error');
        console.log(err);
      }
    });
    $('#update-form').trigger('reset');
  }

  createOneRegister (charInfo) {
    console.log(charInfo);
    $.ajax({
      url: `https://ih-api.herokuapp.com/characters`,
      method: 'POST',
      data:charInfo,
      success: (data)=>{
        console.log(`${data.name} created successfully!`);
        console.log(data);
      },
      error: (err) => {
        console.log('POST error');
        console.log(err);
        console.log(err.responseText);
      }
    });
    $('#new-character-form').trigger('reset');
  }

  updateOneRegister () {

  }

  deleteOneRegister () {
    const id = $('input[name="character-id-delete"]').val();
    $.ajax({
      url: `https://ih-api.herokuapp.com/characters/${id}`,
      method: 'DELETE',
      success: (data)=>{
        console.log(`Delete ${data.name} success`);
        console.log(data);
        $('#delete-message').html('Character has been successfully deleted.');
      },
      error: (err) => {
        console.log('PUT error');
        $('#delete-message').html('Character not found.');
        console.log(err);
      }
    });
    $('#update-form').trigger('reset');
  }
}
