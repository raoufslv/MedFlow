const Navbar = () => {
  return (
    <div className="flex justify-between px-10 bg-white">
      <div
        className="flex gap-6 items-center cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        <img src="ico.svg" alt="logo_MEDHUB" className=" my-[1rem]" />
        <h1 className="font-extrabold text-4xl text-secondary font-racingSansOne">
          MED FLOW
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
