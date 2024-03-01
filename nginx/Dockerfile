FROM nginx:1.21

# Remove default configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom configuration file
COPY nginx.conf /etc/nginx/conf.d

# Start Nginx when the container has launched
CMD ["nginx", "-g", "daemon off;"]
