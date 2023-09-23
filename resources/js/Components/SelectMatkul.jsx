import { Select, Option } from "@material-tailwind/react";
import React from "react";
 
export default function SelectDefault(props) {
  return (
    <div className="w-72">
      <Select label={props.title} size="md" variant="outlined">
        {props.data.map((item,index) => (
            <Option key={index}>{item}</Option>
        ))}
        {/* <Option>Struktur Data</Option>
        <Option>Basis Data Lanjutan</Option>
        <Option>Basis Data</Option>
        <Option>Sistem Operasi</Option> */}
      </Select>
    </div>
  );
}