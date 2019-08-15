var gmail;


function refresh(f) {
  if( (/in/.test(document.readyState)) || (typeof Gmail === undefined) ) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}

var email_count = 0;

var foo = function(){
  // NOTE: Always use the latest version of gmail.js from
  // https://github.com/KartikTalwar/gmail.js
  gmail = new Gmail();
  gmail.observe.on('compose', function(compose, composeType) {
    // compose type can be one of "reply" | "forward" | "compose"
    console.log('Compose object:', compose, 'compose type:', composeType);
    // console.log('email_count', email_count);
            email_count = email_count + 1;
    // setTimeout(compose.close(), 2)
    setTimeout(() => { 
      if (email_count == 1) {
        console.log('composing: email_count', email_count);
        compose.to("foo@gmail.com","Mr. Foo")
        compose.subject("זו היא בדיקה")
        compose.body("שלום רב,<br/>מדובר בהודעה רגילה לחלוטין<br/>שאפשר לכתוב בה מה שרוצים");
        setTimeout(() => {
          gmail.compose.start_compose()
         }, 2000)
      } else {
        console.log('composing: email_count', email_count);
        compose.to("bar@gmail.com","Ms. Bar")
        compose.subject("הודעה מס׳ 2")
        compose.body("זהו מכתב מס 2<br/>יש כאן מלל מסוים");
      }

     }, email_count == 1 ? 1000: 3000)

     setTimeout(() => {
      compose.close()
     }, 5000)

    console.log('Compose object:', compose, 'compose methods:', Object.getOwnPropertyNames(compose));

  });
  gmail.compose.start_compose()

  // you can use an observer to retrieve a compose object

  console.log('Hello,' )
}


refresh(foo);
