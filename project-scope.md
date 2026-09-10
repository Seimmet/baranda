# Baranda — Project Scope

## 1. Project Overview

### Product Name

**Baranda**

### Product Description

Baranda is an AI-powered sales and conversion platform for existing ecommerce websites, initially focused on Shopify stores.

Baranda integrates with an existing ecommerce store and acts as an intelligent AI sales representative that observes visitor behavior, identifies potential buying intent, and engages shoppers at the right moment to help answer questions, recommend products, overcome objections, and encourage purchases.

Unlike a traditional chatbot that waits for customers to ask questions, Baranda is proactive. It uses real-time visitor behavior and ecommerce events to determine when a shopper may need assistance or is showing strong buying intent.

Baranda can engage visitors through text chat initially, with voice and AI video agents planned for future versions.

The platform also helps merchants recover potential lost revenue by following up with abandoned carts and engaging customers after purchase.

---

# 2. Problem We Are Solving

Ecommerce stores lose a significant number of potential customers because visitors often leave without receiving the information or reassurance they need before making a purchase.

A typical ecommerce journey may look like this:

1. A visitor lands on an ecommerce website.
2. The visitor views one or more products.
3. The visitor has questions or uncertainties.
4. The visitor may compare products or hesitate about purchasing.
5. The visitor adds products to their cart but does not complete checkout.
6. The visitor leaves the website.
7. The store loses a potential sale.

Unlike physical stores, most ecommerce websites do not have an intelligent salesperson actively available to recognize when a customer needs help.

Traditional ecommerce chatbots also have limitations:

* They are usually reactive.
* They wait for the visitor to initiate a conversation.
* They do not deeply understand visitor buying behavior.
* They are often designed primarily for customer support rather than sales.
* They do not identify why a visitor may be hesitant to purchase.
* They rarely provide intelligent, personalized engagement based on real-time behavior.

Ecommerce merchants also struggle to understand:

* Which visitors have high purchase intent.
* Which products customers are interested in.
* Why customers abandon carts.
* What questions customers frequently ask.
* What objections prevent purchases.
* When a discount or incentive should be offered.
* Which visitors should receive proactive assistance.

Baranda aims to solve this problem by bringing the equivalent of an intelligent sales representative into an existing ecommerce website.

---

# 3. Proposed Solution

Baranda will be a standalone SaaS application that integrates with existing Shopify and ecommerce stores.

The platform will install a tracking and engagement layer on the merchant's website.

Baranda will:

1. Track visitor activity on the website.
2. Capture important ecommerce and browsing events.
3. Analyze visitor behavior.
4. Calculate a visitor's level of buying intent.
5. Identify visitors who may need assistance.
6. Proactively engage selected visitors.
7. Answer questions using the store's product and business information.
8. Recommend relevant products.
9. Help address common objections.
10. Encourage visitors to complete purchases.
11. Track conversations and conversion outcomes.
12. Follow up with abandoned or interested customers where permitted.
13. Provide merchants with insights into visitor behavior and sales opportunities.

Baranda will initially use AI-powered text conversations.

Future versions will introduce:

* AI voice agents.
* AI video avatars.
* Human sales representative handoff.
* Advanced automated follow-up.
* Predictive intent detection.

The long-term vision is for Baranda to become an AI sales team for ecommerce businesses.

---

# 4. Target Users

## Primary Users

### Shopify Store Owners

Merchants with existing Shopify stores who want to:

* Increase conversion rates.
* Reduce cart abandonment.
* Answer customer questions automatically.
* Improve product discovery.
* Increase average order value.
* Provide 24/7 sales assistance.

### Ecommerce Business Owners

Businesses operating existing ecommerce websites outside Shopify, including:

* WooCommerce stores.
* BigCommerce stores.
* Custom-built ecommerce platforms.

Initial development will focus on Shopify because of its ecosystem and standardized APIs.

---

# 5. Core User Roles

## Merchant / Store Owner

The merchant connects their store to Baranda and configures the AI sales agent.

The merchant can:

* Connect their ecommerce store.
* Configure the AI agent.
* Review visitor activity.
* View conversations.
* Configure engagement rules.
* Configure discounts and offers.
* Review analytics.
* Manage store knowledge.
* Review sales and conversion performance.

---

## Website Visitor / Shopper

The visitor interacts with the merchant's ecommerce website.

The visitor may:

* Browse products.
* Ask Baranda questions.
* Receive proactive engagement.
* Receive product recommendations.
* Receive assistance during the buying journey.
* Receive follow-up communications where permitted.

---

## Baranda AI Sales Agent

The AI sales agent acts as an automated ecommerce sales representative.

The AI agent can:

* Understand product information.
* Answer customer questions.
* Recommend products.
* Explain product benefits.
* Compare products.
* Answer policy questions.
* Handle common objections.
* Encourage checkout.
* Follow merchant-defined sales instructions.

---

# 6. Full Feature Scope

The following represents the complete product vision. Not all features will be included in the MVP.

---

## 6.1 Store Integration

### Shopify Integration

The platform must allow merchants to connect an existing Shopify store to Baranda.

The integration should allow Baranda to access relevant store information, including:

* Store name.
* Store domain.
* Products.
* Product descriptions.
* Product images.
* Product variants.
* Product prices.
* Collections.
* Inventory availability where permitted.
* Customer information where permitted.
* Cart events.
* Order events.
* Checkout-related events where available.

### Future Ecommerce Integrations

Future versions may support:

* WooCommerce.
* BigCommerce.
* Magento.
* Custom ecommerce platforms.
* Generic JavaScript integration.

---

## 6.2 Website Tracking

Baranda must provide a lightweight tracking mechanism installed on the merchant's website.

The tracking system should capture relevant visitor behavior.

### Events to Track

* Website visit.
* Page view.
* Product page view.
* Product viewed.
* Product viewed multiple times.
* Collection viewed.
* Search performed.
* Product variant selected.
* Time spent on a page.
* Scroll activity.
* Add to cart.
* Remove from cart.
* Cart viewed.
* Checkout started.
* Checkout abandoned.
* Purchase completed.
* Return visit.

The system should associate events with an anonymous visitor session unless the visitor becomes identifiable through the ecommerce journey.

---

## 6.3 Visitor Identity and Session Management

Baranda must create and manage visitor sessions.

The system should be able to identify:

* Anonymous visitors.
* Returning visitors.
* Logged-in customers where available.
* Visitors with active carts.
* Visitors who have previously interacted with the AI.

Visitor data should include:

* Visitor/session ID.
* Store ID.
* Session start time.
* Pages visited.
* Products viewed.
* Cart activity.
* Intent score.
* Conversation history.

Privacy and consent requirements must be considered based on the merchant's region and applicable regulations.

---

## 6.4 Buying Intent Detection

Baranda must calculate a buying intent score based on visitor behavior.

The initial version will use rule-based scoring.

Example signals may include:

| Visitor Behavior                          | Possible Intent Signal |
| ----------------------------------------- | ---------------------- |
| Visits a product page                     | Low                    |
| Views multiple products                   | Medium                 |
| Views the same product multiple times     | Medium                 |
| Spends significant time on a product page | Medium                 |
| Selects a variant                         | Medium                 |
| Views shipping information                | Medium/High            |
| Reads reviews                             | Medium/High            |
| Adds product to cart                      | High                   |
| Starts checkout                           | Very High              |
| Returns to the store                      | High                   |

The system should classify visitors into:

* Low Intent.
* Medium Intent.
* High Intent.

Future versions may use machine learning or AI-based intent prediction.

---

## 6.5 Proactive Engagement

Baranda must be able to proactively engage visitors based on configured rules.

Example:

> A visitor has viewed the same product three times and spent more than two minutes on the product page.

Baranda may display:

> "Have questions about this product? I'm here to help."

Engagement triggers may include:

* Time spent on a page.
* Multiple product views.
* Repeat visits.
* Add-to-cart events.
* Checkout hesitation.
* Cart inactivity.
* Exit intent.
* High intent score.

The merchant must be able to control when proactive engagement occurs.

---

## 6.6 AI Sales Chat

The MVP AI interaction method will be text chat.

The AI agent must:

* Answer product questions.
* Answer store policy questions.
* Recommend products.
* Compare products.
* Explain product features.
* Help customers choose between products.
* Address common concerns.
* Encourage purchase when appropriate.

The AI must avoid:

* Inventing product information.
* Making unsupported product claims.
* Giving unauthorized discounts.
* Providing inaccurate shipping or return information.

---

## 6.7 Store Knowledge Base

The AI agent must have access to store-specific information.

Knowledge sources may include:

### Automatically Imported

* Products.
* Product descriptions.
* Collections.
* Prices.
* Variants.
* Store policies.

### Merchant-Provided

* FAQs.
* Sales instructions.
* Product documents.
* Shipping information.
* Return policies.
* Brand information.
* Frequently asked questions.
* Custom sales guidance.

The merchant must be able to review and manage this information.

---

## 6.8 Product Recommendations

Baranda should recommend relevant products based on:

* Products currently being viewed.
* Products in the visitor's cart.
* Product category.
* Customer questions.
* Store-defined recommendations.

Example:

> "If you are looking for a larger size, you may also prefer this version."

Future versions may include AI-powered personalized recommendations based on customer behavior.

---

## 6.9 Objection Detection

Baranda should identify common buying objections during conversations.

Examples include:

* Price concerns.
* Shipping concerns.
* Size uncertainty.
* Product suitability.
* Product quality concerns.
* Delivery time concerns.
* Trust concerns.
* Comparison with alternatives.

The AI should respond using merchant-approved information.

Example:

Customer:

> "This is more expensive than I expected."

Baranda may:

* Explain value.
* Highlight product benefits.
* Compare alternatives.
* Offer a merchant-approved incentive where allowed.

---

## 6.10 Discount and Offer Management

Merchants should be able to define rules for promotional offers.

Examples:

* Maximum discount percentage.
* Minimum cart value.
* Eligible products.
* Eligible customer types.
* First-time customer only.
* High-intent visitor only.

Example rule:

> If a visitor has high intent, has added more than $100 worth of products to their cart, and shows exit intent, Baranda may offer a 10% discount.

The AI must never create discounts outside merchant-defined rules.

This feature may be introduced after the initial MVP depending on Shopify implementation complexity.

---

## 6.11 Conversation Management

Merchants should be able to view AI conversations.

Conversation information should include:

* Visitor ID.
* Session information.
* Pages/products viewed.
* Intent score.
* Conversation transcript.
* Products discussed.
* Conversation outcome.

Possible outcomes:

* Purchased.
* Added to cart.
* No conversion.
* Requested follow-up.

---

## 6.12 Merchant Dashboard

The Baranda dashboard should provide merchants with visibility into AI sales activity.

Dashboard metrics may include:

* Total visitors tracked.
* High-intent visitors.
* AI conversations.
* Products discussed.
* Add-to-cart events influenced.
* Purchases influenced.
* Conversion rate.
* Revenue influenced.

The MVP dashboard should focus on simple, understandable metrics.

---

## 6.13 Live Visitor View

Future versions may include a real-time visitor monitoring interface.

Example:

* Visitor A — Viewing Product X — Intent: High.
* Visitor B — Cart — Intent: Very High.
* Visitor C — Browsing Collection — Intent: Medium.

Merchants may eventually be able to:

* Observe visitor activity.
* See AI engagement.
* Join a conversation.
* Take over a conversation.

This feature is not required for the first MVP.

---

## 6.14 Abandoned Cart Recovery

Future versions should support follow-up with visitors who abandon carts.

Potential channels:

* Email.
* SMS.
* WhatsApp.

The AI should be capable of continuing a personalized sales conversation rather than sending generic reminders.

Example:

> "Hi, you were looking at the Running Shoe X earlier. Do you have any questions about sizing or delivery before completing your order?"

This feature must respect customer consent and communication regulations.

---

## 6.15 Post-Purchase Engagement

Future versions may support automated customer engagement after purchase.

Possible use cases:

* Order follow-up.
* Product usage guidance.
* Customer satisfaction.
* Review requests.
* Cross-selling.
* Upselling.
* Repeat purchase reminders.

---

## 6.16 Voice AI Agent

Future versions may allow customers to speak directly with Baranda.

Capabilities may include:

* Speech-to-text.
* Real-time AI responses.
* Natural voice responses.
* Product recommendations.
* Sales conversations.

Voice interaction should be optional for merchants and visitors.

---

## 6.17 AI Video Sales Agent

Future versions may introduce an AI video agent.

The agent may appear as:

* An AI avatar.
* A branded virtual salesperson.
* A custom merchant representative.

The AI video agent should be triggered selectively to avoid unnecessary cost.

Video engagement should be limited to:

* High-intent visitors.
* Merchant-defined triggers.
* Customers who explicitly request video assistance.

---

## 6.18 Human Sales Agent Handoff

Future versions may allow AI-to-human handoff.

The AI can notify a human representative when:

* A high-value customer needs assistance.
* The AI cannot answer a question.
* The customer explicitly requests a human.
* The conversation reaches a high purchase probability.

---

# 7. Requirements Clarification

Before development begins, the following requirements and product decisions should be clarified.

---

## 7.1 Baranda Is an Integration Layer

Baranda does not create or host ecommerce stores.

The merchant already has an ecommerce store.

Baranda connects to and enhances the existing store.

The merchant should be able to:

1. Create a Baranda account.
2. Connect their Shopify store.
3. Complete authorization.
4. Allow Baranda to import store information.
5. Configure their AI sales agent.
6. Activate Baranda on their existing website.

---

## 7.2 Shopify Will Be the First Platform

Version 1 should focus on Shopify.

This reduces integration complexity and allows the product to be validated with a specific market.

Other ecommerce platforms should be supported later.

---

## 7.3 Engagement Must Not Be Annoying

One major product requirement is that Baranda must not constantly interrupt visitors.

The system must use intelligent engagement controls.

Examples:

* Do not engage immediately after page load.
* Do not repeatedly interrupt the same visitor.
* Allow visitors to dismiss the agent.
* Remember dismissed engagement during the session.
* Allow merchants to control engagement frequency.

The goal is to behave like a helpful salesperson, not an aggressive popup.

---

## 7.4 Merchant Control Is Essential

Merchants must maintain control over:

* AI behavior.
* Sales instructions.
* Products promoted.
* Discounts.
* Offers.
* Engagement triggers.
* Brand tone.
* Knowledge available to the AI.

Baranda should never independently make important commercial decisions outside merchant-defined rules.

---

## 7.5 AI Must Use Store Information

The AI should prioritize information obtained from the merchant's store.

The system should avoid hallucinations.

The AI must be instructed to:

* Use verified store information.
* State uncertainty when information is unavailable.
* Ask clarifying questions.
* Avoid inventing product specifications.
* Avoid making unsupported promises.

---

## 7.6 Conversion Attribution Must Be Defined

Baranda needs a clear definition of what counts as an "AI-influenced conversion."

Possible attribution models include:

### Direct Conversion

The visitor interacted with Baranda and purchased during the same session.

### Assisted Conversion

The visitor interacted with Baranda and purchased within a defined attribution window.

For MVP, the system should start with:

> A purchase is considered AI-influenced when the visitor had an AI conversation and completed a purchase during the same session.

More advanced attribution can be added later.

---

## 7.7 Privacy and Consent

Because Baranda tracks visitor activity, privacy requirements must be considered.

The platform should support:

* Anonymous visitor tracking.
* Consent-aware tracking where required.
* Configurable data retention.
* Merchant control over customer data.
* Visitor privacy requests where applicable.

The exact implementation should depend on the regions in which the merchant operates.

---

# 8. MVP Definition

The MVP should focus on proving one central hypothesis:

> **Can proactive AI sales assistance increase engagement and conversion for high-intent ecommerce visitors?**

Everything in Version 1 should support answering this question.

---

# 9. Version 1 — MVP Features

## 9.1 Merchant Account

Merchants can:

* Sign up.
* Log in.
* Create a Baranda workspace.
* Add their store.

---

## 9.2 Shopify Store Connection

The merchant can connect an existing Shopify store.

Baranda imports:

* Store information.
* Products.
* Product descriptions.
* Product variants.
* Prices.
* Collections.

---

## 9.3 Website Tracking Script / Shopify Integration

Baranda tracks:

* Page views.
* Product views.
* Time spent on product pages.
* Add-to-cart events.
* Cart views.
* Checkout initiation where accessible.
* Purchase completion.

---

## 9.4 Rule-Based Intent Scoring

The MVP uses simple rules instead of machine learning.

Example:

```text
Product page viewed               +10

Viewed product multiple times     +15

More than 60 seconds on product   +15

Viewed multiple products          +10

Added to cart                     +30

Viewed cart                       +10

Started checkout                  +20
```

Intent levels:

```text
0–30     Low Intent

31–60    Medium Intent

61–100   High Intent
```

Merchants do not need advanced customization initially.

The initial scoring model can be predefined by Baranda.

---

## 9.5 AI Chat Widget

The visitor sees a Baranda chat widget on the ecommerce website.

The widget should:

* Be unobtrusive.
* Allow visitors to initiate a conversation.
* Display proactive messages when triggered.
* Allow visitors to close or minimize it.
* Maintain conversation history during the session.

---

## 9.6 Proactive Engagement

The MVP should trigger engagement when visitors meet predefined conditions.

Examples:

### Scenario 1

Visitor spends more than 60 seconds on a product page.

Trigger:

> "Have any questions about this product? I'm here to help."

### Scenario 2

Visitor adds a product to their cart and remains inactive.

Trigger:

> "Need help deciding? I can answer any questions about the products in your cart."

### Scenario 3

Visitor returns to a product previously viewed.

Trigger:

> "Welcome back. Would you like help deciding if this product is right for you?"

---

## 9.7 AI Product Knowledge

The AI should answer questions using:

* Product information.
* Product descriptions.
* Variants.
* Store policies.
* Merchant-provided FAQs.

The MVP does not require a complex knowledge management system.

A simple store data synchronization system is sufficient.

---

## 9.8 Merchant AI Configuration

The merchant should be able to configure:

* AI agent name.
* Welcome message.
* Brand tone.
* Basic sales instructions.

Example:

> "Be friendly and helpful. Focus on helping customers choose the right product. Do not offer discounts unless explicitly configured."

---

## 9.9 Conversation Dashboard

The merchant should be able to view:

* Conversations.
* Visitor session.
* Products discussed.
* Intent level.
* Conversation transcript.
* Purchase outcome where available.

---

## 9.10 Basic Analytics

The MVP dashboard should show:

* Total tracked visitors.
* High-intent visitors.
* AI conversations.
* Visitors who interacted with the AI.
* Purchases following AI interaction.
* Revenue from direct AI-assisted purchases.

---

# 10. Explicitly Out of Scope for MVP

The following features should not delay Version 1.

## AI Video Avatar

Planned for Version 2 or later.

Reason:

Video AI is significantly more expensive and technically complex.

---

## Real-Time Voice Conversations

Planned for Version 2 or later.

Reason:

Text chat is sufficient to validate the sales assistance and intent detection model.

---

## WhatsApp, SMS and Email Follow-Up

Planned for Version 2.

---

## Advanced Discount Automation

Planned for Version 2.

The MVP should initially focus on helping customers rather than automatically negotiating or offering discounts.

---

## Human Agent Handoff

Planned for a later version.

---

## Advanced Machine Learning Intent Prediction

Planned for later.

The MVP should use rule-based intent scoring.

---

## WooCommerce and Other Ecommerce Platforms

Planned after Shopify validation.

---

## Advanced Real-Time Visitor Monitoring

Planned for later.

---

## AI Video Personalization

Planned for later.

---

# 11. Version 2

After validating the MVP, Version 2 should introduce features that directly improve conversion.

Recommended Version 2 priorities:

1. Advanced intent scoring.
2. Objection detection.
3. Discount rules.
4. Product recommendation intelligence.
5. Abandoned cart recovery.
6. Email follow-up.
7. WhatsApp follow-up.
8. Customer segmentation.
9. AI sales performance analytics.
10. Improved conversion attribution.

---

# 12. Version 3 and Future Vision

Version 3 can move Baranda toward becoming a complete AI sales team.

Potential features:

* AI voice sales agent.
* AI video sales agent.
* Human sales representative handoff.
* Live visitor monitoring.
* Predictive buying intent.
* Personalized AI engagement.
* Automated cross-selling.
* Automated upselling.
* Post-purchase AI engagement.
* AI-generated product sales insights.
* AI sales experiments and optimization.
* Multiple AI agents for different sales functions.

---

# 13. MVP User Journey

## Merchant Journey

```text
Sign Up
   ↓
Create Workspace
   ↓
Connect Shopify Store
   ↓
Authorize Store Access
   ↓
Import Products and Store Information
   ↓
Configure AI Agent
   ↓
Activate Baranda
   ↓
Baranda Appears on Existing Store
   ↓
Visitors Are Tracked
   ↓
High-Intent Visitors Are Identified
   ↓
AI Engages Visitors
   ↓
Merchant Reviews Conversations and Results
```

---

## Shopper Journey

```text
Visitor Lands on Existing Ecommerce Store
   ↓
Visitor Browses Products
   ↓
Baranda Tracks Relevant Behavior
   ↓
Intent Score Increases
   ↓
Visitor Reaches Engagement Threshold
   ↓
Baranda Offers Assistance
   ↓
Visitor Interacts with AI
   ↓
AI Answers Questions
   ↓
AI Recommends Product / Addresses Concern
   ↓
Visitor Continues to Checkout
   ↓
Purchase Outcome Is Recorded
```

---

# 14. MVP Success Criteria

The MVP should be considered successful if Baranda can demonstrate that:

1. Shopify merchants can easily connect their existing stores.
2. Baranda can successfully collect visitor behavior.
3. The system can identify visitors with meaningful buying intent.
4. Visitors engage with proactive AI assistance.
5. The AI provides useful and accurate product assistance.
6. Merchants can understand the results through the dashboard.
7. AI conversations can be connected to measurable conversion outcomes.

The most important success metric is:

> **Whether visitors who interact with Baranda convert at a higher rate than comparable visitors who do not interact with Baranda.**

---

# 15. Product Principle

Every Baranda feature should support the following core loop:

# Observe → Understand → Engage → Assist → Convert

Baranda should not behave like a generic chatbot.

It should behave like an intelligent ecommerce salesperson.

The long-term product vision is:

> **Baranda becomes the AI sales layer that sits on top of existing ecommerce stores, understands shopper behavior, and helps turn high-intent visitors into customers through intelligent, personalized conversations.**

---

# 16. Recommended Development Priority

The recommended order of development is:

### Phase 1 — Foundation

* Authentication.
* Merchant accounts.
* Shopify connection.
* Product synchronization.
* Store data storage.

### Phase 2 — Visitor Intelligence

* Website tracking.
* Visitor sessions.
* Ecommerce events.
* Product activity.
* Rule-based intent scoring.

### Phase 3 — AI Sales Agent

* Chat widget.
* AI conversations.
* Product knowledge.
* Merchant AI configuration.

### Phase 4 — Proactive Engagement

* Engagement triggers.
* Intent thresholds.
* Proactive messages.
* Engagement frequency controls.

### Phase 5 — Measurement

* Conversation tracking.
* Conversion tracking.
* Purchase attribution.
* Merchant dashboard.
* Basic analytics.

After these five phases are working, Baranda will have a usable MVP that can be installed on existing Shopify stores and tested with real customers.
