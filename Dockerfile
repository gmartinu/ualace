# FROM node:latest as builder

# WORKDIR /app

# COPY package.json ./

# RUN yarn --ignore-optional

# COPY . /app

# RUN yarn run build


# Ngnix
FROM nginx:latest

# Make /var/cache/nginx/ writable by non-root users
RUN chgrp nginx /var/cache/nginx/
RUN chmod -R g+w /var/cache/nginx/

# Write the PID file to a location where regular users have write access.
RUN sed --regexp-extended --in-place=.bak 's%^pid\s+/var/run/nginx.pid;%pid /var/tmp/nginx.pid;%' /etc/nginx/nginx.conf

COPY ./build /var/www/frontend
RUN chgrp nginx /var/www/frontend
RUN chmod -R g+w /var/www/frontend
ADD ./nginx/production.conf /etc/nginx/conf.d/default.conf
USER nginx