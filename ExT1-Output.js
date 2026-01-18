/**
 * STANDARD SURVEY ANALYSIS OUTPUT TEMPLATE
 * ----------------------------------------
 * Do not rename variables.
 * Do not remove fields.
 * Only modify values based on transcript analysis.
 */

const surveyAnalysis = {
  // ==============================
  // SURVEY CONSENT
  // ==============================
  surveyConsent: {
    given: true,               // Boolean: true if customer consented
    actionTaken: "counted"     // "counted" | "stopped"
  },

  // ==============================
  // SURVEY COMPLETION FLAG
  // ==============================
  surveyCompleted: true,       // Boolean: true if consent was given and survey completed

  // ==============================
  // SERVICE RATING COUNTERS (PER RECORD FLAGS)
  // ==============================
  serviceRatingFlags: {
    positive: true,            // true if overall sentiment is positive
    negative: false            // true if overall sentiment is negative
  },

  // ==============================
  // OVERALL SERVICE SENTIMENT
  // ==============================
  overallServiceRating: {
    sentiment: "Positive",     // "Positive" | "Negative" | "Neutral"
    logic: "Customer praised the food as 'really good' and staff as 'super nice and helpful', indicating a positive overall experience."
  },

  // ==============================
  // PRODUCT SENTIMENT ANALYSIS
  // ==============================
  productRatings: [
    {
      menuProductName: "Berry Bliss Waffle", // Exact menu name
      mentionedAs: "Berry Waffles… the one with the mixed berries on top", // Words customer used
      sentiment: "Positive",                  // "Positive" | "Negative" | "Neutral"
      confidence: 0.9                         // 0.0 – 1.0 inference confidence
    }
  ],

  // ==============================
  // CUSTOMER ADVICE & EXPECTATIONS
  // ==============================
  customerAdvice: {
    provided: true,                          // Boolean
    quotedKeywords: ["Maybe just a little more seating? It was a bit crowded today."], // Direct phrases from customer
    summarizedInsight: "Customer suggests adding more seating to improve comfort during busy times."
  },

  // ==============================
  // METADATA
  // ==============================
  metadata: {
    transcriptReviewed: true,
    inferenceUsed: true,
    irrelevantMentionsIgnored: true
  }
};

export default surveyAnalysis;
