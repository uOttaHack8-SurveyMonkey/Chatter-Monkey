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
    logic: "Customer described service as friendly and quick, and product experience was enjoyable." 
  },

  // ==============================
  // PRODUCT SENTIMENT ANALYSIS
  // ==============================
  productRatings: [
    {
      menuProductName: "Strawberry lemonade",
      mentionedAs: "Strawberry Lemonade",
      sentiment: "Positive",
      confidence: 1.0
    },
    {
      menuProductName: "Berry Bliss Waffle",
      mentionedAs: "Berry Waffle",
      sentiment: "Neutral",
      confidence: 0.7
    }
  ],

  // ==============================
  // CUSTOMER ADVICE & EXPECTATIONS
  // ==============================
  customerAdvice: {
    provided: true,
    quotedKeywords: ["Maybe more seating, it was a little full."],
    summarizedInsight: "Customer suggests adding more seating to accommodate busy times and improve comfort."
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
