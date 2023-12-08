function sendMail() {
    var params = {
        name: document.getElementById("user-name").value,
        email: document.getElementById("user-mail").value,
        phone: document.getElementById("user-phone").value,
        message: document.getElementById("user-message").value,

    };
    const serviceID = "service_ziftfta";
    const templateID = "template_0qmzm63";

    emailjs.send(serviceID, templateID, params)
        .then(
            res => {
                document.getElementById("user-name").value = "";
                document.getElementById("user-mail").value = "";
                document.getElementById("user-phone").value = "";
                document.getElementById("user-message").value = "";
                console.log(res);
                alert("Message sent successfully")
            }
        )
        .catch((err) => console.log(err));
}

