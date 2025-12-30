const nodemailer = require('nodemailer');
const csv = require('csvtojson');

async function getContacts() {
    return await csv().fromFile('./college.csv');
}

async function sendEmail(college) {
    console.log('Sending to...', college['URL']);

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {user: "wenifly123@gmail.com", pass: "9610138ws"}
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Gi Suen" <wenifly123@gmail.com>', // sender address
        to: `${college['URL']}`, // list of receivers
        subject: 'Can I have a shirt?',
        text: `Hello, My name is Salome. I always want to go to the ${college['School Name']} and experience the ${college['City']} life! I was wondering if you guys are able to send in a pamphlet with some cool spirit wear! I know it may sound like an odd request, but I really want to show my school pride. Thank you so much for listening to my request. If you are able to send something, my shirt size is Medium, but I will take whatever you have! 
        My delivery address is :\n

        Thank you again,
        Salome Ho`,
    });

    console.log('Message sent: %s', college['School Name']);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

const pause = () => {
    console.log('Pausing for 5 seconds');
    return new Promise(resolve => setTimeout(resolve, 5000));
}

async function gooo() {
    const contacts = await getContacts();
    const emails = contacts.slice(751,801); //START on 10/27/2019
    for (let i=0; i < emails.length; i++) {
        await pause();
        await sendEmail(emails[i]);
    }
}


gooo();
