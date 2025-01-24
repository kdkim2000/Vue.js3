#!/bin/bash
echo "Building Vue app..."
npm run build
echo "Deploying to Nginx..."
sudo cp -r dist/* /usr/share/nginx/html/
sudo systemctl restart nginx
echo "Deployment complete!"

