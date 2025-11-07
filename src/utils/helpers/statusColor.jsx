const getStatusClasses = (status) => {
  switch (status.toLowerCase()) {
    case "planned":
      return "border-[#5d5fef] border-[1.5px] border-solid ";
    case "in process":
      return "border-[#DCB100] border-[1.5px] border-solid  ";
    case "paused":
      return "border-[#DCB100] border-[1.5px] border-solid text-white";
    case "completed":
      return "border-[#86B75B] border-[1.5px] border-solid  text-white";
    default:
      return "bg-[#E3E2FF]";
  }
};

export default getStatusClasses;
