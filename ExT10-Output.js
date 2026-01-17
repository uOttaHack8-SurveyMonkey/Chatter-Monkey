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
    negative: false           // true if overall sentiment is negative
  },

  // ==============================
  // OVERALL SERVICE SENTIMENT
  // ==============================
  overallServiceRating: {
    sentiment: "Positive",    // "Positive" | "Negative" | "Neutral"
    logic: "Customer provided positive feedback on all products and general experience." // Short explanation of how sentiment was decided
  },

  // ==============================
  // PRODUCT SENTIMENT ANALYSIS
  // ==============================
  productRatings: [
    {
      menuProductName: "Dalgona Coffee", 
      mentionedAs: "Dalgona Coffee",
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
    quotedKeywords: ["Maybe more seasonal drinks and desserts. Keeps it exciting."],
    summarizedInsight: "Customer suggested offering more seasonal drinks and desserts to maintain variety and interest."
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
