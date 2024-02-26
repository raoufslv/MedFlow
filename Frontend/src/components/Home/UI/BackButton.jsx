const BackButton = () => {
  return (
    <img
      src="icons/back.svg"
      alt="go-back icon"
      className="w-16 h-16 cursor-pointer"
      onClick={() => window.history.back()}
    />
  );
};

export default BackButton;
