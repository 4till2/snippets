import axios from 'axios'
/* eslint-disable no-undef */


  /* SNIPPITS */  
  /*--------------------------------------------------------------- */
  let getAllSnippets = async () => {
    try {
      const data = await new Promise(function (resolve, reject) {
        resolve(axios.get('/api/getSnippets'));
      });
      return (data);
    }
    catch (err) {
      return (err);
    }
  }
  // our put method that uses our backend api
  // to create new query into our data base
  let addSnippet = async (snip) => {
    try {
      const response = await new Promise (function (resolve, reject) {
        resolve(axios.post('/api/putSnippet', {
          id: snip.id,
          title: snip.title,
          description: snip.description,
          tags: snip.tags,
          jscode: snip.jscode,
          csscode: snip.csscode,
          placement: snip.placement,
          author: snip.author 
      }))})
      console.log(response)
      return(response)
    }
    catch(err){
      console.log(err.response)
      return(err)
    }
  };

      // update method that uses our backend api
    // to overwrite existing data base information
   let updateSnippet = (snip, idToUpdate) => {
      axios.post('/api/updateSnippet', {
          objid: snip.objid,
          title: snip.title,
          description: snip.description,
          tags: snip.tags,
          jscode: snip.jscode,
          csscode: snip.csscode,
          placement: snip.placement,
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
    axios.delete('/api/deleteSnippet', {
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
  /*--------------------------------------------------------------- */
  /* END SNIPPETS */

  
  /* TAGS    
  /*--------------------------------------------------------------- */
  let getAllTags = async () => {
    try {
      const data = await new Promise(function (resolve, reject) {
        resolve(axios.get('/api/getTags'));
      });
      return (data.data);
    }
    catch (err) {
      return (err);
    }
  }
  let addTag = async (tag) => {
    try {
      const response = await new Promise (function (resolve, reject) {
        resolve(axios.post('/api/putTag', {
          tag: tag 
      }))})
      console.log(response)
      return(response)
    }
    catch(err){
      console.log(err.response)
      return(err)
    }
  };

  let deleteTag = (id) => {
    axios.delete('/api/deleteTag', {
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
  /*--------------------------------------------------------------- */
  /* END TAGS */

  let addUser = async (user) => {
    try {
      const response = await new Promise (function (resolve, reject) {
        resolve(axios.post('/api/putUser', {
          name: user.name,
          email: user.email,
          password: user.password
      }))})
      console.log(response)
      return(response)
    }
    catch(err){
      console.log(err.response)
      return(err)
    }
  };

  let getUser = async (user) => {
    try {
      const data = await new Promise(function (resolve, reject) {
        resolve(axios.post('/api/getUser',{
          email: user.email,
          password: user.password
        }));
      });
      return (data);
    }
    catch (err) {
      return (err);
    }
  }

  let getUserPermissions = async (userEmail) => {
    try {
      const data = await new Promise(function (resolve, reject) {
        resolve(axios.post('/api/getUserPermissions',{
          email: userEmail,
        }));
      });
      return (data.data.data);
    }
    catch (err) {
      return (err);
    }
  }
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
  
  const Client = {getAllSnippets, addSnippet, updateSnippet, deleteSnippet, getAllTags, deleteTag, addTag, getUser, addUser, getUserPermissions };
  export default Client;
  