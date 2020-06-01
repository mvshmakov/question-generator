# Server of Question Generator

## Running in the virtualenv:

##### 1) Install `virtualenv`:

-   `~ python3 -m pip install virtualenv`

##### 2) Create virtual environment:

-   `~ python3 -m venv env`

##### 3) Activate virtual environment:

-   `~ source env/bin/activate`

##### 4) Install dependencies:

-   `~ pip3 install --upgrade pip` (if needed)
-   `~ pip3 install -r requirements.txt`

##### 5) Running the app in development mode (with "watch mode"):

-   `~ FLASK_APP=app.py FLASK_ENV=development python -m flask run`

##### 6) In order to exit from venv:

-   `~ deactivate`
