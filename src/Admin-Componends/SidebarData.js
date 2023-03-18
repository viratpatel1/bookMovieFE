import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as IconName from "react-icons/bs";


export const SidebarData = [
    {
        title: 'Upload Movies',
        path: '/admin/uploadmovies',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
        title: 'View Movies',
        path: '/admin/viewmovies',
        icon: <IconName.BsFillEyeFill />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    // {
    //   title: 'User',
    //   path: '/admin/user',
    //   icon: <FaIcons.FaCartPlus />
    // },
    // {
    //   title: "Logout",
    //   path: "/admin/login",
    //   icon: <AiIcons.AiOutlineLogout />
    // },

];