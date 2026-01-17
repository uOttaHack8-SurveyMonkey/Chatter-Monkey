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
    logic: "Customer described the experience as 'really good' and noted she comes every week and it 'never disappoints', indicating overall positive sentiment."
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
      menuProductName: "Berry Bliss Waffle",     
      mentionedAs: "Berry Bliss Waffle",         
      sentiment: "Positive",    
      confidence: 1.0
    }
  ],

  // ==============================
  // CUSTOMER ADVICE & EXPECTATIONS
  // ==============================
  customerAdvice: {
    provided: true,           
    quotedKeywords: ["Maybe more vegan options. My friend is vegan and can’t enjoy as much."],        
    summarizedInsight: "Customer suggests adding more vegan options to the menu to accommodate friends with dietary restrictions."
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
