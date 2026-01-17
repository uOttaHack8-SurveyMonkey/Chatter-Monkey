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
    logic: "Customer praised the Dalgona Coffee, said they would return and recommend the café. No negative comments given." 
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
    }
  ],

  // ==============================
  // CUSTOMER ADVICE & EXPECTATIONS
  // ==============================
  customerAdvice: {
    provided: true,           
    quotedKeywords: [
      "Maybe some pastries to go with the coffee. That would be nice."
    ],        
    summarizedInsight: "Customer suggested offering pastries to pair with coffee to improve the overall café experience."
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
