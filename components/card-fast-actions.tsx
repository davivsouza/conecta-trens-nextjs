import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  href: string;
  title: string;
  description: string;
  imgName: string;
  tag1: string;
  tag2: string;
}
export function CardFastActions(props: Props) {
  return (
    <Link
      href={props.href}
      className="group max-w-[440px] w-full  relative rounded-[40px] bg-[#f3f0e9] transition-all duration-200 hover:bg-[#c3ff3d] flex flex-col justify-between"
    >
      <div className="p-6 flex flex-col gap-5 h-[400px] md:h-[340px]">
        <div className="flex gap-2">
          <div className="bg-white rounded-[20px] px-4 py-2">
            <p className="text-sm">{props.tag1}</p>
          </div>
          <div className="bg-white rounded-[20px] px-4 py-2">
            <p className="text-sm">{props.tag2}</p>
          </div>
        </div>

        <h1 className="text-3xl lg:text-[35px] text-black font-bold leading-tight">
          {props.title}
        </h1>
        <p className="text-lg text-black">{props.description}</p>
      </div>

      <div className="relative">
        <img
          src={props.imgName}
          alt="Mulher esperando na plataforma da estação"
          className="w-full rounded-[40px] p-1 object-cover relative top-14"
        />
        <button className=" bottom-8 left-8 h-[55px] w-[150px] flex items-center rounded-[50px] border-none text-base font-semibold text-black pl-6 pr-12 relative bg-white">
          Ver mais
          <div className="w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center text-white absolute right-1">
            <ArrowRight />
          </div>
        </button>
      </div>
    </Link>
  );
}
