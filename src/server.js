// server.js
import { Server } from "miragejs";

const mockServer = () => {
  return new Server({
    routes() {
      this.namespace = "";

      this.get("/*", async (schema, request) => {
        const { url, localJsonFile } = request.queryParams;
        try {
          let responseData;
          if (url && url.trim() !== "") {
            const response = await fetch(url);
            if (response.ok) {
              responseData = await response.json();
            } else {
              throw new Error("Network response was not ok");
            }
          } else if (localJsonFile) {
            responseData = require(localJsonFile);
          } else {
            throw new Error("No URL or local JSON file provided");
          }
          return responseData;
        } catch (error) {
          console.error("Error fetching data:", error);
          if (Array.isArray(localJsonFile)) {
            return localJsonFile;
          } else {
            return { error: "Failed to fetch data" };
          }
        }
      });

      this.passthrough(); // Pass through other requests not handled by Mirage
    },
  });
};

export default mockServer;
