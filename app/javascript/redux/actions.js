import { setGreeting } from './slices/greetingSlice';

export const fetchRandomGreeting = () => {
  return (dispatch) => {
    fetch('/api/v1/messages')
      .then((response) => response.json())
      .then((data) => dispatch(setGreeting(data.greeting)))
      .catch((error) => console.error('Error fetching greeting:', error));
  };
};
