import { Select, Option } from "@material-tailwind/react";
import React from "react";
 
export default function SelectDefault(props) {
  return (
    <div className="w-72">
      <Select label={props.title} size="md" variant="outlined">
        {props.data.map((item,index) => (
          <Option key={index} value={item}>{item}</Option>
        ))}
      </Select>
    </div>
  );
}