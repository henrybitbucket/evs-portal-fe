const loadGoogleApi = (cb) => {

    try {
        window.CLIENT_ID = '461356873997-2t0ef0kfhrojbtau64sg30fg9ui7llpp.apps.googleusercontent.com';
        window.API_KEY = 'AIzaSyAVgHn9ZrE9-88R4T95BKEXejje9S2YYr4';
    } catch (err) {

    }

    // Array of API discovery doc URLs for APIs used by the quickstart
    window.DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    window.SCOPES = "email profile openid ";


    window.authorizeButton = document.getElementById('authorize_button');
    window.signoutButton = document.getElementById('signout_button');

    /**
    *  On load, called to load the auth2 library and API client library.
    */
    window.handleClientLoad = function handleClientLoad() {

        gapi.load('client:auth2', window.initClient);

        setTimeout(() => {

            try {

                let isSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();

                let userInfo = {}
                if (isSignedIn) {
                    let profile = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
                    let access_token = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
                    userInfo = {
                        userId: profile.getId(),
                        name: profile.getName(),
                        firstName: profile.getGivenName(),
                        lastName: profile.getFamilyName(),
                        email: profile.getEmail(),
                        picture: profile.getImageUrl(),
                        accessToken: access_token,
                    }
                }
                cb && cb(isSignedIn, userInfo);
            } catch(err) {}
        }, 1000)
    }

    /**
    *  Initializes the API client library and sets up sign-in state
    *  listeners.
    */
    window.initClient = function initClient() {
        window.gapi.client.init({
            apiKey: window.API_KEY,
            clientId: window.CLIENT_ID,
            discoveryDocs: window.DISCOVERY_DOCS,
            scope: window.SCOPES
        }).then(function () {
            // Listen for sign-in state changes.
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(window.updateSigninStatus);

            // Handle the initial sign-in state.
            window.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
            try { window.authorizeButton.onclick = window.handleAuthClick} catch(error) {};
            try { window.signoutButton.onclick = window.handleSignoutClick} catch(error) {};
        }).catch(function() {
            try {
                window.gapi && window.gapi.auth2.getAuthInstance().signOut();
            } catch (err) {
            }
        });
    }

    /**
    *  Called when the signed in status changes, to update the UI
    *  appropriately. After a sign-in, the API is called.
    */
    window.updateSigninStatus = function updateSigninStatus(isSignedIn) {

        window.isSignedIn = isSignedIn;
        if (window.isSignedIn) {
            // Call abc
        } else {
            //window.authorizeButton.style.display = 'block';
            //window.signoutButton.style.display = 'none';
        }
    }

    /**
    *  Sign in the user upon button click.
    */
    window.handleAuthClick = function handleAuthClick() {
        window.gapi.auth2.getAuthInstance().signIn();
    }

    /**
    *  Sign out the user upon button click.
    */
    window.handleSignoutClick =function handleSignoutClick() {
        window.gapi.auth2.getAuthInstance().signOut();
    }

    /**
    * Append a pre element to the body containing the given message
    * as its text node. Used to display the results of the API call.
    *
    * @param {string} message Text to be placed in pre element.
    */
    window.appendPre = function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
    }

    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    script.defer = true;
    script.onload = function() {window.handleClientLoad()};
    //script.onreadystatechange = function () {if (this.readyState === 'complete') window.handleClientLoad()};;
    document.body.appendChild(script);
}

export {
    loadGoogleApi,
}