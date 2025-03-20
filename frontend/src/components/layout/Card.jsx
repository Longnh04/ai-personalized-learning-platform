// import {Image} from '../../assets/imgs/devnest-logo.png';
import React from 'react';
import '../../index.css';

function Card() {
  return (
    <>
      <div className="w-full max-w-[422px] mx-auto [background:linear-gradient(45deg,#080b11,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-2xl border border-transparent animate-border ">
        <div className="relative text-center z-10 px-0 py-16 rounded-2xl  w-fit bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/new-grid_ng16tf.png')]  h-full mx-auto">
          <>
            <img
              src={'https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/414600426_336327302678305_3484402541034783645_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=qYsSQVB7JFAQ7kNvgFXI7Yu&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=Ak52Jray0ad2wblV9H9vAkT&oh=00_AYBXF3wPxgeeSxi5VQ2h-t3lS53LW-975yDfU7jOPYBv3w&oe=67809DE5'}
              alt="grid"
              width={600}
              className="mx-auto w-[85%]"
              height={600}
            />
            <h1 className="text-xl font-semibold tracking-tight text-white">
              Create Group Effortlessly
            </h1>
            <p className="text-base pt-2  text-gray-300 capitalize">
              Seamless chats, crystal-clear videos, and <br />
              premium audio quality
            </p>
          </>
        </div>
      </div>
    </>
  );
}
export default Card;
