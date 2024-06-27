import Review from '../dataBase/models/ReviewModel.js';

export default class ReviewService {

    static async addReview(req) {
        try {
            if (req.body === '🫖') return 418

            const review = await Review.create(req.body);

            if (review) {
                review.UserId = req.user.id;
                review.save();
                return review
            }

            return 400;
        } catch (error) {
            throw new Error(error);
        }
    };
};
