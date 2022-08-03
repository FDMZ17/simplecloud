FROM debian:buster

RUN apt update \
    && apt upgrade -y \
    && apt -y install curl software-properties-common locales git \
    && useradd -d /home/simplecloud -m simplecloud \
    && apt-get update

RUN apt-get update && \
    apt-get -y install sudo

    # NodeJS
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && apt -y install nodejs \
    && apt -y install ffmpeg \
    && apt -y install make \
    && apt -y install build-essential \
    && apt -y install wget \ 
    && apt -y install curl
    
RUN apt-get update && \
    apt-get install --yes vim nano
    
# Python 2 & 3
RUN apt -y install python3 python3-pip

USER simplecloud
ENV  USER simplecloud
ENV  HOME /home/simplecloud

WORKDIR /home/simplecloud

COPY ./docker_run.sh /docker_run.sh

CMD ["/bin/bash", "/docker_run.sh"]
