FROM golang:1.12.6 AS base

# Install software packages
RUN apt-get update
RUN apt-get upgrade -y

# Set up workspace
WORKDIR /go/src/app
COPY . .

# Special node set up
RUN bash setup_12.x
RUN apt-get install -y nodejs

FROM base as builder

# Build client
WORKDIR /go/src/app
RUN npm install -y
RUN npm run build

# Build server
WORKDIR /go/src/app/server
RUN go build server.go


CMD ["./server"]
# ENTRYPOINT [ "./entrypoint.sh" ]