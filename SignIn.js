function togglePasswordVisibility1() {
    var passwordInput = document.getElementById("Pass");
    var showPassCheckbox = document.getElementById("showPassword");
  
    if (showPassCheckbox.checked) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }

document.getElementById('bttn').addEventListener('click', e =>{
    e.preventDefault()

    const user_email  = document.getElementById('Email').value
    const user_password = document.getElementById('Pass').value

    console.log(user_email);
    console.log(user_password);

    window.localStorage.setItem("mydata",user_email)

    const url = `http://localhost:8082/users`
    const xhr = new XMLHttpRequest()
    xhr.open('GET',url)
    xhr.setRequestHeader('Content-Type','application/json')
    xhr.setRequestHeader('Access-Control-Allow-origin', '*')

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
           res=JSON.parse(xhr.responseText)
           console.log(res);
           for (let i = 0; i < res.length; i++)
           {
                if (res[i].email==user_email && res[i].password==user_password)
                {
                //    document.getElementById('message').innerHTML="<h1>Login Sucessfully</h1>";
                window.open("./index.html")
                   
                }
                else
                {
                //    document.getElementById('message2').innerHTML="Invaild username and password"
                    alert("User Not Found!")
                }

           
           }

        }
    }

    xhr.send()
})