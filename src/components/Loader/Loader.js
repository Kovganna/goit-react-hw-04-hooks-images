import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Component from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.LoaderContainer}>
      <Component
        type="Bars"
        color="#8a2be2"
        height={80}
        width={80}
        timeout={100}
      />
    </div>
  );
};

export default Loader;
