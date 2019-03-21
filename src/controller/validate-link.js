const fetch = require('node-fetch');

export const validateLinks = (array) => {
  const linkStatus = array.map(link =>
    new Promise((resolve, reject) => {
      fetch(link.href)
        .then((objFetch) => {
          if (objFetch.status >= 200 && objFetch.status <= 399) {
            link.status = objFetch.status;
            link.statusText = objFetch.statusText;
            resolve(link);
          } else {
            link.status = objFetch.status;
            link.statusText = 'Fail';
            resolve(link);
          }
        }).catch((errorObjFetch) => {          
          link.status = 'Fail';
          link.statusText = 'URL inválida';
          resolve(link);
        });
    }));
  return Promise.all(linkStatus);
};

// validateLinks(input)
//   .then((res) => console.log(res))
//   .catch((res) => console.log(res));
