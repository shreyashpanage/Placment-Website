new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
        labels: ["2018", "2019", "2020", "2021", "2022"],
        datasets: [
            {
                label: "Highest Package (lakh)",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: [20, 18, 22, 17, 26]
            }
        ]
    },
    options: {
        legend: { display: false },
        title: {
            display: true,
            text: 'Highest package from 2018 to 2022'
        }
    }
});

// // Email.send({
// //     Host : "smtp.elasticemail.com",
// //     SecureToken : "7720fefd-5993-400f-adaf-47ed7745aa1a",
// //     To : 'them@website.com',
// //     From : "you@isp.com",
// //     Subject : "This is the subject",
// //     Body : "And this is the body"
// // }).then(
// //   message => alert(message)
// // );

// function sendMail(params){
//     var tempParams ={
//         from_name: document.getElementById("fromName").ariaValueMax,
//         to_name: document.getElementById("toName").ariaValueMax,
//         message: document.getElementById("msg").ariaValueMax,

//     };
//     emailjs.send(service_k6z29ln, template_qdkc3ei, tempParams)
//     .then(function(res){
//         console.log("Sucess",res.status);
//     })
// }


const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_qdkc3ei';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});