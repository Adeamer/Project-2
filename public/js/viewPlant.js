/* function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const publicVapidKey =
  'BCq7s7eh54iYM7pWyt-nKnsScRuToV2kuDuozyHcfONJL-CfTxWGbkTQX4U0BA-1X8gLHMeRkSbtkTE_FFCmIhM';

const triggerPush = document.querySelector('.trigger-push');

async function triggerPushNotification() {
  if ('serviceWorker' in navigator) {
    const register = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    await fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    console.error('Service workers are not supported in this browser');
  }
}
 */
/*
const triggerPush = document.querySelector('#trigger-push');
async function triggerPushNotification() {
  console.log('vdsvds');
  alert('button clicked');
}

triggerPush.addEventListener('click', () => {
  triggerPushNotification().catch((error) => console.error(error));
});
*/

const triggerPushNotificationHandler = async (event) => {
  event.preventDefault();
  console.log('vdsvds');
  alert('button clicked');
};

document
<<<<<<< HEAD
  .querySelector('.trigger-push-cls')
  .addEventListener('click', triggerPushNotificationHandler);
=======
  .querySelector('#selected-plant')
  .addEventListener('click', viewPlantHandler);
>>>>>>> 5466b6183cf90ae32c0cd82bfda86622d70b30f8
