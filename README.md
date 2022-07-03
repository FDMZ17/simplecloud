![License](https://img.shields.io/github/license/FDMZ17/simplecloud.svg?style=for-the-badge) ![Repo Size](https://img.shields.io/github/languages/code-size/FDMZ17/simplecloud.svg?style=for-the-badge) ![TOP_LANGUAGE](https://img.shields.io/github/languages/top/FDMZ17/simplecloud.svg?style=for-the-badge) ![FORKS](https://img.shields.io/github/forks/FDMZ17/simplecloud.svg?style=for-the-badge&social) ![Stars](https://img.shields.io/github/stars/FDMZ17/simplecloud.svg?style=for-the-badge)
    
# SimpleCloud

## Table of Contents

- [Description](#description)
- [Screenshots](#screenshots)
- [Built With](#built-with)
- [Installation](#installation)
- [License](#license)
- [Contacts](#contacts)

## Description

SimpleCloud is free and open-source File upload server software written in Javascript/Node.js 

## Screenshots

![Example Screenshot](https://raw.githubusercontent.com/FDMZ17/simplecloud/main/images/preview.png) 

## Built With

<a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a><a href="https://nodejs.org/en/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" height="40px" width="40px" /></a>

### Installation

This guide is only for debian-based distributions of GNU/Linux.

This is fairly easy to install, first install NodeJS 16 via the following commands [run as root]:

```sh
apt-get install curl git nginx software-properties-common 
curl -sL https://deb.nodesource.com/setup_16.x | bash - 
```

```sh
git clone https://github.com/FDMZ17/simplecloud
npm install
npm start
```

Now do the following to configure nginx.
```sh
systemctl start nginx  
certbot certonly --nginx -d your.domain.com
cd /etc/nginx/conf.d
touch simplecloud.conf  
nano simplecloud.conf
``` 

Now paste the following:   
```nginx
server {
    listen 80;
    server_name <domain>;
    return 301 https://$server_name$request_uri;
}
server {
    listen 443 ssl http2;    
    server_name <domain>;
    ssl_certificate /etc/letsencrypt/live/<domain>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<domain>/privkey.pem;
    ssl_session_cache shared:SSL:10m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384";
    ssl_prefer_server_ciphers on;

    location / {
      proxy_pass http://localhost:<port>/;
      proxy_buffering off;
      proxy_set_header X-Real-IP $remote_addr;
  }
}
```
Make sure to replace `<domain>` with the domain and `<port>` with the port.

Now run `systemctl restart nginx` and you should be good to go.

## License

<a href="https://choosealicense.com/licenses/mit/"><img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg" height=40 />MIT License</a>

## Contacts

[Email](mailto:developer@fdmz17.eu.org)
