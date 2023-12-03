document.addEventListener("DOMContentLoaded", function(){
    //Để lấy hồ sơ thông tin người dùng, hãy sử dụng các thuộc tính của một Người dùng phiên bản. Ví dụ:
    //const user = auth.currentUser;

    // listen for auth status changes
    auth.onAuthStateChanged(user => {
        if (user) {                           // Người dùng đã đăng nhập, xem tài liệu để biết danh sách các thuộc tính có sẵn
                                              // https://firebase.google.com/docs/reference/js/firebase.User
            console.log("user logged in");
            console.log(user);
            setupUI(user);
        } else {
            console.log("user logged out");
            setupUI();
        }
        // if (user !== null) {
        
        //     // The user object has basic properties such as display name, email, etc.
        //     // const displayName = user.displayName;
        //      //const email = user.email;
        //     // const photoURL = user.photoURL;
        //     // const emailVerified = user.emailVerified;
          
        //     // The user's ID, unique to the Firebase project. Do NOT use
        //     // this value to authenticate with your backend server, if
        //     // you have one. Use User.getIdToken() instead.
        //     //const uid = user.uid;
        //     user.providerData.forEach((profile) => {
        //         console.log("Sign-in provider: " + profile.user.providerId);
        //         console.log("  Provider-specific UID: " + profile.user.uid);
        //         console.log("  Name: " + profile.user.displayName);
        //         console.log("  Email: " + profile.user.email);
        //       });
        //   }
    });

    // login
    const loginForm = document.querySelector('#login-form');                // Truy vấn vào database có id '#login-form' lấy data gán cho biến loginForm
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();                                                 // get user info mặt định trước đó
        const email = loginForm['input-email'].value;                       // gán giá trị ô 'input-email' vào biến email
        const password = loginForm['input-password'].value;                 // gán giá trị ô 'input-password' vào biến password
        auth.signInWithEmailAndPassword(email, password).then((cred) => {   // log the user in
            loginForm.reset();                                              // close the login modal & reset form
            console.log(email);
            
        })
        .catch((error) =>{
            const errorCode = error.code;
            const errorMessage = error.message;
            document.getElementById("error-message").innerHTML = errorMessage;
            console.log(errorMessage);
        });
    });

    // logout
    const logout = document.querySelector('#logout-link');
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut();
    });
    
});