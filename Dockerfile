FROM node:22-alpine

# Create app directory 
WORKDIR /pizza-cubed

# Install dependancies
COPY package*.json ./
RUN npm install

# Bundel app source
COPY . .

# Expose port and start the app
EXPOSE 3000
RUN npm run build
CMD npm start
