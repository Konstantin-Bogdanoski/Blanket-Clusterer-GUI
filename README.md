# Blanket-Clusterer-GUI
 
This repository contains the Python Flask + ReactJS web application, which will allow users
to easily use Blanket Clusterer python module. 

## Setup
To application setup is pretty straight forward.
### Backend (Python Flask)
There are 2 steps:

####1. Install the requirements using `pip`, as shown:
```shell script
pip3 install -r requirements.txt
```
This will install the necessary requirements which the Flask project needs to function properly.

Currently there are a couple of necessary module. These are:
- Flask - needed for the application to run correctly
- flask-cors - needed for the API calls to function correctly
- Werkzeug - needed for web application workflow
- setuptools - needed for managing packages

####2. Start the application using `flask run` as shown
```shell script
python flask run
```
This will start the Python Flask application and your backend is ready to go!

### Frontend (ReactJS)
There are also 2 steps:

####1. Install the required dependencies using `npm`, as shown:
````shell script
npm install
````
This will install all the necessary `javascript` libraries which are used by the GUI application.

####2. Start the application using `npm`
````shell script
npm start
```` 
This will start the application, and you should be able to access the GUI on ``http://localhost:3000`` and that's it.

We provide the module in this form, so that users can modify it as they like.

## Compatibility
The backend services are compatible with python version *3.7* and flask version *1.1.2*.

The frontend services are compatible with node version *14.13.0* and npm version *6.14.8*.

***

#### Faculty of Computer Science and Engineering, Skopje, North Macedonia, 2020

![ФИНКИ лого](https://finki.ukim.mk/sites/default/files/logo_10.png)