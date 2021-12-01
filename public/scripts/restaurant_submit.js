// $(()=> {


//   const submitTime = (event) => {
//     let submitBtnClicked = $(event.target);
//     let estTime = submitBtnClicked.closest(".time-container").find(".estimated-time").val();
//     let estTimeMessage = `Your order is estimated to be ready in ${estTime} minutes. We will notify you again when the order is actually ready! Stay tuned!`
//     //hard coded post request
//     $.post("/login/2", estTimeMessage);
//   };
// });
//   const submitTime = (event) => {
//     let submitBtnClicked = event.target;
//     let estTime = submitBtnClicked.closest(".time-container").find(".estimated-time").val();
//     let estTimeMessage = `Your order is estimated to be ready in ${estTime} minutes. We will notify you again when the order is actually ready! Stay tuned!`

//     //hard coded post request
//     $.post("/login/2", estTimeMessage);
//   }
// });


  // const submitBtns = $(".submit-btn");
  // console.log("submitBtns[0]---->", $(submitBtns[0]));

  // for (let i=0; i < submitBtns.length; i++) {
  //   let button = submitBtns[i];
  //   button.addEventListener("click", function() {
  //     let estTime = $($(button)).closest(".time-container").find(".estimated-time").val();

  //     let estTimeMessage = `Your order is estimated to be ready in ${estTime} minutes. We will notify you again when the order is actually ready! Stay tuned!`

  //     //hard coded post request
  //     $.post("/login/2", estTimeMessage);

  //   })

  // }


  // FOR SINGLE UNQUIE BUTTON
  // $(".submit-btn").on("click", function(e) {

  //   const estTime = $("#estimated-time").val();
  //   console.log(estTime);
  //   const estTimeMessage = `Your order is estimated to be ready in ${estTime} minutes. We will notify you again when the order is actually ready! Stay tuned!`

  //   console.log("estTimeMessage---->",estTimeMessage);

  //   $.post("/login/2", estTimeMessage);

  // })

// })
