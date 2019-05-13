FROM mhart/alpine-node
RUN npm install -g serve
WORKDIR /app
COPY ./build .
CMD ["serve", "-p", "80", "-s", "."]
