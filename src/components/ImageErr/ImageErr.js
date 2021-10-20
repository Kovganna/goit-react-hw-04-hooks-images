import sadDog from '../../img/sadDog.jpg';

const NoFoundImage = () => {
  return (
    <div role="alert">
      <img src={sadDog} width="400" alt="sadDog" />
      <p>No match...</p>
    </div>
  );
};

export default NoFoundImage;
