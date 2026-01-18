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
    logic: "Customer described the drink as 'perfect as always' and 'really rich and smooth', indicating satisfaction with service."      // Short explanation of how sentiment was decided
  },

  // ==============================
  // PRODUCT SENTIMENT ANALYSIS
  // ==============================
  productRatings: [
    {
      menuProductName: "Chocolate Foam Coffee / Iced Latte with Chocolate Foam",     // Exact menu name
      mentionedAs: "Chocolate foam coffee, iced",         // Words customer used
      sentiment: "Positive",    // "Positive" | "Negative" | "Neutral"
      confidence: 0.95          // 0.0 – 1.0 inference confidence
    }
  ],

  // ==============================
  // CUSTOMER ADVICE & EXPECTATIONS
  // ==============================
  customerAdvice: {
    provided: true,           // Boolean
    quotedKeywords: ["Maybe offer a loyalty discount? I come here a lot."],        // Direct phrases from customer
    summarizedInsight: "Customer suggests a loyalty program to reward frequent visitors."      // Short human-readable summary
  },

  // ==============================
  // METADATA
  // ==============================
  metadata: {
    transcriptReviewed: true,
    inferenceUsed: true,          // Mapping phrasing to menu item required inference
    irrelevantMentionsIgnored: true
  }
};

export default surveyAnalysis;
