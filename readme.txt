Changed the host from 0.0.0.0 to localhost - Windows sometimes has issues with binding to 0.0.0.0
Removed the reusePort: true option which is not supported on Windows
Try running the application again with:

npm run dev
The server should now start successfully on localhost:3001 and you can access the application in your browser at http://localhost:3001.