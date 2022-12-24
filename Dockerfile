FROM node:10-alpine
WORKDIR /app

COPY ./ ./

RUN npm install
RUN npm run build

FROM nginx:stable-alpine

COPY --from=0 /app/build /usr/share/nginx/html

COPY gen-env.sh /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

RUN apk add --no-cache bash

RUN chmod +x /usr/share/nginx/html/gen-env.sh

ENTRYPOINT ["/bin/bash", "-c", "/usr/share/nginx/html/gen-env.sh && nginx -g \"daemon off;\""]