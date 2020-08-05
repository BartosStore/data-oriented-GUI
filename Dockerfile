### Build step

ARG FROM=node:12-alpine

FROM ${FROM} as builder

# Pre-cache packages

#WORKDIR /precache
#COPY package*.json ./
#RUN ls -l
#RUN npm ci

# Build

WORKDIR /build
COPY ./ ./
#RUN cp -a /precache/node_modules ./

RUN npm ci
RUN npm run build

### Packaging step

FROM nginx:1-alpine

COPY --from=builder /build/dist /var/www/html

COPY nginx.conf /etc/nginx/nginx.conf

COPY entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
