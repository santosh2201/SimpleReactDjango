## Technologies used:
* HTML
* CSS
* Javascript
* Python
* Django
* Reactjs
* Webpack
* Bootstrap
* Gunicorn (WSGI Server)
* Nginx server

#### Clone project:
```
git clone git@github.uc.edu:nanchasr/SimpleReactDjango.git
```
or

```
git clone https://github.uc.edu/nanchasr/SimpleReactDjango.git
```
#### Run following commands to setup virtual environment to run python
```
sudo apt-get install python
sudo apt-get install python-pip
pip install virtualenvwrapper.sh
source /usr/local/bin/virtualenvwrapper.sh
```

#### To install Python and Django dependency libraries
```
pip install -r requirements.txt;
```

#### To install Gunicorn WSGI Server
```
pip install gunicorn
```

#### To install nginx
```
sudo apt-get install nginx
```
#### To add self-signed certificate for https
```
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/cert.key -out /etc/nginx/cert.crt;
```
* reference https://thepracticalsysadmin.com/nginx-self-signed-cert/

#### Configure Nginx
```
server { 
	listen 80; 
	return 301 https://$host$request_uri; 
}


server {
    # the port your site will be served on
    listen *:443;
    ssl                  on;
    ssl_certificate      /etc/ssl/certs/myssl.crt;
    ssl_certificate_key  /etc/ssl/private/myssl.key;
    ssl_session_timeout 5m; 
    ssl_protocols SSLv3 TLSv1; 
    ssl_ciphers ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv3:+EXP; 
    ssl_prefer_server_ciphers on;
    # the domain name it will serve for
    server_name .shelfari.local 18.218.219.88;   # substitute by your FQDN and machine's IP address
    charset     utf-8;

    #Max upload size
    client_max_body_size 75M;   # adjust to taste

    # Django media
    # location /media  {
    #    alias /var/www/path/to/your/project/media;      # your Django project's media files
    # } 

    location /static {
        alias /home/ubuntu/SimpleReactDjango/frontend;     # your Django project's static files
    }

    location /css {
        alias /home/ubuntu/SimpleReactDjango/frontend/css;     # your Django project's static files
    }

    # Finally, send all non-media requests to the Django server.
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
#### Reload Nginx config
```
sudo /etc/init.d/nginx reload
```

#### Install npm modules for react frontend
```
npm install
```
#### Generate javascript bundle from reactjs using webpack
```
./node_modules/.bin/webpack --config webpack.config.js
```
#### Run gunicorn command in project directory
```
gunicorn --bind 0.0.0.0:8000 nameofyourapp.wsgi;
```

