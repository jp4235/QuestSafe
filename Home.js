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

// jp4235: Child profile button

const childProfileButton =
document.getElementById("childProfileButton");

const closePopup = document.getElementById('closePopup');

profileButton.addEventListener('click', () => {

    profilePopup.classList.add('show');

    currentProfile = "parent";

    selectedAvatar = parentAvatar;

    avatarTitle.textContent = "Select Parent Avatar";

    parentProfileTab.classList.add("active");
    childProfileTab.classList.remove("active");

    // Highlight the parent's current avatar
    avatarChoices.forEach(choice => {

        choice.classList.remove("selected");

        if (choice.src === selectedAvatar) {

            choice.classList.add("selected");

        }

    });

});

// =======================================================
// jp4235: Open popup for Child
// =======================================================

childProfileButton.addEventListener('click', () => {

    profilePopup.classList.add('show');

    currentProfile = "child";

    selectedAvatar = childAvatar;

    avatarTitle.textContent = "Select Child Avatar";

    childProfileTab.classList.add("active");
    parentProfileTab.classList.remove("active");

    // Highlight the child's current avatar
    avatarChoices.forEach(choice => {

        choice.classList.remove("selected");

        if (choice.src === selectedAvatar) {

            choice.classList.add("selected");

        }

    });

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

// jp4235: Store separate avatars

let currentProfile = "parent";


let selectedAvatar = 
    localStorage.getItem("parentAvatar")
    || "avatars/avatar1.png";


let parentAvatar =
    localStorage.getItem("parentAvatar")
    || "avatars/avatar1.png";


let childAvatar =
    localStorage.getItem("childAvatar")
    || "avatars/avatar2.png";

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

// =======================================================
// NEW: Switch Parent / Child Profiles
// =======================================================


const parentProfileTab =
document.getElementById("parentProfileTab");


const childProfileTab =
document.getElementById("childProfileTab");


const avatarTitle =
document.getElementById("avatarTitle");



parentProfileTab.addEventListener("click",()=>{


    currentProfile="parent";

    selectedAvatar=parentAvatar;


    avatarTitle.textContent =
    "Select Parent Avatar";


    parentProfileTab.classList.add("active");

    childProfileTab.classList.remove("active");


});



childProfileTab.addEventListener("click",()=>{


    currentProfile="child";

    selectedAvatar=childAvatar;


    avatarTitle.textContent =
    "Select Child Avatar";


    childProfileTab.classList.add("active");

    parentProfileTab.classList.remove("active");


});


// Save avatar

saveAvatarButton.addEventListener('click', () => {


    // jp4235: Save avatar choice in browser storage

if(currentProfile === "parent"){

    parentAvatar = selectedAvatar;

    localStorage.setItem(
        "parentAvatar",
        parentAvatar
    );

}
else{

    childAvatar = selectedAvatar;

    localStorage.setItem(
        "childAvatar",
        childAvatar
    );

}

    // Update the correct header avatar

    if(currentProfile === "parent"){

        profileAvatar.src = parentAvatar;

    }
    else{

        childProfileAvatar.src = childAvatar;

    }

// Close popup

profilePopup.classList.remove('show');


});

// =======================================================
// jp4235: Load saved avatars when page opens
// =======================================================

profileAvatar.src = parentAvatar;

const childProfileAvatar =
document.getElementById("childProfileAvatar");

childProfileAvatar.src = childAvatar;