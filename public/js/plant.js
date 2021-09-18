const plantFormHandler = async (event) => {
  event.preventDefault();

  const dtFormat = 'YYYY-MM-DD HH:mm:ss';

  // Collect values from the login form
  const name = document.querySelector('#plant-name').value.trim();
  const botanical_name = document
    .querySelector('#plant-botanical-name')
    .value.trim();
  const sun_exposure = document
    .querySelector('#plant-sun-exposure')
    .value.trim();
  const mature_size = document.querySelector('#plant-mature-size').value.trim();

  const date_planted = document
    .querySelector('#plant-date-planted')
    .value.trim();

  const watering_freq_num = document.querySelector('#plant-watering-num').value;

  /* const watering_freq-num = document.querySelector(
    '#plant-watering-num'
  ).value; */

  /*   if (date_planted) {
    date_planted = moment(date_planted).format(dtFormat);
  } */

  const last_watering_date = document
    .querySelector('#plant-last-watering-date')
    .value.trim();

  /* var contractMoment = moment(contract, 'DD/MM/YYYY');
  var start = moment(contractMoment).add(19, 'days');
  var end = moment(contractMoment).add(51, 'days'); */

  /* 
  if (last_watering_date) {
    last_watering_date = moment(last_watering_date).format(dtFormat);
  }
 */
  console.log('******** Planned Date', date_planted);
  // console.log('******** last watering date', last_watering_date);
  const category_id = document
    .getElementById('add-submit')
    .getAttribute('data-category');
  console.log('***1111 categoryid', category_id);

  // selected location
  const location_id = document.getElementById('location-selection').value;

  const watering_frequency_interval = document.getElementById(
    'selection-frequency'
  ).value;

  let start = moment(last_watering_date);
  console.log(moment().add(watering_freq_num, watering_frequency_interval));
  console.log(start.add(watering_freq_num, watering_frequency_interval));
  const next_watering_date = start;

  if (name) {
    // Send a POST request to the API endpoint
    const postUrl = '/api/plant/addplant';
    const postPayLoad = JSON.stringify({
      name,
      botanical_name,
      sun_exposure,
      mature_size,
      // date_planted,
      //last_watering_date,
      category_id,
      location_id,
      date_planted,
      last_watering_date,
      watering_freq_num,
      watering_frequency_interval,
      next_watering_date,
    });

    const plantData = await postData(postUrl, postPayLoad);
    const plantId = plantData.id;
    console.log('***** plantid', plantId);
    if (plantId) {
      console.log('%%%%%%' + plantData);
      alert('Plant added successfully');
      const url = '/api/categories/' + category_id + '/plants';
      document.location.replace(url);
    } else {
      alert('Failed to create plant record');
    }
  }
};

async function postData(url = '', data) {
  const response = await fetch(url, {
    method: 'POST',
    body: data,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
}

document
  .querySelector('.plant-form')
  .addEventListener('submit', plantFormHandler);
