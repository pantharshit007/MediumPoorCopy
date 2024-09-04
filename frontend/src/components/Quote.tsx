function Quote() {
  return (
    <div className="bg-slate-200 w-full h-full flex justify-center items-center max-lg:hidden">
      <div className=" w-[75%]">
        <div className="font-bold max-2xl:text-2xl text-4xl font-serif italic">
          "The customer service I received was exceptional. The support team
          went above and beyond to address my concerns."
        </div>
        <div className="mt-3">
          <p className="text-md font-bold">Jules Winnfield</p>
          <p className="text-slate-500 text-[1rem]">CEO, Gada Electronics</p>
        </div>
      </div>
    </div>
  );
}

export default Quote;
