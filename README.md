## esXebox - electronic structure and X-ray experiment sandbox

### Backend
First install the required pyxro package using ```pip install git+https://github.com/hpmartins/pyxro.git```. Then execute ```pip install -r requirements.txt``` to install all other Python 3.7 requirements, and finally ```python manage.py run``` to run the Flask backend server. This will start the API server at http://localhost:5000/.

### Frontend
To install and run:

	cd frontend
	npm install
	npm start

The ```npm install``` command installs all the Javascript nodules required to run the frontend. Everything is listed in the package.json file. The ```npm start``` command starts the frontend server at http://localhost:3000/.
