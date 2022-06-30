import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

interface Props {
  auth: {
    isAuthenticated?: boolean;
    roles?: string[];
    name?: string;
  };
}

export default function HeaderUser({ auth }: Props) {
  React.useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth.isAuthenticated]);

  const [profile, setProfile] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return auth?.isAuthenticated ? (
    <div
      aria-haspopup="true"
      className="cursor-pointer w-full flex items-center justify-end relative"
      onClick={() => setProfile(!profile)}
    >
      {profile ? (
        <ul className="p-2 w-40 border-r bg-white absolute rounded z-40 left-0 shadow mt-40 ">
          <li
            className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none"
            onClick={() => {
              dispatch({ type: "LOGOUT" });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-settings"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <circle cx={12} cy={12} r={3} />
            </svg>
            <span className="ml-2">Logout</span>
          </li>
        </ul>
      ) : (
        ""
      )}
      <img
        className="rounded h-10 w-10 object-cover"
        src="https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png"
        alt="logo"
      />
      <p className="text-gray-800 text-sm ml-2">{auth.name}</p>
    </div>
  ) : (
    <div className="w-full h-full flex">
      <div className="cursor-pointer w-full flex items-center justify-end relative">
        <Link to="/login" className="text-gray-800 text-sm ml-2">
          Login
        </Link>
      </div>
    </div>
  );
}
