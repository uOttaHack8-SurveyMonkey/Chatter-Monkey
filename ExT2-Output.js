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
    given: true,              // Boolean: true if customer consented
    actionTaken: "counted"    // "counted" | "stopped"
  },

  // ==============================
  // SURVEY COMPLETION FLAG
  // ==============================
  surveyCompleted: true,      // Boolean: true if consent was given and survey completed

  // ==============================
  // SERVICE RATING COUNTERS (PER RECORD FLAGS)
  // ==============================
  serviceRatingFlags: {
    positive: true,           // true if overall sentiment is positive
    negative: false            // true if overall sentiment is negative
  },

  // ==============================
  // OVERALL SERVICE SENTIMENT
  // ==============================
  overallServiceRating: {
    sentiment: "Positive",      // "Positive" | "Negative" | "Neutral"
    logic: "Customer described experience as better than previous visit, staff friendly, and products enjoyable"      // Short explanation of how sentiment was decided
  },

  // ==============================
  // PRODUCT SENTIMENT ANALYSIS
  // ==============================
  productRatings: [
    {
      menuProductName: "Matcha Latte",
      mentionedAs: "Matcha Latte",
      sentiment: "Positive",
      confidence: 1.0
    },
    {
      menuProductName: "Cookies and Creme Waffle",
      mentionedAs: "cookies and cream waffle",
      sentiment: "Positive",
      confidence: 1.0
    }
  ],

  // ==============================
  // CUSTOMER ADVICE & EXPECTATIONS
  // ==============================
  customerAdvice: {
    provided: true,
    quotedKeywords: ["maybe have some more seasonal drinks? I’d love a mango latte in summer."],
    summarizedInsight: "Customer would like more seasonal drinks, suggesting interest in limited-time or special offerings beyond regular menu items."
  },

  // ==============================
  // METADATA
  // ==============================
  metadata: {
    transcriptReviewed: true,
    inferenceUsed: false,
    irrelevantMentionsIgnored: true
  }
};

export default surveyAnalysis;
