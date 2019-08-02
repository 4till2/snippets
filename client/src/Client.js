import axios from 'axios'
/* eslint-disable no-undef */


  let getAllData = () => {
    return new Promise(function(resolve, reject){
    resolve(axios.get('/api/getData'))
  })
    .then(data => {
        return(data)
    })
    .catch(err => {
      return(err)
    })
  }
  // our put method that uses our backend api
  // to create new query into our data base
  let addSnippet = (snip) => {
    axios.post('/api/putData', {
        id: snip.id,
        title: snip.title,
        description: snip.description,
        tags: snip.tags,
        jscode: snip.jscode,
        csscode: snip.csscode,
        placement: snip.placement,
        date: snip.date,
        author: snip.author 
    })
    .then(
      (response => {
        console.log(response)
      })
    )
    .catch(error => {
      console.log(error.response)
    })
  };

      // update method that uses our backend api
    // to overwrite existing data base information
   let updateSnippet = (snip, idToUpdate) => {
      axios.post('/api/updateData', {
          objid: snip.objid,
          title: snip.title,
          description: snip.description,
          tags: snip.tags,
          jscode: snip.jscode,
          csscode: snip.csscode,
          placement: snip.placement,
          date: snip.date,
          author: snip.author
      })
      .then(
        (response => {
          console.log(response)
        })
      )
      .catch(error => {
        console.log(error.response)
      })
  };

  // delete method that uses our backend api
  // to remove existing database information
  let deleteSnippet = (id) => {
    axios.delete('/api/deleteData', {
        data: {
            id: id,
        },
    })
    .then(
    (response => {
        console.log(response)
    })
    )
    .catch(error => {
        console.log(error.response)
    });
  };

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
  
  function parseJSON(response) {
    return response.json();
  }
  
  const Client = {getAllData, addSnippet, updateSnippet, deleteSnippet };
  export default Client;
  