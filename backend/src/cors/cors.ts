const corsOptions = {
  origin: "http://localhost:3000", // Your frontend URL
  credentials: true, // This is important for handling credentials
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;
