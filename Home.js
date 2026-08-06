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

    switchToParent();

});

// =======================================================
// jp4235: Open popup for Child
// =======================================================

childProfileButton.addEventListener('click', () => {

    profilePopup.classList.add('show');

    switchToChild();

});

closePopup.addEventListener('click', () => {

    profilePopup.classList.remove('show');

});

// =======================================================
// sr3745: Report Popup
// =======================================================

const reportPopup = document.getElementById('reportPopup');
const reportButton = document.getElementById('reportButton');
const closeReportPopup = document.getElementById('closeReportPopup');
const cancelReport = document.getElementById('cancelReport');
const submitReport = document.getElementById('submitReport');

reportButton.addEventListener('click', () => {
    reportPopup.classList.add('show');
});

closeReportPopup.addEventListener('click', () => {
    reportPopup.classList.remove('show');
});

cancelReport.addEventListener('click', () => {
    reportPopup.classList.remove('show');
});

// Cycle through reasons on click — swap for a real dropdown later
const reasons = ['Inappropriate Language!', 'Harassment', 'Spam', 'Impersonation'];
let reasonIndex = 0;
document.getElementById('reasonSelect').addEventListener('click', () => {
    reasonIndex = (reasonIndex + 1) % reasons.length;
    document.getElementById('reasonLabel').textContent = reasons[reasonIndex];
});

submitReport.addEventListener('click', () => {
    const reason = document.getElementById('reasonLabel').textContent;
    const blocked = document.getElementById('blockUserCheckbox').checked;

    console.log('Report submitted:', { reason, blocked });
    // TODO: send this to your backend, e.g.:
    // fetch('/api/report', { method: 'POST', body: JSON.stringify({ reason, blocked }) })

    // Show the success view instead of closing right away
    document.getElementById('reportFormView').classList.add('hidden');
    document.getElementById('reportSuccessView').classList.remove('hidden');
});

// Close after seeing the success message
document.getElementById('closeSuccessBtn').addEventListener('click', () => {
    reportPopup.classList.remove('show');

    // Reset back to the form view for next time the popup opens
    document.getElementById('reportSuccessView').classList.add('hidden');
    document.getElementById('reportFormView').classList.remove('hidden');gi
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

// =======================================================
// jp4235: Profile Switching Functions
// =======================================================

function switchToParent() {

    currentProfile = "parent";

    selectedAvatar = parentAvatar;

    avatarTitle.textContent = "Select Parent Avatar";

    parentProfileTab.classList.add("active");

    childProfileTab.classList.remove("active");

    // Highlight selected avatar

    avatarChoices.forEach(choice => {

        choice.classList.remove("selected");

        if (choice.src === selectedAvatar) {

            choice.classList.add("selected");

        }

    });

}

function switchToChild() {

    currentProfile = "child";

    selectedAvatar = childAvatar;

    avatarTitle.textContent = "Select Child Avatar";

    childProfileTab.classList.add("active");

    parentProfileTab.classList.remove("active");

    // Highlight selected avatar

    avatarChoices.forEach(choice => {

        choice.classList.remove("selected");

        if (choice.src === selectedAvatar) {

            choice.classList.add("selected");

        }

    });

}


parentProfileTab.addEventListener("click", () => {

    switchToParent();

});



childProfileTab.addEventListener("click", () => {

    switchToChild();

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