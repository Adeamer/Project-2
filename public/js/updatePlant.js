const plantFormHandler = async (event) => {
  event.preventDefault();

  const id = document.getElementById('add-submit').getAttribute('data-plant');
  console.log('***1111 plantid', id);

  const category_id = document
    .getElementById('add-submit')
    .getAttribute('data-category');
  console.log('***1111 categoryid', category_id);

  alert('PLant id is ' + id);
  console.log('&&&&&& id ' + id);

  // Collect values from the login form
  const name = document.querySelector('#plant-name').value.trim();
  const botanical_name = document
    .querySelector('#plant-botanical-name')
    .value.trim();
  const sun_exposure = document
    .querySelector('#plant-sun-exposure')
    .value.trim();
  const mature_size = document.querySelector('#plant-mature-size').value.trim();

  const soil_type = document.querySelector('#plant-soil-type').value.trim();

  const check_date_planted = document
    .querySelector('#plant-date-planted')
    .value.trim();

  if (check_date_planted) {
    var date_planted = check_date_planted;
  } else {
    var date_planted = document
      .getElementById('plant-date-planted')
      .getAttribute('data-date-planted');
  }

  // selected location
  const check_location_id = document.getElementById('location-selection').value;

  if (check_location_id) {
    var location_id = check_location_id;
  } else {
    var location_id = document
      .getElementById('location-selection')
      .getAttribute('data-location');
  }

  const watering_freq_num = document.querySelector('#plant-watering-num').value;

  console.log('******** Planned Date', date_planted);
  const check_watering_freq_interval = document.getElementById(
    'selection-watering-frequency'
  ).value;

  if (check_watering_freq_interval) {
    var watering_freq_interval = check_watering_freq_interval;
  } else {
    var watering_freq_interval = document
      .getElementById('selection-watering-frequency')
      .getAttribute('data-water-frequency');
  }

  const check_last_watering_date_unformatted = document
    .querySelector('#plant-last-watering-date')
    .value.trim();

  if (check_last_watering_date_unformatted) {
    const last_watering_date = moment(check_last_watering_date_unformatted);
    var next_watering_date = moment(last_watering_date).add(
      watering_freq_num,
      watering_freq_interval
    );
  } else {
    var next_watering_date = document
      .getElementById('next-water')
      .getAttribute('data-next-water');
    console.log('Next watering date is ' + next_watering_date);
  }

  const fetchURL = '/api/plant/update/' + id;
  const responseURL = '/api/categories/' + category_id + '/plants';
  if (name) {
    const response = await fetch(fetchURL, {
      method: 'PATCH',
      body: JSON.stringify({
        name,
        botanical_name,
        sun_exposure,
        mature_size,
        soil_type,
        date_planted,
        location_id,
        watering_freq_num,
        next_watering_date,
        watering_freq_interval,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(responseURL);
    } else {
      console.log('Something went wrong. Try updating blog post later');
    }
  }
};

//push notification
//commenting this code for push notifications
/* function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
} */

/* const publicVapidKey =
  'BCq7s7eh54iYM7pWyt-nKnsScRuToV2kuDuozyHcfONJL-CfTxWGbkTQX4U0BA-1X8gLHMeRkSbtkTE_FFCmIhM';

console.log('Registering service worker...'); */

//const triggerPush = document.querySelector('.trigger-push');
/* async function triggerPushNotification() {
  console.log('puch notification clicked');

  if ('serviceWorker' in navigator) {
    console.log('I am inside if service worker');
    const register = await navigator.serviceWorker.register(
      '../../../js/sw.js',
      {
        scope: '../../../js/',
      }
    );
    console.log('register' + register);
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log(subscription);

    await fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    //console.error('Service workers are not supported in this browser');
    if (Notification.permission === 'denied') {
      console.log('Permission for Notifications was denied');
      //subscribeButton.disabled = true;
    } else {
      console.log('Unable to subscribe to push.', error);
      // subscribeButton.disabled = false;
    }
  }
} */

document
  .querySelector('.plant-form')
  .addEventListener('submit', plantFormHandler);

/* document
  .querySelector('#trigger-push')
  .addEventListener('click', triggerPushNotification); */
