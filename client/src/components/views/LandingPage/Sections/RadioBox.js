import React, { useState } from "react";
import { Collapse, Radio } from "antd";
const RadioBox = (props) => {
  const { Panel } = Collapse;
  const [value, setvalue] = useState(0);
  const renderRadioBox = () => {
    return (
      props.list &&
      props.list.map((value) => (
        <Radio key={value._id} value={value._id}>
          {value.name}
        </Radio>
      ))
    );
  };

  const handleChange = (e) => {
    setvalue(e.target.value);
    props.handleFilters(e.target.value);
  };
  return (
    <div>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="Price" key="1">
          <Radio.Group onChange={handleChange} value={value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
};

export default RadioBox;
