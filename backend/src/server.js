import express from "express";

import cors from "cors";

import cookieParser from "cookie-parser";

import { ENV } from "./config/env.js";

import { connectDB } from "./config/db.js";

import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "../swagger.js";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

import authRoutes from "./routes/auth.route.js";

import dashboardRoutes from "./routes/dashboard.route.js";

import organizationRoutes from "./routes/organization.route.js";

import userRoutes from "./routes/user.route.js";

import roleRoutes from "./routes/role.route.js";

import privilegeRoutes from "./routes/privilege.route.js";

import storeRoutes from "./routes/store.route.js";

import shopifyIntegrationRoutes from "./routes/shopify-integration.route.js";

import visitorRoutes from "./routes/visitor.route.js";

import visitorEventRoutes from "./routes/visitor-event.route.js";

import conversationRoutes from "./routes/conversation.route.js";

import messageRoutes from "./routes/message.route.js";

import aiAgentRoutes from "./routes/ai-agent.route.js";

import knowledgeBaseRoutes from "./routes/knowledge-base.route.js";

import knowledgeItemRoutes from "./routes/knowledge-item.route.js";

import engagementRuleRoutes from "./routes/engagement-rule.route.js";

import offerRoutes from "./routes/offer.route.js";

import followUpRoutes from "./routes/follow-up.route.js";

import conversionRoutes from "./routes/conversion.route.js";

import analyticsRoutes from "./routes/analytics.route.js";

import notificationRoutes from "./routes/notification.route.js";

import auditLogRoutes from "./routes/audit-log.route.js";

import webhookRoutes from "./routes/webhook.route.js";

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

import { errorHandler } from "./middleware/error.middleware.js";

import { notFound } from "./middleware/not-found.middleware.js";


const app = express();


/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/

// Cookie parser
app.use(cookieParser());


// Enable CORS
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);


/*
|--------------------------------------------------------------------------
| Shopify Webhooks
|--------------------------------------------------------------------------
|
| Shopify webhook requests need the raw request body for HMAC
| signature verification.
|
| This route must be registered before express.json().
|
*/

app.use(
  "/api/webhooks/shopify",
  express.raw({
    type: "application/json",
  })
);


/*
|--------------------------------------------------------------------------
| Parse JSON requests
|--------------------------------------------------------------------------
*/

app.use(express.json());


/*
|--------------------------------------------------------------------------
| Swagger
|--------------------------------------------------------------------------
*/

// Swagger JSON
app.get("/api-docs/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/


// Authentication
app.use(
  "/api/auth",
  authRoutes
);


// Dashboard
app.use(
  "/api/dashboard",
  dashboardRoutes
);


// Organizations
app.use(
  "/api/organization",
  organizationRoutes
);


// Users
app.use(
  "/api/users",
  userRoutes
);


// Roles
app.use(
  "/api/roles",
  roleRoutes
);


// Privileges
app.use(
  "/api/privileges",
  privilegeRoutes
);


// Stores
app.use(
  "/api/stores",
  storeRoutes
);


// Shopify integrations
app.use(
  "/api/shopify",
  shopifyIntegrationRoutes
);


// Visitors
app.use(
  "/api/visitors",
  visitorRoutes
);


// Visitor tracking events
app.use(
  "/api/visitor-events",
  visitorEventRoutes
);


// Conversations
app.use(
  "/api/conversations",
  conversationRoutes
);


// Conversation messages
app.use(
  "/api/messages",
  messageRoutes
);


// AI agents
app.use(
  "/api/ai-agents",
  aiAgentRoutes
);


// Knowledge bases
app.use(
  "/api/knowledge-bases",
  knowledgeBaseRoutes
);


// Knowledge base items
app.use(
  "/api/knowledge-items",
  knowledgeItemRoutes
);


// Engagement rules
app.use(
  "/api/engagement-rules",
  engagementRuleRoutes
);


// Offers / discounts
app.use(
  "/api/offers",
  offerRoutes
);


// Follow-ups
app.use(
  "/api/follow-ups",
  followUpRoutes
);


// Conversions
app.use(
  "/api/conversions",
  conversionRoutes
);


// Analytics
app.use(
  "/api/analytics",
  analyticsRoutes
);


// Notifications
app.use(
  "/api/notifications",
  notificationRoutes
);


// Audit logs
app.use(
  "/api/audit-logs",
  auditLogRoutes
);


// Webhooks
app.use(
  "/api/webhooks",
  webhookRoutes
);


/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Baranda API is running",
  });
});


/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use(notFound);


/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorHandler);


/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

export { app };


const startServer = async () => {
  try {
    await connectDB();

    app.listen(
      ENV.PORT || 3000,
      () => {
        console.log(
          `Baranda API is running on port ${
            ENV.PORT || 3000
          }`
        );
      }
    );
  } catch (error) {
    console.error(
      "Failed to start server:",
      error
    );

    process.exit(1);
  }
};


startServer();