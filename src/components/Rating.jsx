import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Rating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <span key={index}>
          {rating > index ? (
            <AiFillStar fontSize="1rem" />
          ) : (
            <AiOutlineStar fontSize="1rem" />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;
