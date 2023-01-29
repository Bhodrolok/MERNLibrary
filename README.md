# MERN E-Library
Simple Library Management System developed as a MERN web application.

Capstone project for SENG 513 Fall 2022.

View the live deployment of the app at Vercel [here](https://mern-library-nu.vercel.app/). 
The backend is deployed at Render [here](https://mlibback.onrender.com/).

# Usage

- <b>Docker</b>
	- Ensure that Docker is installed locally. https://www.docker.com/
	- Make a new folder at a path of your liking.
	- In the newly created folder, pull the following container images from DockerHub by running in a terminal shell:
		1. `docker pull bhodrolokd/mernlibrary:4.03`
		2. `docker pull bhodrolokd/mernlibrary:mernlibfront-4.03`
	 - This will respectively download the backend and frontend Docker container images from the [repository](https://hub.docker.com/r/bhodrolokd/mernlibrary/) locally.
	 - To confirm the pull, run `docker images` and you should see something like: ![image](https://user-images.githubusercontent.com/51386657/215356560-af2eaef0-97d5-4983-ae00-2eb82444f83f.png)
	 - To run the images in two separate containers, run the following commands one after the other:
	 	1. `docker run -d  -p 4000:4000 --name back1 <backend_image_id>`
		2. `docker run -d  -p 3000:3000 --name back1 <frontend_image_id>` 
	 - The `-d` flag ensures that the containers run in the background without consuming your current terminal shell!
	 - Open a web browser and go to `http://localhost:3000`.


-  <b>Manual</b>
	- Ensure that Node.js is installed locally. https://nodejs.org/en/download/
	- Open a terminal in the `/root` folder.
	- Run `npm install`.
	- Run `npm start`.
	- If your system already has a preferred default web browser, it should open and go to `http://localhost:3000` .
	- If not, you can visit it from any web browser you want!
	- Please be aware that building and running the application through this method will take additional time for the frontend to render compared to the other method.

# Contributors
- Ranadip Chatterjee (Backend)
- Md Azharul Islam Fahim (Backend)
- Arjun Varma Kakarlapudi (Frontend)
- Kamrul Ahsan Noor (Frontend)
