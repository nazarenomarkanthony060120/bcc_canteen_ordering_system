import { db, collection, addDoc, serverTimestamp } from '@/lib/firestore'
import { SubmitFeedbackRequest } from '@/utils/types'

export const submitFeedback = async ({
  foodId,
  userId,
  rating,
  feedback,
}: SubmitFeedbackRequest) => {
  try {
    // Validate required fields
    if (!foodId || !userId || !rating || !feedback) {
      throw new Error('Missing required fields for feedback submission')
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5')
    }

    // Validate feedback length
    if (feedback.trim().length < 10) {
      throw new Error('Feedback must be at least 10 characters long')
    }

    const feedbackData = {
      foodId,
      userId,
      rating,
      feedback: feedback.trim(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, 'feedbacks'), feedbackData)

    console.log('Feedback submitted successfully with ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('Error submitting feedback:', error)
    throw error
  }
}
