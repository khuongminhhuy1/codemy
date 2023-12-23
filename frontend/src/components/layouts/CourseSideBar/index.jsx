import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";

function getItem(label, key, children, type) {
  return {
    key,
    children,
    label,
    type,
  };
}

export default function CourseSideBar() {
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const responseData = axios.get(`/chapter/${id}`).then((res) => {
      if (res) {
        setData(res.data);
      }
      
    });
  }, []);
  const items = [
    getItem("Navigation One", "sub1", [
      getItem("Option 1", "1"),
      getItem("Option 2", "2"),
      getItem("Option 3", "3"),
      getItem("Option 4", "4"),
    ]),
  ];
  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{
        width: 256,
      }}
      items={items}
    />
  );
}
