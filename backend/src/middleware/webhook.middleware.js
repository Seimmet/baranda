// import crypto from "crypto";

// import ShopifyIntegration from "../models/shopify-integration.model.js";

// export const verifyShopifyWebhook = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const hmacHeader = req.headers["x-shopify-hmac-sha256"];
//     const shopDomain = req.headers["x-shopify-shop-domain"];

//     if (!hmacHeader || !shopDomain) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid Shopify webhook request",
//       });
//     }

//     const integration = await ShopifyIntegration.findOne({
//       shopDomain,
//     });

//     if (!integration) {
//       return res.status(404).json({
//         success: false,
//         message: "Shopify integration not found",
//       });
//     }

//     if (!integration.webhookSecret) {
//       return res.status(500).json({
//         success: false,
//         message: "Shopify webhook secret is not configured",
//       });
//     }

//     /*
//      * Shopify signs the raw request body.
//      *
//      * req.rawBody must be populated before express.json()
//      * processes the request.
//      */
//     const rawBody = req.rawBody;

//     if (!rawBody) {
//       return res.status(400).json({
//         success: false,
//         message: "Raw webhook body is required",
//       });
//     }

//     const generatedHash = crypto
//       .createHmac(
//         "sha256",
//         integration.webhookSecret
//       )
//       .update(rawBody)
//       .digest("base64");

//     const receivedBuffer = Buffer.from(
//       hmacHeader,
//       "utf8"
//     );

//     const generatedBuffer = Buffer.from(
//       generatedHash,
//       "utf8"
//     );

//     if (
//       receivedBuffer.length !== generatedBuffer.length ||
//       !crypto.timingSafeEqual(
//         receivedBuffer,
//         generatedBuffer
//       )
//     ) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid Shopify webhook signature",
//       });
//     }

//     req.shopifyIntegration = integration;

//     next();
//   } catch (error) {
//     console.error(
//       "Shopify webhook verification error:",
//       error
//     );

//     next(error);
//   }
// };

import crypto from "crypto";

import ShopifyIntegration from "../models/shopify-integration.model.js";

export const verifyShopifyWebhook = async (
  req,
  res,
  next
) => {
  try {
    const hmacHeader =
      req.headers["x-shopify-hmac-sha256"];

    const shopDomain =
      req.headers["x-shopify-shop-domain"];

    if (!hmacHeader || !shopDomain) {
      return res.status(401).json({
        success: false,
        message: "Invalid Shopify webhook request",
      });
    }

    const integration =
      await ShopifyIntegration.findOne({
        shopDomain: shopDomain.toLowerCase(),
      });

    if (!integration) {
      return res.status(404).json({
        success: false,
        message: "Shopify integration not found",
      });
    }

    if (!integration.webhookSecret) {
      return res.status(500).json({
        success: false,
        message:
          "Shopify webhook secret is not configured",
      });
    }

    const rawBody = req.body;

    if (!Buffer.isBuffer(rawBody)) {
      return res.status(400).json({
        success: false,
        message: "Raw webhook body is required",
      });
    }

    const generatedHash = crypto
      .createHmac(
        "sha256",
        integration.webhookSecret
      )
      .update(rawBody)
      .digest("base64");

    const receivedBuffer = Buffer.from(
      hmacHeader,
      "utf8"
    );

    const generatedBuffer = Buffer.from(
      generatedHash,
      "utf8"
    );

    if (
      receivedBuffer.length !==
        generatedBuffer.length ||
      !crypto.timingSafeEqual(
        receivedBuffer,
        generatedBuffer
      )
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid Shopify webhook signature",
      });
    }

    req.shopifyIntegration = integration;

    next();
  } catch (error) {
    console.error(
      "Shopify webhook verification error:",
      error
    );

    next(error);
  }
};