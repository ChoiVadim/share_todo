FROM python:3.10-slim-buster

WORKDIR /flask_app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

WORKDIR /flask_app/app

RUN flask db init
RUN flask db migrate
RUN flask db upgrade

WORKDIR /flask_app

CMD [ "python3", "run.py" ]

# docker build --tag todo-app-docker .
# docker save -o todo-app-docker.tar todo-app-docker
# scp todo-app-docker.tar vadim@38.0.101.76:/home/vadim
# docker load -i todo-app-docker.tar
# docker run -d -p 5000:5000 todo-app-docker