// This page currently only has the top banner (Report, Block, Profile).


document.getElementById('reportButton').addEventListener('click', () => {
});

document.getElementById('blockButton').addEventListener('click', () => {
});

// =======================================================
// jp4235: Profile Popup
// =======================================================

const profilePopup = document.getElementById('profilePopup');

const profileButton = document.getElementById('profileButton');

const closePopup = document.getElementById('closePopup');

profileButton.addEventListener('click', () => {

    profilePopup.classList.add('show');

});

closePopup.addEventListener('click', () => {

    profilePopup.classList.remove('show');

});