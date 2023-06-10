const corsAnywhere = require('cors-anywhere');
const port = 8080;
corsAnywhere.createServer().listen(port, () => {
  console.log(`CORS Anywhere proxy server running on port ${port}`);
});