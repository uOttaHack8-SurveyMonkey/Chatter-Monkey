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
    logic: "Customer described products as delicious and atmosphere as good, no major complaints."      // Short explanation of how sentiment was decided
  },

  // ==============================
  // PRODUCT SENTIMENT ANALYSIS
  // ==============================
  productRatings: [
    {
      menuProductName: "Ube Coffee",     
      mentionedAs: "Ube Coffee",
      sentiment: "Positive",
      confidence: 1.0
    },
    {
      menuProductName: "Pina Colada",     
      mentionedAs: "Pina Colada",
      sentiment: "Positive",
      confidence: 0.9
    }
  ],

  // ==============================
  // CUSTOMER ADVICE & EXPECTATIONS
  // ==============================
  customerAdvice: {
    provided: true,           
    quotedKeywords: ["Maybe a few more plugs for laptops. I come here to work sometimes."],
    summarizedInsight: "Suggested adding more power outlets to improve experience for customers who work in the cafe."
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
