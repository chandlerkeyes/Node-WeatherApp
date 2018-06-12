var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      }else {
        reject('Arguements must be numbers');
      }
    }, 1500);
  });
};

asyncAdd(5,'7').then((Result) => {
  console.log("Result: ", Result);
  return asyncAdd(Result, 33);
}).then((Result) => {
  console.log('Should be 45', Result);
}).catch((message) => {
  console.log('Error: ', message);
});

// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     //resolve('It worked!');
//     reject('unable to fulfill promise');
//   }, 2500);
// });
// //then only runs if somePromise was resolved, or fulfilled
// somePromise.then((message) => {
//   console.log('Success: ', message);
// }, (errorMessage) => {
//   console.log('Error: ', errorMessage);
// });
