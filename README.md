# Profile-Generator
This command-line application will allow for quick and easy generation of profiles with up-to-date information about members of a team in PDF format.

## Usage and instructions
It is time consuming to have to navigate to each team member's Github profile to get up-to-date information. This command-line application generates a pdf which provides the most relevant information of a member.

The user is asked to enter the username of the person-of-interest's github profile, and he/she can also choose his/her favorite color from the list provided. A PDF will be generated in the same folder, with the selected color theme, with the name converted.PDF.

If the github-user has provided location, it will display the location, and upon clicking, it opens the location in google maps.
The link to github account and blog is also made available.

#### Command to Run

`node index.js`

##### Enter the github-Username when prompted with:

`? What is the GitHub username?`

##### Select the color using arrow keys

`? Pick your favourite color: (Use arrow keys)
  green
  blue
  pink
  red
  aqua`

##### Find your PDF in:

- converted.PDF

## Environment
You will need axios, electron-html-to and electron (v 5.0.3) npm packages.
