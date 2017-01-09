FROM node:4-slim

# Create app directory
RUN mkdir -p /usr/src/app && \
    apt update && \
    apt install -y jq && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --silent -g bower && \
    npm install --silent -g npm && \
    npm install --silent --prod && \
    npm prune --prod

# Bundle app source
COPY . /usr/src/app

# Set port
EXPOSE 443

# Start app
CMD ["npm", "start"]