function togglePasswordVisibility() {
  var passwordInput = document.getElementById("pass");
  var showPassCheckbox = document.getElementById("showPass");

  if (showPassCheckbox.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}

const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});

document.getElementById('btn').addEventListener('click', e =>{
    e.preventDefault()

    const user_name = document.getElementById('name').value
    const user_email  = document.getElementById('email').value
    const user_password = document.getElementById('pass').value

    const user = {
        name: user_name,
        email:user_email,
        password:user_password
    }

    window.localStorage.setItem("mydata",user_email)


    const url = `http://localhost:8082/users`
    const xhr = new XMLHttpRequest()
    xhr.open('POST',url)
    xhr.setRequestHeader('Content-Type','application/json')
    xhr.setRequestHeader('Access-Control-Allow-origin', '*')

    
    xhr.onreadystatechange = () =>
    {
        if(xhr.status==200 && xhr.readyState == 4)
        {
            console.log(user)
            console.log(xhr.responseText)
            window.open("./index.html")
            if (!user_name|| !user_email || !user_password) {
              alert('Please fill in all the required fields.');
              return;
          }
        }
    }
    xhr.send(JSON.stringify(user))
})