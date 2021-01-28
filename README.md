# MyAnimeList Manager

MyAnimeList Manager is a React/Express web application designed to augment the experience on managing your Anime Lists from the MyAnimeList website, removing all the extra fluff from the website and giving you a minimalist interface for updating your lists and search for entries. In addition, the schedule tab shows you all the airing shows on your list, allowing you to keep track of which shows you need to watch and when.

mal-manager-client is the frontend of this web application. To view and setup the backend, please visit https://github.com/MarcusChok110/mal-manager-server.

## Live Demo

You can view a live demo of the client here: https://mal-manager-client.herokuapp.com/
- *You may have to disable settings that prevent cross-site tracking or cookies to ensure it works properly*

## Pages

### Home

![home](https://i.imgur.com/WflLpMy.png)

### Anime List

![animelist](https://i.imgur.com/cAGjlyh.png)

### Search / Search Results

![search](https://i.imgur.com/x9uKLi0.png)
![searchresults](https://i.imgur.com/Tkhh1oS.png)

### Schedule

![schedule](https://i.imgur.com/vcCIfSI.png)

## Local Installation

Firstly, ensure that you have Node/NPM installed on your system. Then:

1. Download the repository
2. cd to the directory and `npm install` the dependencies
3. Ensure you have the following dependencies installed:

```
    "base64url"
    "bootstrap"
    "randomstring"
    "react"
    "react-dom"
    "react-router-dom"
    "react-scripts"
    "web-vitals"
```

4. Ensure you have the [server](https://github.com/MarcusChok110/mal-manager-server) up and running
5. `npm start` to view the client on http://localhost:3000 in the browser

## Todo

- Automatic logout when cookie expires
- Option to view schedule on client timezone
- Pagination for search results page
- Adjust text sizes for mobile devices
- Adjust size of cards to ensure they line up
