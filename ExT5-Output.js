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
    logic: "Customer said hot chocolate was 'really good' and would 'definitely' come back."      // Short explanation of how sentiment was decided
  },

  // ==============================
  // PRODUCT SENTIMENT ANALYSIS
  // ==============================
  productRatings: [
    {
      menuProductName: "Hot Chocolate",     // Exact menu name
      mentionedAs: "Hot chocolate",         // Words customer used
      sentiment: "Positive",                // "Positive" | "Negative" | "Neutral"
      confidence: 1.0                       // 0.0 – 1.0 inference confidence
    }
  ],

  // ==============================
  // CUSTOMER ADVICE & EXPECTATIONS
  // ==============================
  customerAdvice: {
    provided: true,           // Boolean
    quotedKeywords: ["Maybe some bigger cups?"],  // Direct phrases from customer
    summarizedInsight: "Customer suggested offering larger cup sizes for drinks."      // Short human-readable summary
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
