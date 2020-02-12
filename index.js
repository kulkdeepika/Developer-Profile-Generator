
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require('axios');

const convertFactory = require('electron-html-to');
 
const genHTML = require('./generateHTML.js');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser(){
  return inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "What is the GitHub username?"
    },
    {
      type: "list",
      name: "favColor",
      message: "Pick your favourite color:",
      choices: [
        'green',
        'blue',
        'pink',
        'red',
        'aqua',
      ]
    }
  ]);
}

promptUser()
  .then(function(answers) {

  const url = `https://api.github.com/users/${answers.username}`;

  axios.get(url)
    .then((response) => {
      
      response.data.color = answers.favColor;// add the selected color as a property in the response object

    axios.get(response.data.repos_url)
      .then((res) => {
        
        let starCount = 0;
        for(let i=0; i<res.data.length; i++) // find out the total number of github stars
        {
            starCount += res.data[i].stargazers_count;
        }
                    
          response.data.NoOfStars = starCount; // add the total stars as a property in response object

          //check if location is provided
          if(response.data.location === null){
            response.data.location = "";
            response.data.locIcon = "";
          }
          else{
            response.data.locIcon = `<i class="fas fa-location-arrow"></i>` ;
          }
          // check if company is provided       
          if(response.data.company === null){
            response.data.company = ""
          }
          else{
            response.data.company = `Currently ${response.data.company}`;
          }
          //check if bio is provided
          if(response.data.bio === null){
            response.data.bio = ""
          }
                    
          //generate the html with the required data
          const generatedHtml = genHTML.generateHTML(response.data);

          //the code below converts the html to PDF
          var conversion = convertFactory({
            converterPath: convertFactory.converters.PDF
          });
  
          conversion({ html: generatedHtml }, function(err, result) {
            if (err) {
                return console.error(err);
            }

           console.log(result.logs);
            result.stream.pipe(fs.createWriteStream('./converted.PDF'));
            conversion.kill(); 
      });

      //this writes to a html file; not necessary for the functionality
      return writeFileAsync("index.html", generatedHtml);
    })
      .catch(function(err) {
        console.log(err);
    });

  })

  .catch(function(err) {
    //console.log(err);
    console.log(err.response.status);
    console.log("We have a problem! Please check the github username.");
});
  

})
 .then(function() {
   console.log("Success");
})
 .catch(function(err) {
    console.log(err);
    console.log(err.response.status);
});
