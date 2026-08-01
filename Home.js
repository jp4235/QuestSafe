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

// =======================================================
// jp4235: Avatar Selection + Saving
// =======================================================

const avatarChoices = document.querySelectorAll('.avatar-choice');

const profileAvatar = document.getElementById('profileAvatar');

const saveAvatarButton = document.getElementById('saveAvatar');

// jp4235: Load saved avatar if one exists
let selectedAvatar = localStorage.getItem("parentAvatar") 
    || "avatars/avatar1.png";

// Select avatar
avatarChoices.forEach(avatar => {

    avatar.addEventListener('click', () => {


        // Remove previous selection

        avatarChoices.forEach(choice => {

            choice.classList.remove('selected');

        });


        // Highlight chosen avatar

        avatar.classList.add('selected');


        // Store chosen image path

        selectedAvatar = avatar.src;


    });

});


// Save avatar

saveAvatarButton.addEventListener('click', () => {


    // jp4235: Save avatar choice in browser storage

    localStorage.setItem(
        "parentAvatar",
        selectedAvatar
    );


    // Change header avatar

    profileAvatar.src = selectedAvatar;


    // Close popup

    profilePopup.classList.remove('show');


});

// jp4235: Load saved avatar when page opens

profileAvatar.src = selectedAvatar;